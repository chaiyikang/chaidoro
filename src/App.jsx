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
import Test from "./MajorComponents/Test.jsx";

const updateMessage = `30 Nov 2023 Updates: 
1. Lifetime stats like total time focused and total sessions are permanent and will no longer be cleared.
2. Clearing stats will only remove the timeline and not the lifetime stats.
3. Stats were improved to reflect hours and minutes instead of seconds.
4. Height of timeline blocks has been scaled down.
5. To-dos can now be individually deleted

1 Dec 2023 Updates:
1. Toggling components (Stats, Pomodoro, To-do List) now has animations`;

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
	const [totalWorkSessions, setTotalWorkSessions] = useState(0);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);
	const [accountIsOpen, setAccountIsOpen] = useState(false);
	const [totalSecondsFocused, setTotalSecondsFocused] = useState(0);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	// const totalSecondsFocused = stats.reduce((acc, curr) => {
	// 	return acc + (curr.task === "Short Break" || curr.task === "Long Break" ? 0 : curr.lengthSec);
	// }, 0);

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
	useRetrieveOrUpdate(userData, "total_work_sessions", setTotalWorkSessions, totalWorkSessions);
	useRetrieveOrUpdate(
		userData,
		"total_seconds_focused",
		setTotalSecondsFocused,
		totalSecondsFocused,
	);

	if (isLoading)
		return (
			<>
				<PageLoadingSpinner />
			</>
		);

	// if (true) return <Test />;

	return (
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
			<Stats
				totalSecondsFocused={totalSecondsFocused}
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
				setTotalSecondsFocused={setTotalSecondsFocused}
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
			<AccountModal accountIsOpen={accountIsOpen} setAccountIsOpen={setAccountIsOpen} />
		</div>
	);
}

export default App;
