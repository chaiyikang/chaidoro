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
	pomodoroLengthSec: 5,
	shortBreakLengthSec: 2,
	longBreakLengthSec: 3,
	interval: 4,
};

function settingsReducer(state, action) {}

function Pomodoro() {
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const currentTimeStamp = useTimeState();
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);
	const [activeType, setActiveType] = useState("pomodoro");
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const runningSeconds = timerRunning
		? Math.round((timeStampEnd - currentTimeStamp) / 1000) >= 0
			? Math.round((timeStampEnd - currentTimeStamp) / 1000)
			: -1
		: undefined;
	const displayedSeconds = runningSeconds || secondsLeftCache;

	const pomodoroCycleDisplay = Math.ceil((workSetsCompleted + 1) / settings.interval);
	const pomodoroRepDisplay = (workSetsCompleted % settings.interval) + 1;
	const breakCycleDisplay =
		workSetsCompleted % settings.interval !== 0 || workSetsCompleted === 0
			? Math.floor(workSetsCompleted / settings.interval) + 1
			: workSetsCompleted / settings.interval;
	const breakRepDisplay =
		workSetsCompleted === 0 ? 1 : workSetsCompleted % 4 === 0 ? 4 : workSetsCompleted % 4;

	// * EFFECTS //

	useEffect(() => {
		if (!timerRunning) return;
		setSecondsLeftCache(runningSeconds);
	}, [runningSeconds, timerRunning]);

	useEffect(
		function handleTimerEnded() {
			if (!timerRunning) return;
			if (runningSeconds >= 0) return;
			pauseTimer();
			if (activeType === "pomodoro") setWorkSetsCompleted(sets => sets + 1);
			let nextType;
			if (activeType !== "pomodoro") {
				nextType = "pomodoro";
			} else if ((workSetsCompleted + 1) % settings.interval === 0) {
				nextType = "longBreak";
			} else {
				nextType = "shortBreak";
			}
			setActiveType(nextType);
			// setSecondsLeftCache(settings[`${nextType}LengthSec`]);
			setTimeStampEnd(currentTimeStamp + settings[`${nextType}LengthSec`] * 1000);
		},
		[
			settings,
			runningSeconds,
			timerRunning,
			activeType,
			workSetsCompleted,
			currentTimeStamp,
			secondsLeftCache,
		],
	);

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
		initType(type);
	}

	// * UTILITY //
	function pauseTimer() {
		setTimeStampEnd(undefined);
	}
	function startTimer() {
		setTimeStampEnd(currentTimeStamp + secondsLeftCache * 1000);
	}

	function initType(type) {
		setActiveType(type);
		setSecondsLeftCache(settings[`${type}LengthSec`]);
	}

	function getNextType() {
		if (activeType !== "pomodoro") return "pomodoro";
		if ((workSetsCompleted + 1) % settings.interval === 0) return "longBreak";
		return "shortBreak";
	}

	return (
		<div className="relative flex flex-col items-center justify-center h-screen bg-base-200">
			<div className="shadow-lg card w-96">
				<div className="card-body">
					<h2 className="text-4xl font-bold text-center card-title ">
						[current task] - {activeType}
					</h2>
					<h2 className="text-4xl font-bold text-center card-title ">
						{activeType === "pomodoro"
							? `Cycle: #${pomodoroCycleDisplay} Rep: #${pomodoroRepDisplay}`
							: `Cycle: #${breakCycleDisplay} Rep: #${breakRepDisplay}`}
					</h2>
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
					<div className="flex items-center justify-center mt-4">
						<span className="countdown font-mono text-6xl">
							<span
								style={{
									"--value": Math.floor(displayedSeconds / 60)
										.toString()
										.padStart(2, 0),
								}}
							></span>
							:
							<span
								style={{
									"--value": Math.round(displayedSeconds % 60)
										.toString()
										.padStart(2, 0),
								}}
							></span>
						</span>
					</div>
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
