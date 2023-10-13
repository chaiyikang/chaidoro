import "tailwindcss/tailwind.css";
import "daisyui";
import cat from "./img/cat.jpg";
import { Stats } from "./components/Stats";
import { ToDoList } from "./components/ToDoList";
import { Music } from "./components/Music";
import { useEffect, useReducer, useRef, useState } from "react";
import useTimeState from "./hooks/useTimeState";

function App() {
	return (
		<>
			<Pomodoro />
			<Stats />
			<Music />
			<ToDoList />
		</>
	);
}

const initialSettings = {
	pomodoroLengthSec: 25 * 60,
	shortBreakLengthSec: 5 * 60,
	longBreakLengthSec: 15 * 60,
};

function settingsReducer(state, action) {}

function Pomodoro() {
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const currentTimeStamp = useTimeState();
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const displaySeconds = timerRunning
		? Math.floor((timeStampEnd - currentTimeStamp) / 1000)
		: undefined;

	// * EFFECTS //

	useEffect(() => {
		if (!timerRunning) return;
		setSecondsLeftCache(displaySeconds);
	}, [displaySeconds, timerRunning]);

	// * EVENT HANDLERS //
	function handlePause() {
		pauseTimer();
	}

	function handleStart() {
		startTimer();
	}

	function handleType(event) {
		pauseTimer();
		const type = event.target.value;
		setSecondsLeftCache(settings[`${type}LengthSec`]);
	}

	// * UTILITY //
	function pauseTimer() {
		setTimeStampEnd(undefined);
	}
	function startTimer() {
		setTimeStampEnd(new Date().getTime() + secondsLeftCache * 1000);
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-base-200 relative">
			<div className="card shadow-lg w-96">
				<div className="card-body">
					<h2 className="card-title text-center text-4xl font-bold">[current task]</h2>
					<div className="divider"></div>
					<div className="flex items-center justify-around mt-4">
						<button onClick={handleType} value="pomodoro" className="badge badge-primary">
							Pomodoro
						</button>
						<button onClick={handleType} value="shortBreak" className="badge badge-secondary">
							Short Break
						</button>
						<button onClick={handleType} value="longBreak" className="badge badge-secondary">
							Long Break
						</button>
					</div>
					<img src={cat} className="w-12 h-12 mx-auto mt-4" />
					<div className="flex items-center justify-center mt-4">
						<span className="text-5xl font-mono">
							{new Date(currentTimeStamp).toLocaleTimeString()}
						</span>
					</div>
					<span className="text-5xl font-mono block">
						{timerRunning ? displaySeconds : secondsLeftCache}
					</span>
					<div className="flex items-center justify-center mt-4">
						<button onClick={handleStart} className="btn btn-circle btn-lg btn-primary mr-4">
							{"\u25B6"}
						</button>
						<button onClick={handlePause} className="btn btn-circle btn-lg btn-secondary ml-4">
							{"\u23F8"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
