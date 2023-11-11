import { useEffect, useState } from "react";
import ProgressDot from "../LowLevelComponents/ProgressDot";
import ControlButton from "../LowLevelComponents/ControlButton";
import useSound from "use-sound";
import clickSfx from "../sounds/click.mp3";
import alertSfx from "../sounds/alert.mp3";
import timerEndedSfx from "../sounds/timerEnded.mp3";

function formatIntervalString(camelCase) {
	const spacedString = camelCase.replace(/([A-Z])/g, " $1");
	const displayType = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
	return displayType;
}

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
	pomodoroIsOpen,
}) {
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);

	// * DERIVED STATE //
	const runningSeconds = timerRunning
		? Math.round((timeStampEnd - currentTimeStamp) / 1000) >= 0
			? Math.round((timeStampEnd - currentTimeStamp) / 1000)
			: -1
		: undefined;
	const displayedSeconds = runningSeconds || secondsLeftCache;

	// const pomodoroCycleDisplay = Math.ceil((workSetsCompleted + 1) / settings.interval);
	const pomodoroRepDisplay = (workSetsCompleted % settings.interval) + 1;
	// const breakCycleDisplay =
	// 	workSetsCompleted % settings.interval !== 0 || workSetsCompleted === 0
	// 		? Math.floor(workSetsCompleted / settings.interval) + 1
	// 		: workSetsCompleted / settings.interval;
	// const breakRepDisplay =
	// 	workSetsCompleted === 0 ? 1 : workSetsCompleted % 4 === 0 ? 4 : workSetsCompleted % 4;

	const activeTask =
		activeType === "pomodoro"
			? "Pomodoro: " + (toDos.filter(task => task.active)[0]?.text ?? "No task selected")
			: activeType === "shortBreak"
			? "Short Break"
			: "Long Break";

	const lastTask = stats.at(-1)?.task;

	// * SOUND //
	const [clickSound] = useSound(clickSfx);
	const [alertSound] = useSound(alertSfx);
	const [timerEndedSound] = useSound(timerEndedSfx);

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
		function timerEndingNotification() {
			if (!timerRunning) return;
			if (runningSeconds !== 5 * 60) return;
			// in case total length is 5 minutes from the start
			if (settings[`${activeType}LengthSec`] === 5 * 60) return;
			alertSound();
			new Notification(`${formatIntervalString(activeType)}`, {
				body: "5 minutes left!",
			});
		},
		[timerRunning, runningSeconds, alertSound, activeType, settings],
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
				// auto start the next timer
				(nextType === "pomodoro" && settings.autoPomodoro) ||
				(nextType !== "pomodoro" && settings.autoBreaks)
			) {
				setTimeStampEnd(currentTimeStamp + settings[`${nextType}LengthSec`] * 1000);
			}
			timerEndedSound();
			const notificationMessage =
				nextType === "pomodoro" ? "Time to work!" : `Time for a ${formatIntervalString(nextType)}!`;
			new Notification("Timer Ended!", { body: notificationMessage });
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
			timerEndedSound,
		],
	);

	// * EVENT HANDLERS //
	function handlePause() {
		clickSound();
		if (!timerRunning) return;
		pauseTimer();
	}

	function handleStart() {
		clickSound();
		if (timerRunning) return;
		startTimer();
	}

	function handleType(event) {
		pauseTimer();
		const type = event.target.value;
		initType(type);
	}

	function handleSkip() {
		clickSound();
		pauseTimer();
		const nextType = getNextType();
		initType(nextType);

		if (
			// auto start next timer
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

	if (!pomodoroIsOpen) return;

	return (
		<>
			<div className="absolute left-1/2 top-1/2 z-10 grid h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 grid-cols-3 grid-rows-5 items-center justify-items-center gap-0 rounded-xl bg-slate-900 opacity-75">
				<div className="col-span-3">
					<h2 className="text-5xl">{activeTask}</h2>
				</div>
				<div className="row-start-2 justify-self-end text-3xl">
					<button onClick={handleType} value="pomodoro" className="">
						Pomodoro
					</button>
				</div>
				<div className="row-start-2 text-3xl">
					<button onClick={handleType} value="shortBreak" className="">
						Short Break
					</button>
				</div>
				<div className="row-start-2 justify-self-start text-3xl">
					<button onClick={handleType} value="longBreak" className="">
						Long Break
					</button>
				</div>
				<div className="col-span-3">
					<time className="">
						<span className="text-8xl">
							{Math.floor(displayedSeconds / 60)
								.toString()
								.padStart(2, 0)}
							:
							{Math.round(displayedSeconds % 60)
								.toString()
								.padStart(2, 0)}
						</span>
					</time>
				</div>
				<div className="col-span-3 row-start-4 self-start">
					{/* <h2 className="">
						{activeType === ""
							? `Cycle: #${pomodoroCycleDisplay} Rep: #${pomodoroRepDisplay}`
							: `Cycle: #${breakCycleDisplay} Rep: #${breakRepDisplay}`}
					</h2> */}
					{new Array(settings.interval).fill("").map((_, index) => (
						<ProgressDot key={index} filled={pomodoroRepDisplay >= index + 1} />
					))}
				</div>
				<div className="col-span-3 row-start-5">
					<ControlButton handler={timerRunning ? handlePause : handleStart}>
						{timerRunning ? "pause" : "play_arrow"}
					</ControlButton>
					{/* {<ControlButton handler={handleStart}>play_arrow</ControlButton>}
					{<ControlButton handler={handlePause}>pause</ControlButton>} */}
					{timerRunning && <ControlButton handler={handleSkip}>skip_next</ControlButton>}
				</div>
			</div>
		</>
	);
}
