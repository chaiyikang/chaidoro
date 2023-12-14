import { useEffect, useRef, useState } from "react";
import { convertMillisTo12HourTime, secondsToHours } from "../helpers";
import quotesArray from "../quotes";
import Calendar from "./Calendar";
import SearchStats from "./SearchStats";
import ControlButton from "../LowLevelComponents/ControlButton";

function chooseMessage(array1, array2, probability1) {
	if (Math.random() < probability1 && array1.length > 0) {
		return array1[Math.floor(Math.random() * array1.length)];
	} else {
		return array2[Math.floor(Math.random() * array2.length)];
	}
}

function Dashboard({
	dashboardIsOpen,
	catAppIsOpen,
	currentTimeStamp,
	stats,
	setShowStatsDate,
	setDashboardIsOpen,
}) {
	// * DERIVE ARRAY OF STATS OF EACH TASK //
	const taskStats = [];
	stats.forEach(ele => {
		let isBreak = false;
		if (ele.task === "Short Break" || ele.task === "Long Break") {
			isBreak = true;
		}
		// determine if task has already been added
		const existingTaskStat = taskStats.find(taskStat => {
			if (!isBreak) return ele.task.toLowerCase() === taskStat.task.toLowerCase();
			if (isBreak) return "Break" === taskStat.task;
		});
		if (existingTaskStat) {
			existingTaskStat.totalLength += ele.lengthSec;
		} else {
			if (!isBreak) taskStats.push({ task: ele.task, totalLength: ele.lengthSec });
			else if (isBreak) taskStats.push({ task: "Break", totalLength: ele.lengthSec });
		}
	});

	// * CREATE ARRAY OF MESSAGES //
	const descendingTaskStats = taskStats?.toSorted((a, b) => b.totalLength - a.totalLength);
	const top3TasksStats = descendingTaskStats?.slice(0, 3);
	const top3TaskStatsMessages = top3TasksStats?.map(taskStat => {
		if (taskStat.task === "Break")
			return `You spent ${secondsToHours(taskStat.totalLength)} hours resting. Way to work smart!`;
		else return `You spent ${secondsToHours(taskStat.totalLength)} hours on "${taskStat.task}"!`;
	});

	const [displayMessage, setDisplayMessage] = useState(
		chooseMessage(top3TaskStatsMessages, quotesArray, 0.5),
	);
	const [displayMessageHasInit, setDisplayMessageHasInit] = useState(false);

	// * if the user has stats, we re-generate the message so the statistics message may appear //
	useEffect(
		function initDisplayMessage() {
			if (!displayMessageHasInit && top3TaskStatsMessages.length > 0) {
				// console.log(top3TaskStatsMessages);
				setDisplayMessage(chooseMessage(top3TaskStatsMessages, quotesArray, 0.5));
				setDisplayMessageHasInit(true);
			}
		},
		[top3TaskStatsMessages, displayMessageHasInit],
	);

	// * HANDLERS //
	function handleRefresh() {
		setDisplayMessage(chooseMessage(top3TaskStatsMessages, quotesArray, 0.5));
	}

	// * UI //
	const translation = dashboardIsOpen
		? "translate-x-0"
		: catAppIsOpen
		? "-translate-x-[200%]"
		: "-translate-x-full";

	return (
		<div
			id="Dashboard"
			className={`absolute z-10 h-full w-full transition-all duration-500 ${translation}`}
		>
			<h1 className="bg-slate-900 text-xl font-bold opacity-75">
				{displayMessage}
				<ControlButton handler={handleRefresh} fontSize="text-3xl">
					restart_alt
				</ControlButton>
			</h1>
			<time className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-8xl">
				{convertMillisTo12HourTime(currentTimeStamp)}
			</time>
			<Calendar
				stats={stats}
				setShowStatsDate={setShowStatsDate}
				setDashboardIsOpen={setDashboardIsOpen}
			/>
			<SearchStats taskStats={taskStats} />
		</div>
	);
}

export default Dashboard;
