import CalendarHeatmap from "react-calendar-heatmap";
import Button from "../LowLevelComponents/Button";
import { isSameDate, secondsToHours, secondsToMins } from "../helpers";
import { useState } from "react";
import Calendar from "./Calendar";

export function Stats({
	lifetimeCurrentSecondsFocused,
	setLifetimeArchivedSecondsFocused,
	todayCurrentSecondsFocused,
	stats,
	setStats,
	statsIsOpen,
	lifetimeWorkSessions,
	currentTimeStamp,
}) {
	const [calendarIsOpen, setCalendarIsOpen] = useState(false);

	function handleClearTodayTimeline() {
		if (
			!confirm(
				"Are you sure you want to clear today's timeline? Your total time and sessions will still be saved.",
			)
		)
			return;
		setLifetimeArchivedSecondsFocused(old => old + todayCurrentSecondsFocused);
		setStats(old => old.filter(stat => !isSameDate(stat.timeStampCreated, currentTimeStamp)));
	}

	// if (!statsIsOpen) return;
	return (
		<>
			{calendarIsOpen && <Calendar stats={stats} />}
			<div
				className={`text-base-content absolute left-0 top-0 h-screen w-3/12 overflow-y-auto bg-slate-900 p-4 opacity-75 transition-transform duration-500 ease-in-out ${
					statsIsOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<ul>
					<li>
						<h1 className="text-7xl">Daily Stats</h1>
					</li>
					<li>
						<h1 className="text-2xl italic ">
							{secondsToHours(todayCurrentSecondsFocused)} Hours Focused Today
						</h1>
					</li>
					<li>
						<h1 className="text-xl italic ">
							Work Sessions Completed Today: {lifetimeWorkSessions}
						</h1>
					</li>
					{stats
						.filter(stat => isSameDate(stat.timeStampCreated, currentTimeStamp))
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
					<li>
						<Button additionalClassName="mt-2" onClick={() => setCalendarIsOpen(old => !old)}>
							Lifetime Stats
						</Button>
					</li>
				</ul>
			</div>
		</>
	);
}
