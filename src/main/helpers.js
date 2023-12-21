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
