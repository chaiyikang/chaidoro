import CalendarHeatmap from "react-calendar-heatmap";
import {
	formatDate,
	formatDateDisplay,
	getColourGradient,
	secondsToHours,
	secondsToMins,
} from "../helpers";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { FormProvider } from "react-hook-form";

function populateMonthlyData(calendarData, startDate, endDate) {
	const newCalendarData = [];
	let currentDate = startDate;
	// console.log("🚀 ~ file: Calendar.jsx:14 ~ populateMonthlyData ~ currentDate:", currentDate);

	while (currentDate <= endDate) {
		const existingData = calendarData.find(item => item.date === formatDate(currentDate));
		newCalendarData.push({
			date: formatDate(currentDate),
			totalLength: existingData ? existingData.totalLength : 0,
		});
		currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
	}
	return newCalendarData;
}

function Calendar({ stats }) {
	const [startDate, setStartDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
	);
	const [endDate, setEndDate] = useState(
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	);

	// for every statistic, collate the total duration worked that day
	let workDaysData = [];
	stats.forEach(ele => {
		if (!ele) return;
		if (ele.task === "Short Break" || ele.task === "Long Break") return;
		const dateString = formatDate(ele.timeStampCreated);
		if (workDaysData.at(-1)?.date === dateString) {
			workDaysData[workDaysData.length - 1].totalLength += ele.lengthSec;
		} else {
			workDaysData.push({ date: dateString, totalLength: ele.lengthSec });
		}
	});

	// for every day in the active month, collate the total duration worked
	const everyDayData = populateMonthlyData(workDaysData, startDate, endDate);
	console.log(everyDayData);

	return (
		<div className="absolute left-1/2 top-1/2 z-50 w-1/6 -translate-x-1/2 -translate-y-1/2 bg-slate-900">
			<CalendarHeatmap
				startDate={new Date(startDate).setDate(startDate.getDate() - 1)} // for some reason not inclusive of start date
				endDate={endDate}
				// values={[
				// 	{ date: "2023-01-01", totalLength: 12 },
				// 	{ date: "2023-01-22", totalLength: 122 },
				// 	{ date: "2023-01-30", totalLength: 38 },
				// ]}
				values={everyDayData}
				classForValue={value => {
					return getColourGradient(value?.totalLength);
				}}
				tooltipDataAttrs={value => {
					// console.log(value);
					return {
						"data-tooltip-id": "my-tooltip",
						"data-tooltip-content": `${formatDateDisplay(value.date)}: ${secondsToMins(
							value.totalLength,
						)} mins`,
					};
				}}
				showWeekdayLabels={false}
				showMonthLabels={false}
			/>
			<Tooltip id="my-tooltip" />
		</div>
	);
}

export default Calendar;
