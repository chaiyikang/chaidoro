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

function settingsReducer(state, action) {
	const   x = 5;
	
}

function Pomodoro() {
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const currentTimeStamp = useTimeState();
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const runningSeconds = timerRunning
		? Math.round((timeStampEnd - currentTimeStamp) / 1000)
		: undefined;
	const displayedSeconds = runningSeconds || secondsLeftCache;

	// * EFFECTS //

	useEffect(() => {
		if (!timerRunning) return;
		setSecondsLeftCache(runningSeconds);
	}, [runningSeconds, timerRunning]);

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
		setTimeStampEnd(currentTimeStamp + secondsLeftCache * 1000);
	}

	return (
		<div className="relative flex flex-col items-center justify-center h-screen bg-base-200">
			<div className="shadow-lg card w-96">
				<div className="card-body">
					<h2 className="text-4xl font-bold text-center card-title ">[current task]</h2>
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
						<span className="font-mono text-5xl">
							{new Date(currentTimeStamp).toLocaleTimeString()}
						</span>
					</div>
					<span className="font-mono text-6xl countdown">
  						<span style={{"--value":16}}></span>
					</span>


					<span className="block font-mono text-5xl text-center ">
						{Math.floor(displayedSeconds / 60)
							.toString()
							.padStart(2, 0)}
						:
						{Math.round(displayedSeconds % 60)
							.toString()
							.padStart(2, 0)}
					</span>
					<div className="flex items-center justify-center mt-4">
						<button onClick={handleStart} className="mr-4 btn btn-circle btn-lg btn-primary">
							{"\u25B6"}
						</button>
						<button onClick={handlePause} className="ml-4 btn btn-circle btn-lg btn-secondary">
							{"\u23F8"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
