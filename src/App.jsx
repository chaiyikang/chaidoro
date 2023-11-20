import "tailwindcss/tailwind.css";
import { Stats } from "./MajorComponents/Stats";
import { ToDoList } from "./MajorComponents/ToDoList";
import { Music } from "./MajorComponents/Music";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Pomodoro } from "./MajorComponents/Pomodoro";
import { Settings } from "./MajorComponents/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./MajorComponents/background.jsx";
import { Toaster } from "react-hot-toast";
import SpinningToolBar from "./MajorComponents/SpinningToolBar";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { USERID, getUserData, useRetrieveOrUpdate } from "./services/supabaseUserData.js";
import useTitle from "./hooks/useTitle.js";
import Progress from "./MajorComponents/Progress.jsx";
import PageLoadingSpinner from "./MajorComponents/PageLoadingSpinner.jsx";
import LoginModal from "./MajorComponents/LoginModal.jsx";

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
	const [totalWorkSessions, setTotalWorkSessions] = useState(0);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);
	const [loginIsOpen, setLoginIsOpen] = useState(false);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const totalTimeFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "Short Break" || curr.task === "Long Break" ? 0 : curr.lengthSec);
	}, 0);

	// * EFFECTS //
	useEffect(function requestNotificationPermission() {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}, []);

	useTitle(secondsLeftCache, activeType);

	// * BACKEND //
	const { data: userData, isLoading } = useQuery({
		queryKey: ["userData", USERID],
		queryFn: getUserData,
	});

	useRetrieveOrUpdate(userData, "seconds_left", setSecondsLeftCache, secondsLeftCache);
	useRetrieveOrUpdate(userData, "active_type", setActiveType, activeType);
	const applySettings = useCallback(retrievedSettings => {
		dispatchSettings({
			payload: {
				...retrievedSettings,
			},
		});
	}, []);
	useRetrieveOrUpdate(userData, "settings", applySettings, settings);
	useRetrieveOrUpdate(userData, "to_do_list", setToDos, toDos);
	useRetrieveOrUpdate(userData, "stats", setStats, stats);
	useRetrieveOrUpdate(userData, "total_work_sessions", setTotalWorkSessions, totalWorkSessions);

	if (isLoading)
		return (
			<>
				<PageLoadingSpinner />
			</>
		);

	return (
		<div className="select-none font-roboto font-light text-slate-400">
			<Toaster toastOptions={{ style: { background: "#1e293b", color: "#94a3b8" } }} />
			<Background />
			<Stats
				totalTimeFocused={totalTimeFocused}
				stats={stats}
				setStats={setStats}
				toDoIsOpen={toDoIsOpen}
				statsIsOpen={statsIsOpen}
				totalWorkSessions={totalWorkSessions}
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
				totalWorkSessions={totalWorkSessions}
				setTotalWorkSessions={setTotalWorkSessions}
			/>
			<SpinningToolBar
				setSettingsIsOpen={setSettingsIsOpen}
				setPomodoroIsOpen={setPomodoroIsOpen}
				setStatsIsOpen={setStatsIsOpen}
				setToDoIsOpen={setToDoIsOpen}
				setLoginIsOpen={setLoginIsOpen}
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
			<LoginModal loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen} />
		</div>
	);
}

export default App;
