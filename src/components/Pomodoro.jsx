import cat from "../img/cat.jpg";
import { useEffect, useState } from "react";

export function Pomodoro({
	settings,
	timeStampEnd,
	setTimeStampEnd,
	timerRunning,
	activeType,
	setActiveType,
	currentTimeStamp,
	secondsLeftCache,
	setSecondsLeftCache,
	toDos,
	stats,
	setStats,
}) {
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);

	// * DERIVED STATE //
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

	const activeTask =
		activeType === "pomodoro"
			? toDos.filter(task => task.active)[0]?.text ?? "No task selected"
			: "break";
	const lastTask = stats.at(-1)?.task;

	// * EFFECTS //
	useEffect(
		function cacheSecondsLeft() {
			if (!timerRunning) return;
			setSecondsLeftCache(runningSeconds);
		},
		[runningSeconds, timerRunning, setSecondsLeftCache],
	);

	useEffect(
		function updateStats() {
			if (!timerRunning) return;
			if (activeTask === lastTask) {
				setStats(old => [
					...old.slice(0, -1),
					{ ...old.at(-1), lengthSec: old.at(-1).lengthSec + 1 },
				]);
			} else {
				setStats(old => [
					...old,
					{ task: activeTask, lengthSec: 0, timeStampStarted: currentTimeStamp },
				]);
			}
		},
		[runningSeconds, timerRunning, activeTask, lastTask, setStats, currentTimeStamp],
	);

	useEffect(
		function handleTimerEnded() {
			if (!timerRunning || runningSeconds >= 0) return;
			setTimeStampEnd(undefined); // pause timer
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
			setSecondsLeftCache(settings[`${nextType}LengthSec`]);
			if (
				(nextType === "pomodoro" && settings.autoPomodoro) ||
				(nextType !== "pomodoro" && settings.autoBreaks)
			) {
				setTimeStampEnd(currentTimeStamp + settings[`${nextType}LengthSec`] * 1000);
			}
		},
		[
			settings,
			runningSeconds,
			timerRunning,
			activeType,
			workSetsCompleted,
			currentTimeStamp,
			secondsLeftCache,
			setTimeStampEnd,
			setActiveType,
			setSecondsLeftCache,
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

	function handleSkip() {
		pauseTimer();
		const nextType = getNextType();
		initType(nextType);

		if (
			(nextType === "pomodoro" && settings.autoPomodoro) ||
			(nextType !== "pomodoro" && settings.autoBreaks)
		) {
			setTimeStampEnd(currentTimeStamp + settings[`${nextType}LengthSec`] * 1000);
		}
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
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black h-3/6 w-1/6">
			<div className="">
				<div className="">
					<h2 className="">
						{activeTask}
						{/* - {activeType} - nextType: {getNextType()} */}
					</h2>
					<h2 className="">
						{activeType === ""
							? `Cycle: #${pomodoroCycleDisplay} Rep: #${pomodoroRepDisplay}`
							: `Cycle: #${breakCycleDisplay} Rep: #${breakRepDisplay}`}
					</h2>
					<div className=""></div>
					<div className="">
						<button onClick={handleType} value="pomodoro" className="">
							Pomodoro
						</button>
						<button onClick={handleType} value="shortBreak" className="">
							Short Break
						</button>
						<button onClick={handleType} value="longBreak" className="">
							Long Break
						</button>
					</div>
					{/* <img src={cat} className="" /> */}
					{/* <div className="">
						<span className="">{new Date(currentTimeStamp).toLocaleTimeString()}</span>
					</div> */}
					<div className="">
						<span className="">
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
					<div className="">
						<button onClick={handleStart} className="">
							{"\u25B6"}
						</button>
						<button onClick={handlePause} className="">
							{"\u23F8"}
						</button>
						<button onClick={handleSkip} className="">
							{"\u23ED"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
