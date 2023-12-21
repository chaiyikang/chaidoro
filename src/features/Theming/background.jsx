import { useState, useRef, useEffect } from "react";
import insideDay from "./videos/inside-day.mp4";
import insideNight from "./videos/inside-night.mp4";
import DayNightToggle from "./DayNightToggle";

export function Background({ day }) {
	return (
		<>
			{/* <input onChange={handleCheck} checked={day} type="checkbox" /> */}
			<video
				className={`absolute left-0 top-0 -z-10 h-screen w-screen bg-fixed object-cover transition-opacity delay-0 duration-500 ease-in-out ${
					day ? `opacity-100 ` : `opacity-0`
				} `}
				autoPlay
				muted
			>
				<source src={insideDay} type="video/mp4" />
			</video>
			<video
				className={`absolute left-0 top-0 -z-10 h-screen w-screen bg-fixed object-cover transition-opacity delay-0 duration-500 ease-in-out ${
					!day ? `opacity-100 ` : `opacity-0`
				} `}
				autoPlay
				muted
			>
				<source src={insideNight} type="video/mp4" />
			</video>
		</>
	);
}
