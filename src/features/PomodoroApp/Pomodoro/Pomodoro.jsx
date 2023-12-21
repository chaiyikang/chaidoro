import { useContext, useEffect, useState } from "react";
import ProgressDot from "./ProgressDot";
import ControlButton from "../../../UtilityComponents/ControlButton";
import useSound from "use-sound";
import clickSfx from "./sounds/click.mp3";
import alertSfx from "./sounds/alert.mp3";
import timerEndedSfx from "./sounds/timerEnded.mp3";
import { getUserData, useRetrieveOrUpdate } from "../../Account/supabaseUserData";
import { useQuery } from "@tanstack/react-query";
import Progress from "./Progress";
import { formatDate, isSameDate } from "../../../main/helpers";
import { CAT_FOOD_DURATION_SEC } from "../../../main/config";
import { ThemeContext } from "../../Theming/ThemeContext";

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
	setPomodoroIsOpen,
	setLifetimeWorkSessions,
	catFoodStats,
	setCatFoodStats,
	catFoodStatsLoaded,
}) {
	const { theme, insideNight: themeColour } = useContext(ThemeContext);

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

	const todaySecondsFocused = stats.reduce((acc, curr) => {
		if (curr.task === "Short Break" || curr.task === "Long Break") return acc;
		if (!isSameDate(new Date(), curr.timeStampCreated)) return acc;
		return acc + curr.lengthSec;
	}, 0);
	const catFoodEarnedToday = Math.floor(todaySecondsFocused / CAT_FOOD_DURATION_SEC);
	const catFoodStatTodayInited = Boolean(
		catFoodStats?.find(ele => ele.date === formatDate(new Date())),
	);

	const activeTask =
		activeType === "pomodoro"
			? toDos.filter(task => task.active)[0]?.text ?? "No task selected"
			: activeType === "shortBreak"
			? "Short Break"
			: "Long Break";

	const lastTask = stats?.at(-1)?.task;

	// * BACKEND //
	const { data: userData } = useQuery({
		queryKey: ["userData"],
		queryFn: getUserData,
	});

	useRetrieveOrUpdate(userData, "work_sets_completed", setWorkSetsCompleted, workSetsCompleted);

	// * SOUND //
	const [clickSound] = useSound(clickSfx);
	const [alertSound] = useSound(alertSfx);
	const [timerEndedSound] = useSound(timerEndedSfx);

	// * EFFECTS //
	useEffect(
		function updateCatFoodStats() {
			if (!catFoodStatsLoaded) return; // wait for supabase stats (if any) to be applied
			if (!catFoodStatTodayInited) {
				// create new stat for the day
				setCatFoodStats(stats => [
					...stats,
					{ date: formatDate(new Date()), foodEarned: catFoodEarnedToday, foodFed: 0 },
				]);
			} else {
				// update food earned
				setCatFoodStats(foodStats =>
					foodStats.map(ele => {
						if (ele.date === formatDate(new Date()))
							return { ...ele, foodEarned: catFoodEarnedToday };
						else return ele;
					}),
				);
			}
		},
		[catFoodEarnedToday, catFoodStatTodayInited, setCatFoodStats, catFoodStatsLoaded],
	);

	useEffect(
		function cacheSecondsLeft() {
			if (!timerRunning) return;
			setSecondsLeftCache(runningSeconds);
		},
		[runningSeconds, timerRunning, setSecondsLeftCache],
	);

	useEffect(
		function updateStats() {
			if (!timerRunning) {
				if (stats.length === 0) return;
				setStats(old => [...old.slice(0, -1), { ...old.at(-1), stale: true }]);
				return;
			}
			// setTotalSecondsFocused(old => old + 1);
			if (activeTask === lastTask) {
				setStats(old => {
					const currStat = old.at(-1);
					// const staleTime = Math.round((currentTimeStamp - currStat.lastUpdatedTimeStamp) / 1000);
					const addSec = !currStat.stale
						? Math.round((currentTimeStamp - currStat.lastUpdatedTimeStamp) / 1000)
						: 0;
					return [
						...old.slice(0, -1),
						{
							...currStat,
							lastUpdatedTimeStamp: currentTimeStamp,
							lengthSec: currStat.lengthSec + addSec,
							stale: false,
						},
					];
				});
			} else {
				setStats(old => [
					...old,
					{
						task: activeTask,
						lengthSec: 0,
						timeStampCreated: currentTimeStamp,
						lastUpdatedTimeStamp: currentTimeStamp,
						stale: false,
						show: true,
					},
				]);
			}
		},
		[timerRunning, activeTask, lastTask, setStats, currentTimeStamp, stats.length],
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
			setPomodoroIsOpen(true);
			if (activeType === "pomodoro") {
				setWorkSetsCompleted(sets => sets + 1);
				setLifetimeWorkSessions(total => total + 1);
				// setCatFoodStats(q => q + 1);
			}
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
			setLifetimeWorkSessions,
			setPomodoroIsOpen,
			setCatFoodStats,
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
		// // !TESTING
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

	function handleResetCycle() {
		clickSound();
		if (!confirm("Are you sure you want to reset the work cycle?")) return;
		setWorkSetsCompleted(0);
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
		<>
			<div
				className={`pomodoroDiv absolute left-1/2 top-[17rem] z-10 grid h-[500px] w-[460px] -translate-x-1/2 grid-cols-3  grid-rows-[62.5px_62.5px_312.5px_62.5px] items-center justify-items-center gap-0 rounded-xl ${
					themeColour?.background
				} transition-transform duration-500 ease-in-out ${
					pomodoroIsOpen ? "-translate-y-1/2" : " -translate-y-[170%]"
				}`}
			>
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
				{/*  ? */}
				<div className="row-end-8 col-span-3 row-start-3">
					<Progress
						ratioDone={
							(settings[`${activeType}LengthSec`] - secondsLeftCache) /
							settings[`${activeType}LengthSec`]
						}
					>
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
						<div className="mt-4 flex justify-center">
							{new Array(settings.interval).fill("").map((_, index) => (
								<ProgressDot key={index} filled={pomodoroRepDisplay >= index + 1} />
							))}
						</div>
						<div onClick={handleResetCycle} className="mt-2 flex justify-center">
							<ControlButton fontSize="base">restart_alt</ControlButton>
						</div>
					</Progress>
				</div>

				<div className="row-start-8 col-span-3">
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
