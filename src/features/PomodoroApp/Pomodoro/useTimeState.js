import { useEffect, useState } from "react";

export default function useTimeState() {
	const [time, setTime] = useState(new Date().getTime());

	useEffect(() => {
		const timerID = setInterval(() => {
			setTime(new Date().getTime());
		}, 1000);

		return () => {
			clearInterval(timerID);
		};
	}, []);

	return time;
}
