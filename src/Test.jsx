import { useState } from "react";
import { formatDate, getColourGradient, roundUpToNearestIntLimited } from "./helpers";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactCalendarHeatmap from "react-calendar-heatmap";

function Test({ stats }) {
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	);
	let calendarData = [];
	// [
	// 	{ date: "2023-01-01", totalLength: 12 },
	// 	{ date: "2023-01-22", totalLength: 122 },
	// 	{ date: "2023-01-30", totalLength: 38 },
	// ];
	stats.forEach(ele => {
		if (!ele) return;
		if (ele.task === "Short Break" || ele.task === "Long Break") return;
		const dateString = formatDate(ele.timeStampCreated);
		if (calendarData.at(-1)?.date === dateString) {
			calendarData[calendarData.length - 1].totalLength += ele.lengthSec;
		} else {
			calendarData.push({ date: dateString, totalLength: ele.lengthSec });
		}
	});
	const calendarCounts = calendarData.map(ele => ({
		date: ele.date,
		count: 200 + roundUpToNearestIntLimited(ele.totalLength, 60 * 60, 5) * 100,
	}));
	return (
		<>
			<div className="h-[500px] w-[500px] bg-red-600">
				<ReactCalendarHeatmap
					startDate={startDate}
					endDate={endDate}
					// values={[
					// 	{ date: "2023-01-01", count: 12 },
					// 	{ date: "2023-01-22", count: 122 },
					// 	{ date: "2023-01-30", count: 38 },
					// ]}
					values={calendarCounts}
					classForValue={value => {
						return getColourGradient(value?.count);
					}}
					showWeekdayLabels={false}
					showMonthLabels={false}
				/>
			</div>
		</>
	);
}

export default Test;
