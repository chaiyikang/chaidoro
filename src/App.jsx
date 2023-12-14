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
12 Dec 2023 Updates:
1. Implemented calendar, tracking by day, traverse timelines of different days, and feature where you can search for a task and see total time spent

13 Dec 2023 Updates:
1. Implemented navbar and scrolling animation for toggling between dashboard and pomodoro.
2. Implemented dashboard with time display, calendar stats, task stat searcher.
3. Implemented static quote/statistic display`;

// toast.success(updateMessage, { duration: 10000 });

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
	const [lifetimeArchivedSecondsFocused, setLifetimeArchivedSecondsFocused] = useState(0); // stores length of deleted stats
	const [toDos, setToDos] = useState([]);
	const [stats, setStats] = useState([]);
	const [lifetimeWorkSessions, setLifetimeWorkSessions] = useState(0);
	const [showStatsDate, setShowStatsDate] = useState(new Date());

	// * UI OPENING STATE //
	const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);
	const [accountIsOpen, setAccountIsOpen] = useState(false);
	const [catAppIsOpen, setCatAppIsOpen] = useState(false);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const lifetimeCurrentSecondsFocused =
		lifetimeArchivedSecondsFocused +
		stats.reduce((acc, curr) => {
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
		"lifetime_archived_seconds_focused",
		setLifetimeArchivedSecondsFocused,
		lifetimeArchivedSecondsFocused,
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
				<Navbar
					dashboardIsOpen={dashboardIsOpen}
					setDashboardIsOpen={setDashboardIsOpen}
					catAppIsOpen={catAppIsOpen}
					setCatAppIsOpen={setCatAppIsOpen}
				/>

				<Dashboard
					dashboardIsOpen={dashboardIsOpen}
					catAppIsOpen={catAppIsOpen}
					currentTimeStamp={currentTimeStamp}
					stats={stats}
					setShowStatsDate={setShowStatsDate}
					setDashboardIsOpen={setDashboardIsOpen}
				/>
				<PomodoroApp dashboardIsOpen={dashboardIsOpen} catAppIsOpen={catAppIsOpen}>
					<Stats
						lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
						setLifetimeArchivedSecondsFocused={setLifetimeArchivedSecondsFocused}
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
				<CatApp dashboardIsOpen={dashboardIsOpen} catAppIsOpen={catAppIsOpen} />
			</div>
		</>
	);
}

export default App;
