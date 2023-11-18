import { useEffect } from "react";

export default function useTitle(secondsLeftCache, activeType) {
	useEffect(
		function updateTitle() {
			const timeString = `${Math.floor(secondsLeftCache / 60)
				.toString()
				.padStart(2, 0)}:${Math.round(secondsLeftCache % 60)
				.toString()
				.padStart(2, 0)}`;
			document.title = `${formatIntervalString(activeType)} || ${timeString}`;
		},
		[secondsLeftCache, activeType],
	);
}

function formatIntervalString(camelCase) {
	const spacedString = camelCase.replace(/([A-Z])/g, " $1");
	const displayType = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
	return displayType;
}
