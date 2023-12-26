import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { convertMillisTo12HourTime, secondsToHours } from "../../main/helpers";
import quotesArray from "./quotes";
import Calendar from "./Calendar";
import SearchStats from "./SearchStats";
import ControlButton from "../../UtilityComponents/ControlButton";
import { STATS_VS_QUOTE_PROB } from "../../main/config";
import { ThemeContext } from "../Theming/ThemeContext";
import DayNightToggle from "../Theming/DayNightToggle";

function chooseMessage(array1, array2, probability1) {
	if (Math.random() < probability1 && array1.length > 0) {
		return array1[Math.floor(Math.random() * array1.length)];
	} else {
		return array2[Math.floor(Math.random() * array2.length)];
	}
}

function Dashboard({
	navPage,
	setNavPage,
	currentTimeStamp,
	stats,
	setShowStatsDate,
	lifetimeWorkSessions,
	lifetimeCurrentSecondsFocused,
	day,
	setDay,
	setTheme,
}) {
	const { themeColour } = useContext(ThemeContext);

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

	// * CREATE MESSAGES FOR TOP 3 TASKS //
	const descendingTaskStats = taskStats?.toSorted((a, b) => b.totalLength - a.totalLength);
	const top3TasksStats = descendingTaskStats?.slice(0, 3);
	const top3TaskStatsMessages = top3TasksStats?.map(taskStat => {
		if (taskStat.task === "Break")
			return `You spent ${secondsToHours(taskStat.totalLength)} hours resting. Way to work smart!`;
		else return `You spent ${secondsToHours(taskStat.totalLength)} hours on "${taskStat.task}"!`;
	});

	// * CREATE MESSAGE FOR TOTAL STATS //
	const totalStatMessage = `You have completed ${lifetimeWorkSessions} sessions, focusing for a total of ${secondsToHours(
		lifetimeCurrentSecondsFocused,
	)} hours.`;
	const statsMessages = useMemo(() => {
		if (lifetimeCurrentSecondsFocused > 0) return [...top3TaskStatsMessages, totalStatMessage];
		else return [...top3TaskStatsMessages];
	}, [top3TaskStatsMessages, totalStatMessage, lifetimeCurrentSecondsFocused]);

	// * CREATE STATE //
	const [displayMessage, setDisplayMessage] = useState(
		chooseMessage(statsMessages, quotesArray, STATS_VS_QUOTE_PROB),
	);
	const [displayMessageHasInit, setDisplayMessageHasInit] = useState(false);

	// * if the user has stats, we re-generate the message so the statistics message may appear //
	useEffect(
		function initDisplayMessage() {
			if (!displayMessageHasInit && statsMessages.length > 0) {
				// console.log(statsMessages);
				setDisplayMessage(chooseMessage(statsMessages, quotesArray, STATS_VS_QUOTE_PROB));
				setDisplayMessageHasInit(true);
			}
		},
		[statsMessages, displayMessageHasInit],
	);

	// * HANDLERS //
	function handleRefresh() {
		setDisplayMessage(chooseMessage(statsMessages, quotesArray, STATS_VS_QUOTE_PROB));
	}

	// function handleThemeChange(e) {
	// 	const theme = e.target.value;
	// 	if (!themes.includes(theme)) return;
	// 	setTheme(theme);
	// }

	// * UI //
	const translation =
		navPage === 0 ? "translate-x-0" : navPage === 2 ? "-translate-x-[200%]" : "-translate-x-full";
	let timeTheme;
	timeTheme = themeColour?.name === `seoulInsideDay` ? "text-amber-200" : "";

	return (
		<div
			id="Dashboard"
			className={`absolute z-10 h-full w-full transition-all duration-500 ${translation}`}
		>
			{/* <select onChange={handleThemeChange} value={theme}>
				{themes.map(theme => (
					<option key={theme}>{theme}</option>
				))}
			</select> */}
			<h1 className={`${themeColour?.background} text-xl font-bold`}>
				{displayMessage}
				<ControlButton handler={handleRefresh} fontSize="text-3xl">
					restart_alt
				</ControlButton>
			</h1>
			<time
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-8xl ${timeTheme}`}
			>
				{convertMillisTo12HourTime(currentTimeStamp)}
			</time>
			<Calendar stats={stats} setShowStatsDate={setShowStatsDate} setNavPage={setNavPage} />
			<SearchStats taskStats={taskStats} />
		</div>
	);
}

export default Dashboard;
