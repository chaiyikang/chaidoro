import "tailwindcss/tailwind.css";
import "daisyui";
import { Stats } from "./components/Stats";
import { ToDoList } from "./components/ToDoList";
import { Music } from "./components/Music";
import { useReducer, useState } from "react";
import { Pomodoro } from "./components/Pomodoro";
import { Settings } from "./components/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./components/background";

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
	const currentTimeStamp = useTimeState();
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);
	const [toDos, setToDos] = useState([]);
	const [stats, setStats] = useState([]);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const totalTimeFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "break" ? 0 : curr.lengthSec);
	}, 0);

	return (
		<>
			<Background />
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
			/>
			{/* <Stats totalTimeFocused={totalTimeFocused} stats={stats} />
			<Music />
			<ToDoList toDos={toDos} setToDos={setToDos} />
			<Settings
				settings={settings}
				dispatchSettings={dispatchSettings}
				timerRunning={timerRunning}
				setTimeStampEnd={setTimeStampEnd}
				activeType={activeType}
				currentTimeStamp={currentTimeStamp}
				secondsLeftCache={secondsLeftCache}
				setSecondsLeftCache={setSecondsLeftCache}
			/> */}
		</>
	);
}

export default App;
