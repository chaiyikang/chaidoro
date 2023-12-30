import CalendarHeatmap from "react-calendar-heatmap";
import {
	formatDate,
	formatDateDisplay,
	getStreak,
	roundUpToNearestIntLimited,
	secondsToMins,
} from "../../main/helpers";
import { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import ControlButton from "../../UtilityComponents/ControlButton";
import { ThemeContext } from "../Theming/ThemeContext";

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

function Calendar({ stats, setShowStatsDate, setNavPage }) {
	const { themeColour } = useContext(ThemeContext);
	const [currentStreak, maxStreak] = getStreak(stats);
	const [changeRange, setChangeRange] = useState(0);
	// month
	const startDate = new Date(new Date().getFullYear(), new Date().getMonth() + changeRange, 1);
	const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1 + changeRange, 0);

	// for every statistic, collate the total duration worked that day
	let workDaysData = [];
	stats.forEach(ele => {
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
		setShowStatsDate(value.date);
		setNavPage(1);
	}

	return (
		<div className="z-50 w-1/6 bg-transparent">
			<div className="flex justify-center">
				<ControlButton handler={handlePrev}>navigate_before</ControlButton>
				<ControlButton handler={handleNext}>navigate_next</ControlButton>
			</div>
			<div className={`${themeColour?.calendarBackground}`}>
				<p className="">Longest Streak🔥: {maxStreak} days</p>
				<p className="">Current Streak🔥: {currentStreak} days</p>
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
						if (!value?.totalLength) return `${themeColour?.fillEmpty}`;
						const roundedValue =
							200 + roundUpToNearestIntLimited(value.totalLength, 60 * 60, 5) * 100;
						return `${themeColour[`fill${roundedValue}`]} outline-none`;
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
			</div>
			<Tooltip id="my-tooltip" />
		</div>
	);
}

export default Calendar;
