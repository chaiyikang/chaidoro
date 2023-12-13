import { convertMillisTo12HourTime, secondsToHours } from "../helpers";
import Calendar from "./Calendar";
import SearchStats from "./SearchStats";

function Dashboard({
	dashboardIsOpen,
	currentTimeStamp,
	stats,
	setShowStatsDate,
	setDashboardIsOpen,
}) {
	const taskStats = [];
	stats.forEach(ele => {
		const existingTaskStat = taskStats.find(
			taskStat => ele.task.toLowerCase() === taskStat.task.toLowerCase(),
		);
		if (existingTaskStat) {
			existingTaskStat.totalLength += ele.lengthSec;
		} else {
			taskStats.push({ task: ele.task, totalLength: ele.lengthSec });
		}
	});

	const breakTimeSec =
		(taskStats.find(taskStat => taskStat.task === "Short Break")?.totalLength || 0) +
		(taskStats.find(taskStat => taskStat.task === "Long Break")?.totalLength || 0);

	return (
		<div
			className={`absolute z-10 h-full w-full transition-all duration-500 ${
				dashboardIsOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<h1 className="bg-slate-900 text-xl font-bold opacity-75">
				&apos;In business, each jump from 0 to 1 happens only once. The next Bill Gates won’t invent
				an operating system; the next Mark Zuckerberg won’t build a social network. The next
				innovator of the same caliber will build something unimagined to this point. Successful
				people don’t look for formulas or choose from existing options, they “rewrite the plan of
				the world.” &apos;
			</h1>
			<h1 className="bg-slate-900 text-xl font-bold opacity-75">
				You spent {secondsToHours(breakTimeSec)} hours resting.
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
