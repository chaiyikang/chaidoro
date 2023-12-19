import "tailwindcss/tailwind.css";
import { Stats } from "./MajorComponents/Stats";
import { ToDoList } from "./MajorComponents/ToDoList";
import { Music } from "./MajorComponents/Music";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Pomodoro } from "./MajorComponents/Pomodoro";
import { Settings } from "./MajorComponents/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./MajorComponents/background.jsx";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import SpinningToolBar from "./MajorComponents/SpinningToolBar";
import { useQuery } from "@tanstack/react-query";
import { getUserData, useRetrieveOrUpdate } from "./services/supabaseUserData.js";
import useTitle from "./hooks/useTitle.js";
import PageLoadingSpinner from "./MajorComponents/PageLoadingSpinner.jsx";
import AccountModal from "./MajorComponents/AccountModal.jsx";
import Cat from "./MajorComponents/Cat.jsx";
import { isSameDate } from "./helpers.js";
import Test from "./Test.jsx";
import PomodoroApp from "./MajorComponents/PomodoroApp.jsx";
import Dashboard from "./MajorComponents/Dashboard.jsx";
import Navbar from "./MajorComponents/Navbar.jsx";
import CatApp from "./MajorComponents/CatApp.jsx";

const updateMessage = `
18 Dec 2023 Updates:
1. Implemented basic functionality cat feeding: earning food, feeding

19 Dec 2023 Updates:
1. IMPLEMENTED CAT CHONKINESS. HE GETS FAT WHEN YOU FEED HIMMMMMMM
2. Fixed bug where guest user cat food was not being updated.
3. Implemented progress indicator for feeding and descriptions.
4. Improved logic for page navigation and implemented keyboard navigation.`;

toast.success(updateMessage, { duration: 10000 });

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
	const [lifetimeWorkSessions, setLifetimeWorkSessions] = useState(0);
	const [catFoodStats, setCatFoodStats] = useState([]);
	const [catFoodStatsLoaded, setCatFoodStatsLoaded] = useState(false);
	const [showStatsDate, setShowStatsDate] = useState(new Date());

	// * UI OPENING STATE //
	const [navPage, setNavPage] = useState(0);
	const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);
	const [accountIsOpen, setAccountIsOpen] = useState(false);
	const [catAppIsOpen, setCatAppIsOpen] = useState(false);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const lifetimeCurrentSecondsFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "Short Break" || curr.task === "Long Break" ? 0 : curr.lengthSec);
	}, 0);

	// * EFFECTS //
	useEffect(function requestNotificationPermission() {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	}, []);

	useTitle(secondsLeftCache, activeType);

	useEffect(
		function arrowKeyNav() {
			function handleKeyDown(e) {
				// console.log(e.key);
				if (e.key === "ArrowLeft" && navPage > 0) return setNavPage(page => page - 1);
				if (e.key === "ArrowRight" && navPage < 2) return setNavPage(page => page + 1);
			}
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		},
		[navPage],
	);

	// * BACKEND //
	const { data: userData, isLoading } = useQuery({
		queryKey: ["userData"],
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
	useRetrieveOrUpdate(
		userData,
		"lifetime_work_sessions",
		setLifetimeWorkSessions,
		lifetimeWorkSessions,
	);

	useRetrieveOrUpdate(
		userData,
		"cat_food_stats",
		setCatFoodStats,
		catFoodStats,
		setCatFoodStatsLoaded,
		isLoading,
	);

	if (isLoading)
		return (
			<>
				<PageLoadingSpinner />
			</>
		);

	// if (true) return <Test stats={stats} />;

	return (
		<>
			<div className="select-none font-roboto font-light text-slate-400">
				<Toaster toastOptions={{ style: { background: "#1e293b", color: "#94a3b8" } }}>
					{t => (
						<ToastBar toast={t}>
							{({ icon, message }) => (
								<>
									{icon}
									{message}
									{t.type !== "loading" && (
										<button className="self-start" onClick={() => toast.dismiss(t.id)}>
											<span className="material-symbols-outlined">close</span>
										</button>
									)}
								</>
							)}
						</ToastBar>
					)}
				</Toaster>
				<Background />
				<Navbar navPage={navPage} setNavPage={setNavPage} />

				<Dashboard
					navPage={navPage}
					setNavPage={setNavPage}
					currentTimeStamp={currentTimeStamp}
					stats={stats}
					setShowStatsDate={setShowStatsDate}
					lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
					lifetimeWorkSessions={lifetimeWorkSessions}
				/>
				<PomodoroApp navPage={navPage}>
					<Stats
						lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
						stats={stats}
						setStats={setStats}
						toDoIsOpen={toDoIsOpen}
						statsIsOpen={statsIsOpen}
						lifetimeWorkSessions={lifetimeWorkSessions}
						currentTimeStamp={currentTimeStamp}
						showStatsDate={showStatsDate}
						setShowStatsDate={setShowStatsDate}
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
						setLifetimeWorkSessions={setLifetimeWorkSessions}
						catFoodStats={catFoodStats}
						setCatFoodStats={setCatFoodStats}
						catFoodStatsLoaded={catFoodStatsLoaded}
					/>
					<SpinningToolBar
						setSettingsIsOpen={setSettingsIsOpen}
						setPomodoroIsOpen={setPomodoroIsOpen}
						setStatsIsOpen={setStatsIsOpen}
						setToDoIsOpen={setToDoIsOpen}
						setAccountIsOpen={setAccountIsOpen}
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
					<AccountModal
						accountIsOpen={accountIsOpen}
						setAccountIsOpen={setAccountIsOpen}
						lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
						lifetimeWorkSessions={lifetimeWorkSessions}
					/>
				</PomodoroApp>
				<CatApp navPage={navPage} catFoodStats={catFoodStats} setCatFoodStats={setCatFoodStats} />
			</div>
		</>
	);
}

export default App;
