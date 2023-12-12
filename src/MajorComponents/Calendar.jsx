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

import ControlButton from "../LowLevelComponents/ControlButton";

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

function Calendar({ stats, setCalendarIsOpen, setShowStatsDate }) {
	const [changeRange, setChangeRange] = useState(0);
	const startDate = new Date(new Date().getFullYear(), new Date().getMonth() + changeRange, 1);
	const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1 + changeRange, 0);

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

	function handleNext() {
		setChangeRange(old => old + 1);
	}

	function handlePrev() {
		setChangeRange(old => old - 1);
	}

	function handleClickDay(value) {
		setCalendarIsOpen(false);
		setShowStatsDate(value.date);
	}

	return (
		<div className="absolute left-1/2 top-1/2 z-50 w-1/6 -translate-x-1/2 -translate-y-1/2 bg-slate-900">
			<div className="flex justify-center">
				<ControlButton handler={handlePrev}>navigate_before</ControlButton>
				<ControlButton handler={handleNext}>navigate_next</ControlButton>
			</div>
			<CalendarHeatmap
				startDate={new Date(startDate).setDate(startDate.getDate() - 1)} // for some reason not inclusive of start date
				endDate={endDate}
				// values={[
				// 	{ date: "2023-01-01", totalLength: 12 },
				// 	{ date: "2023-01-22", totalLength: 122 },
				// 	{ date: "2023-01-30", totalLength: 38 },
				// ]}
				values={everyDayData}
				onClick={handleClickDay}
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
				horizontal={false}
			/>
			<Tooltip id="my-tooltip" />
		</div>
	);
}

export default Calendar;
