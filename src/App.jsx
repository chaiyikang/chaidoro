import "tailwindcss/tailwind.css";
import "daisyui";
import { Stats } from "./MajorComponents/Stats";
import { ToDoList } from "./MajorComponents/ToDoList";
import { Music } from "./MajorComponents/Music";
import { useEffect, useReducer, useRef, useState } from "react";
import { Pomodoro } from "./MajorComponents/Pomodoro";
import { Settings } from "./MajorComponents/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./MajorComponents/background.jsx";
import { Toaster } from "react-hot-toast";
import SpinningToolBar from "./MajorComponents/SpinningToolBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getUserData, updateUserData } from "./services/supabaseUserData.js";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

let initialSettings = {
	pomodoroLengthSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
	interval: 4,
	autoPomodoro: true,
	autoBreaks: true,
};

function settingsReducer(state, action) {
	return { ...state, ...action.payload };
}

function App() {
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const [activeType, setActiveType] = useState("pomodoro");
	const currentTimeStamp = useTimeState(); // returns the live time stamp which updates every 1s
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);
	const [toDos, setToDos] = useState([]);
	const [stats, setStats] = useState([]);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const totalTimeFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "break" ? 0 : curr.lengthSec);
	}, 0);

	// * REFS //
	const firstRender = useRef({ statsRenders: 0, toDoRenders: 0, settingsRenders: 0 }); // so that empty stats are not uploaded on initial render

	// * EFFECTS //
	useEffect(
		function retrieveSettings() {
			async function asyncRetrieveSettings() {
				const userData = await getUserData();
				if (!userData) return;
				const { settings } = userData;
				// console.log(settings);
				dispatchSettings({
					payload: {
						...settings,
					},
				});
				setActiveType("pomodoro");
				setSecondsLeftCache(settings[`pomodoroLengthSec`]);
			}
			async function updateSettingsSupabase() {
				await updateUserData(2, "settings", settings);
			}

			if (firstRender.current.settingsRenders < 2) {
				// ! accounting for double render during development
				firstRender.current.settingsRenders++;
				asyncRetrieveSettings();
				return;
			}
			updateSettingsSupabase();
		},
		[settings],
	);

	useEffect(
		function retrieveOrUpdateToDos() {
			async function asyncRetrieveToDos() {
				const userData = await getUserData();
				if (!userData) return;
				const { to_do_list: toDoList } = userData;
				setToDos(toDoList);
			}
			async function updateToDosSupabase() {
				await updateUserData(2, "to_do_list", toDos);
			}
			if (firstRender.current.toDoRenders < 2) {
				// ! accounting for double render during development
				firstRender.current.toDoRenders++;
				asyncRetrieveToDos();
				return;
			}
			updateToDosSupabase();
		},
		[toDos],
	);

	useEffect(
		function retrieveOrUpdateStats() {
			async function asyncRetrieveStats() {
				const userData = await getUserData();
				if (!userData) return;
				const { stats } = userData;
				setStats(stats);
			}

			async function asyncUpdateStats() {
				updateUserData(2, "stats", stats);
			}

			if (firstRender.current.statsRenders < 2) {
				// ! accounting for double render during development
				firstRender.current.statsRenders++;
				asyncRetrieveStats();
				return;
			}
			// alert("not first render anymore");
			asyncUpdateStats();
		},
		[stats],
	);

	useEffect(function requestNotificationPermission() {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<div className="select-none font-roboto font-light text-slate-400">
				<Toaster toastOptions={{ style: { background: "#1e293b", color: "#94a3b8" } }} />
				<Background />
				<Stats
					totalTimeFocused={totalTimeFocused}
					stats={stats}
					toDoIsOpen={toDoIsOpen}
					statsIsOpen={statsIsOpen}
				/>
				{/* <Music /> */}
				<ToDoList toDos={toDos} setToDos={setToDos} toDoIsOpen={toDoIsOpen} />
				<Pomodoro
					settings={settings}
					timeStampEnd={timeStampEnd}
					setTimeStampEnd={setTimeStampEnd}
					timerRunning={timerRunning}
					activeType={activeType}
					setActiveType={setActiveType}
					currentTimeStamp={currentTimeStamp}
					secondsLeftCache={secondsLeftCache}
					setSecondsLeftCache={setSecondsLeftCache}
					toDos={toDos}
					stats={stats}
					setStats={setStats}
					pomodoroIsOpen={pomodoroIsOpen}
					setPomodoroIsOpen={setPomodoroIsOpen}
				/>
				<SpinningToolBar
					setSettingsIsOpen={setSettingsIsOpen}
					setPomodoroIsOpen={setPomodoroIsOpen}
					setStatsIsOpen={setStatsIsOpen}
					setToDoIsOpen={setToDoIsOpen}
				/>
				<Settings
					settings={settings}
					dispatchSettings={dispatchSettings}
					timerRunning={timerRunning}
					setTimeStampEnd={setTimeStampEnd}
					activeType={activeType}
					currentTimeStamp={currentTimeStamp}
					secondsLeftCache={secondsLeftCache}
					setSecondsLeftCache={setSecondsLeftCache}
					settingsIsOpen={settingsIsOpen}
					setSettingsIsOpen={setSettingsIsOpen}
				/>
			</div>
		</QueryClientProvider>
	);
}

export default App;
