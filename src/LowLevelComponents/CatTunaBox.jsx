import { Tooltip } from "react-tooltip";
import { secondsToMins } from "../helpers";
import { CAT_FOOD_DURATION_SEC } from "../config";

function CatTunaBox({ children }) {
	const toolTipContent = `For every ${secondsToMins(
		CAT_FOOD_DURATION_SEC,
	)} minutes focused, you earn 1x food for the
	lil guy.`;
	return (
		<div
			data-tooltip-id="cat-feeding-info"
			data-tooltip-content={toolTipContent}
			className="absolute h-[5rem] w-[5rem]"
		>
			<Tooltip id="cat-feeding-info" />
			{/*?xml version="1.0" encoding="utf-8"?*/}
			{/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
			{children}
			<svg
				viewBox="0 0 1024 1024"
				className="icon"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M41.3 301.2h940.1v644.5H41.3z" fill="#845A3D" />
				<path
					d="M981.4 958.4H41.3c-7 0-12.6-5.7-12.6-12.6V301.2c0-7 5.7-12.6 12.6-12.6h940.1c7 0 12.6 5.7 12.6 12.6v644.5c0 7-5.6 12.7-12.6 12.7zM53.9 933.1h914.9V313.9H53.9v619.2z"
					fill="#141414"
				/>
				<path
					d="M977.2 301.2H45.4c-1.8 0-2.8-2-1.8-3.4L201.2 71.9h620.2L979 297.8c1 1.5 0 3.4-1.8 3.4z"
					fill="#845A3D"
				/>
				<path
					d="M977.2 313.9H45.4c-5.5 0-10.6-3-13.1-8-2.6-4.9-2.2-10.8 1-15.3L190.9 64.7c2.4-3.4 6.2-5.4 10.4-5.4h620.2c4.1 0 8 2 10.4 5.4l157.6 225.9c3.2 4.5 3.5 10.4 1 15.3-2.7 4.9-7.7 8-13.3 8zM65.5 288.6h891.7L814.8 84.5h-607L65.5 288.6z"
					fill="#141414"
				/>
				<path d="M511.3 301.2V71.9" fill="#845A3D" />
				<path
					d="M511.3 313.9c-7 0-12.6-5.7-12.6-12.6V71.9c0-7 5.7-12.6 12.6-12.6S524 64.9 524 71.9v229.3c0 7-5.7 12.7-12.7 12.7z"
					fill="#141414"
				/>
				<path d="M648.9 200.1H373.8l46.8-47.1h181.5z" fill="#E8CBB8" />
				<path
					d="M95.8 301.2h18v644.5h-18zM212 301.2h18v644.5h-18zM328.1 301.2h18v644.5h-18zM444.3 301.2h18v644.5h-18zM560.4 301.2h18v644.5h-18zM792.7 301.2h18v644.5h-18zM676.5 301.2h18v644.5h-18zM908.8 301.2h18v644.5h-18z"
					fill="#663C20"
				/>
				<path
					d="M926.7 958.4H96c-37.1 0-67.3-30.2-67.3-67.3V355.9c0-37.1 30.2-67.3 67.3-67.3h830.7c37.1 0 67.3 30.2 67.3 67.3v535.2c0 37.1-30.2 67.3-67.3 67.3zM96 313.9c-23.2 0-42.1 18.9-42.1 42.1v535.2c0 23.2 18.9 42.1 42.1 42.1h830.7c23.2 0 42.1-18.9 42.1-42.1V355.9c0-23.2-18.9-42.1-42.1-42.1H96z"
					fill="#141414"
				/>
				<path
					d="M676.8 561.4h-331c-24.8 0-45.1-20.3-45.1-45.1s20.3-45.1 45.1-45.1h331c24.8 0 45.1 20.3 45.1 45.1s-20.3 45.1-45.1 45.1z"
					fill="#26211E"
				/>
				<path
					d="M676.8 574.1h-331c-31.9 0-57.8-25.9-57.8-57.8s25.9-57.8 57.8-57.8h331c31.9 0 57.8 25.9 57.8 57.8s-25.9 57.8-57.8 57.8z m-331-90.3c-17.9 0-32.5 14.6-32.5 32.5s14.6 32.5 32.5 32.5h331c17.9 0 32.5-14.6 32.5-32.5s-14.6-32.5-32.5-32.5h-331z"
					fill="#141414"
				/>
				<path
					d="M830.1 876H730c-19.6 0-35.5-15.9-35.5-35.5V791c0-19.6 15.9-35.5 35.5-35.5h100c19.6 0 35.5 15.9 35.5 35.5v49.5c0 19.6-15.9 35.5-35.4 35.5z"
					fill="#D39E33"
				/>
				<path
					d="M831.1 888.6H729c-26 0-47.1-21.1-47.1-47.1V790c0-26 21.1-47.1 47.1-47.1h102c26 0 47.1 21.1 47.1 47.1v51.5c0 26-21.1 47.1-47 47.1zM729 768.2c-12 0-21.8 9.8-21.8 21.8v51.5c0 12 9.8 21.8 21.8 21.8h102c12 0 21.8-9.8 21.8-21.8V790c0-12-9.8-21.8-21.8-21.8H729z"
					fill="#111111"
				/>
			</svg>
		</div>
	);
}

export default CatTunaBox;