import Button from "../LowLevelComponents/Button";
import { formatDateDisplay, isSameDate, secondsToHours, secondsToMins } from "../helpers";
import { useState } from "react";
import Calendar from "./Calendar";
import SearchStats from "./SearchStats";

export function Stats({
	lifetimeCurrentSecondsFocused,
	setLifetimeArchivedSecondsFocused,
	stats,
	setStats,
	statsIsOpen,
	lifetimeWorkSessions,
	currentTimeStamp,
	showStatsDate,
	setShowStatsDate,
}) {
	const isShowingToday = formatDateDisplay(showStatsDate) === formatDateDisplay(new Date());

	const daySecondsFocused = stats.reduce((acc, curr) => {
		return isSameDate(showStatsDate, curr.timeStampCreated) ? acc + curr.lengthSec : acc;
	}, 0);

	function handleClearTodayTimeline() {
		if (
			!confirm(
				`Are you sure you want to clear ${
					isShowingToday ? "today" : "the day"
				}'s timeline? Your total time and sessions will still be saved.`,
			)
		)
			return;
		setLifetimeArchivedSecondsFocused(old => old + daySecondsFocused);
		setStats(old => old.filter(stat => !isSameDate(stat.timeStampCreated, currentTimeStamp)));
	}

	// if (!statsIsOpen) return;
	return (
		<>
			<div
				className={`text-base-content absolute left-0 top-0 h-screen w-3/12 overflow-y-auto bg-slate-900 p-4 opacity-75 transition-transform duration-500 ease-in-out ${
					statsIsOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<ul>
					<li>
						<h1 className="text-3xl">{formatDateDisplay(showStatsDate)} </h1>
						{!isShowingToday && (
							<text onClick={() => setShowStatsDate(new Date())}>View today</text>
						)}
					</li>
					<li>
						<h1 className="text-2xl italic ">
							{secondsToHours(daySecondsFocused)} Hours Focused {isShowingToday ? "Today" : ""}
						</h1>
					</li>
					{/* <li>
						<h1 className="text-xl italic ">
							Work Sessions Completed {isShowingToday ? "Today" : ""}: {lifetimeWorkSessions}
						</h1>
					</li> */}
					{stats
						.filter(stat => isSameDate(stat.timeStampCreated, showStatsDate))
						.map((stat, index) => {
							return (
								<li
									className="mt-2 rounded-xl bg-slate-700 p-2 text-xl"
									key={index}
									// TODO adjust minimum height
									style={{
										height: `${
											secondsToMins(stat.lengthSec) <= 5
												? 10
												: 10 + (secondsToMins(stat.lengthSec) - 5) * 0.1
										}vh`,
									}}
								>
									<h1>
										{index + 1}. {stat.task}
									</h1>
									<h1>{secondsToMins(stat.lengthSec)} min</h1>
								</li>
							);
						})}
					<li>
						<Button additionalClassName="mt-2" onClick={handleClearTodayTimeline}>
							Clear
						</Button>
					</li>
				</ul>
			</div>
		</>
	);
}
