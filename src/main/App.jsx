import "tailwindcss/tailwind.css";
import { Stats } from "../features/PomodoroApp/Stats.jsx";
import { ToDoList } from "../features/PomodoroApp/ToDoList.jsx";
import { Music } from "../MiscComponents/Music.jsx";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Pomodoro } from "../features/PomodoroApp/Pomodoro/Pomodoro.jsx";
import { Settings } from "../features/PomodoroApp/Settings.jsx";
import useTimeState from "../features/PomodoroApp/Pomodoro/useTimeState.js";
import { Background } from "../features/Theming/background.jsx";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import SpinningToolBar from "../features/PomodoroApp/SpinningToolBar.jsx";
import { useQuery } from "@tanstack/react-query";
import { getUserData, useRetrieveOrUpdate } from "../features/Account/supabaseUserData.js";
import useTitle from "../features/PomodoroApp/Pomodoro/useTitle.js";
import PageLoadingSpinner from "../MiscComponents/PageLoadingSpinner.jsx";
import AccountModal from "../features/Account/AccountModal.jsx";
import Cat from "../features/Cat/Cat.jsx";
import { getColorWithoutOpacity, isSameDate } from "./helpers.js";
import PomodoroApp from "../features/PomodoroApp/PomodoroApp.jsx";
import Dashboard from "../features/Dashboard/Dashboard.jsx";
import Navbar from "../features/Navbar/Navbar.jsx";
import CatApp from "../features/Cat/CatApp.jsx";
import { ThemeContext } from "../features/Theming/ThemeContext.js";
import { initialSettings } from "./config.js";
import { themeColours } from "../features/Theming/themeColours.js";
import DayNightToggle from "../features/Theming/DayNightToggle.jsx";
import FullscreenButton from "../features/Fullscreen/FullscreenButton.jsx";
import getDocumentColour from "../features/Theming/getDocumentColour.js";

const updateMessage = `
18 Dec 2023 Updates:
1. Implemented basic functionality cat feeding: earning food, feeding

19 Dec 2023 Updates:
1. IMPLEMENTED CAT CHONKINESS. HE GETS FAT WHEN YOU FEED HIMMMMMMM
2. Fixed bug where guest user cat food was not being updated.
3. Implemented progress indicator for feeding and descriptions.
4. Improved logic for page navigation and implemented keyboard navigation.`;

toast.success(updateMessage, { duration: 10000 });

function settingsReducer(state, action) {
	return { ...state, ...action.payload };
}

function App() {
	// * POMODORO LOGIC STATE //
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const [activeType, setActiveType] = useState("pomodoro");
	const currentTimeStamp = useTimeState(); // returns the live time stamp which updates every 1s
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);

	// * TO DOS, STATS STATE
	const [toDos, setToDos] = useState([]);
	const [stats, setStats] = useState([]);
	const [lifetimeWorkSessions, setLifetimeWorkSessions] = useState(0);
	const [showStatsDate, setShowStatsDate] = useState(new Date());
	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const lifetimeCurrentSecondsFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "Short Break" || curr.task === "Long Break" ? 0 : curr.lengthSec);
	}, 0);

	// * THEME //
	const [staticTheme, setStaticTheme] = useState("slate");
	const [theme, setTheme] = useState("seoulInsideDay");
	const [day, setDay] = useState(true);
	const { toastBgColor, toastFontColor } = getDocumentColour();

	// * CAT STATE //
	const [catFoodStats, setCatFoodStats] = useState([]);
	const [catFoodStatsLoaded, setCatFoodStatsLoaded] = useState(false);

	// * UI OPENING STATE //
	const [navPage, setNavPage] = useState(0);
	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	const [pomodoroIsOpen, setPomodoroIsOpen] = useState(true);
	const [statsIsOpen, setStatsIsOpen] = useState(true);
	const [cacheStatsIsOpen, setCacheStatsIsOpen] = useState(true);
	const [toDoIsOpen, setToDoIsOpen] = useState(true);
	const [cacheToDoIsOpen, setCacheToDoIsOpen] = useState(true);
	const [accountIsOpen, setAccountIsOpen] = useState(false);

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
			<ThemeContext.Provider
				value={{ theme: staticTheme, setTheme: setStaticTheme, themeColour: themeColours[theme] }}
			>
				<div className={`select-none font-roboto font-light ${themeColours[theme].text}`}>
					<Toaster
						toastOptions={{
							style: {
								background: `${toastBgColor}`,
								opacity: 100,
								color: `${toastFontColor}`,
							},
						}}
					>
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
					<Background day={day} />
					<FullscreenButton />
					<Navbar
						navPage={navPage}
						setNavPage={setNavPage}
						setStatsIsOpen={setStatsIsOpen}
						setToDoIsOpen={setToDoIsOpen}
						cacheStatsIsOpen={cacheStatsIsOpen}
						cacheToDoIsOpen={cacheToDoIsOpen}
					/>
					<DayNightToggle day={day} setDay={setDay} setTheme={setTheme} />
					<Dashboard
						navPage={navPage}
						setNavPage={setNavPage}
						currentTimeStamp={currentTimeStamp}
						stats={stats}
						setShowStatsDate={setShowStatsDate}
						lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
						lifetimeWorkSessions={lifetimeWorkSessions}
						day={day}
						setDay={setDay}
						setTheme={setTheme}
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
					<PomodoroApp navPage={navPage}>
						<Stats
							lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
							stats={stats}
							setStats={setStats}
							toDoIsOpen={toDoIsOpen}
							statsIsOpen={statsIsOpen}
							setStatsIsOpen={setStatsIsOpen}
							lifetimeWorkSessions={lifetimeWorkSessions}
							currentTimeStamp={currentTimeStamp}
							showStatsDate={showStatsDate}
							setShowStatsDate={setShowStatsDate}
							navPage={navPage}
							setCacheStatsIsOpen={setCacheStatsIsOpen}
						/>
						{/* <Music /> */}
						<ToDoList
							toDos={toDos}
							setToDos={setToDos}
							toDoIsOpen={toDoIsOpen}
							setToDoIsOpen={setToDoIsOpen}
							setCacheToDoIsOpen={setCacheToDoIsOpen}
						/>
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
							statsIsOpen={statsIsOpen}
							toDoIsOpen={toDoIsOpen}
							setLifetimeWorkSessions={setLifetimeWorkSessions}
							catFoodStats={catFoodStats}
							setCatFoodStats={setCatFoodStats}
							catFoodStatsLoaded={catFoodStatsLoaded}
						/>
					</PomodoroApp>
					<CatApp navPage={navPage} catFoodStats={catFoodStats} setCatFoodStats={setCatFoodStats} />
				</div>
			</ThemeContext.Provider>
		</>
	);
}

export default App;
