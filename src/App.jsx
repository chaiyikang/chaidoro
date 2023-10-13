import "tailwindcss/tailwind.css";
import "daisyui";
import { Stats } from "./components/Stats";
import { ToDoList } from "./components/ToDoList";
import { Music } from "./components/Music";
import { useReducer, useRef } from "react";
import { Pomodoro } from "./components/Pomodoro";
import { Settings } from "./components/Settings";

const initialSettings = {
	pomodoroLengthSec: 5,
	shortBreakLengthSec: 2,
	longBreakLengthSec: 3,
	interval: 4,
};

function settingsReducer(state, action) {}

function App() {
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);

	return (
		<>
			<Pomodoro settings={settings} />
			<Stats />
			<Music />
			<ToDoList />
			<Settings />
		</>
	);
}

export default App;
