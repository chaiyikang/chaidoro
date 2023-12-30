export function getStreak(stats) {
	const dates = [
		...new Set(
			stats
				.filter(stat => stat.task !== "Short Break" && stat.task !== "Long Break")
				.sort((a, b) => a.timeStampCreated - b.timeStampCreated)
				.map(stat => new Date(stat.timeStampCreated).toDateString()),
		),
	];
	let tempStreak = 0;
	let maxStreak = 0;
	let currentStreak = 0;
	dates.forEach((date, index, array) => {
		// check if the previous day was an adjacent day
		if (areAdjacentDays(date, array[index - 1])) {
			// if so, increment the streak
			tempStreak++;
			// if this is the last date, finalise the streak and check if this is the current streak
			if (index === array.length - 1) {
				maxStreak = tempStreak > maxStreak ? tempStreak : maxStreak;
				// if this is yesterday or today, set currentStreak
				if (isYesterdayOrToday(date)) currentStreak = tempStreak;
			}
		} else {
			// else the streak was broken and this is a new streak or the first day
			maxStreak = tempStreak > maxStreak ? tempStreak : maxStreak;
			// reset the streak as this is a new streak or the first day
			tempStreak = 1;
			// if this is the last date, finalise the streak and check if this is the current streak
			if (index === array.length - 1) {
				maxStreak = tempStreak > maxStreak ? tempStreak : maxStreak;
				// if this is yesterday or today, set currentStreak
				if (isYesterdayOrToday(date)) currentStreak = tempStreak;
			}
		}
	});
	return [currentStreak, maxStreak];
}

export function getInitThemeByTime() {
	const currentHour = new Date().getHours();
	return currentHour >= 7 && currentHour < 19 ? "seoulInsideDay" : "seoulInsideNight";
}

function isYesterdayOrToday(date) {
	date = new Date(date);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	// Check if the date is yesterday or today
	if (
		date.toDateString() === today.toDateString() ||
		date.toDateString() === yesterday.toDateString()
	) {
		return true;
	} else {
		return false;
	}
}

function areAdjacentDays(date1, date2) {
	if (!date1 || !date2) return false;
	date1 = new Date(date1);
	date2 = new Date(date2);
	// Convert the dates to time in milliseconds
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

	// Check if the time difference is exactly one day
	return timeDiff === oneDayInMilliseconds;
}

export function isSameDate(timeStamp1, timeStamp2) {
	return new Date(timeStamp1).toDateString() === new Date(timeStamp2).toDateString();
}

export function secondsToHours(sec) {
	return Math.round((sec / 60 / 60) * 10) / 10;
	// return sec;
}
export function secondsToMins(sec) {
	return Math.round((sec / 60) * 10) / 10;
	// return sec;
}

export function formatDate(timestamp) {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it starts from 0
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-SG", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
	});
}

export function convertMillisTo12HourTime(timestamp) {
	// Convert milliseconds to date object
	const date = new Date(timestamp);

	// Extract hours, minutes, and seconds
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Convert hours to 12-hour format
	const ampm = hours >= 12 ? "PM" : "AM";
	let hour = hours % 12;
	if (hour === 0) {
		hour = 12;
	}

	// Format time with leading zeros
	const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;

	// Return time with AM/PM indicator
	return `${formattedTime} ${ampm}`;
}

export function roundUpToNearestIntLimited(num, divisor, max) {
	// Check for invalid inputs
	if (typeof num !== "number" || typeof divisor !== "number" || typeof max !== "number") {
		throw new TypeError("Invalid input types");
	}
	// Calculate the quotient
	let quotient = Math.ceil(num / divisor);
	// Limit the quotient to the maximum value
	quotient = Math.min(quotient, max);
	return quotient;
}

export function getColorWithoutOpacity(colorStr) {
	if (colorStr.startsWith("#")) {
		return colorStr;
	} else if (colorStr.startsWith("rgba")) {
		const [red, green, blue] = colorStr.slice(4).split(",");
		return `rgb${red}, ${green}, ${blue})`;
	} else {
		return colorStr;
	}
}

// export function getColourGradient(value) {
// 	if (!value) return "fill-slate-50";
// 	const roundedValue = 200 + roundUpToNearestIntLimited(value, 60 * 60, 5) * 100;
// 	if (roundedValue === 100) return `fill-slate-100`;
// 	if (roundedValue === 200) return `fill-slate-200`;
// 	if (roundedValue === 300) return `fill-slate-300`;
// 	if (roundedValue === 400) return `fill-slate-400`;
// 	if (roundedValue === 500) return `fill-slate-500`;
// 	if (roundedValue === 600) return `fill-slate-600`;
// 	if (roundedValue === 700) return `fill-slate-700`;
// 	if (roundedValue === 800) return `fill-slate-800`;
// 	if (roundedValue === 900) return `fill-slate-900`;
// }
