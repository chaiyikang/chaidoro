import "tailwindcss/tailwind.css";
import "daisyui";
import { Stats } from "./Major Components/Stats";
import { ToDoList } from "./Major Components/ToDoList";
import { Music } from "./Major Components/Music";
import { useReducer, useState } from "react";
import { Pomodoro } from "./Major Components/Pomodoro";
import { Settings } from "./Major Components/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./Major Components/Background";
import { Toaster } from "react-hot-toast";
import SpinningToolBar from "./Major Components/spinningToolBar";

const initialSettings = {
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
	const [statsIsOpen, setStatsIsOpen] = useState(false);
	const [toDoIsOpen, setToDoIsOpen] = useState(false);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const totalTimeFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "break" ? 0 : curr.lengthSec);
	}, 0);

	return (
		<div className="select-none font-roboto font-light text-slate-400">
			<SpinningToolBar
				setSettingsIsOpen={setSettingsIsOpen}
				setPomodoroIsOpen={setPomodoroIsOpen}
				setStatsIsOpen={setStatsIsOpen}
				setToDoIsOpen={setToDoIsOpen}
			/>
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
	);
}

export default App;
