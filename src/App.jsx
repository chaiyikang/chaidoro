import "tailwindcss/tailwind.css";
import "daisyui";
import { Stats } from "./components/Stats";
import { ToDoList } from "./components/ToDoList";
import { Music } from "./components/Music";
import { useReducer, useRef } from "react";
import { Pomodoro } from "./components/Pomodoro";
import { Settings } from "./components/Settings";

const initialSettings = {
	pomodoroLengthSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
	interval: 4,
	autoPomodoro: true,
	autoBreaks: true,
};

function settingsReducer(state, action) {
	console.log("🚀 ~ file: App.jsx:21 ~ settingsReducer ~ state:", state);
	console.log("🚀 ~ file: App.jsx:22 ~ settingsReducer ~ payload:", action.payload);
	return { ...state, ...action.payload };
}

function App() {
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);

	return (
		<>
			<Pomodoro settings={settings} />
			<Stats />
			<Music />
			<ToDoList />
			<Settings settings={settings} dispatchSettings={dispatchSettings} />
		</>
	);
}

export default App;
