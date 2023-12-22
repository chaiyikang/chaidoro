import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../Theming/ThemeContext";

function CatProgress({ value }) {
	const { themeColour } = useContext(ThemeContext);
	let catProgressInfo;
	if (value === 0) catProgressInfo = `The lil guy is starving. GET TO WORK!!!`;
	if (value === 1)
		catProgressInfo = `That's it? The lil guy is still very hungry. Work more human!`;
	if (value === 2) catProgressInfo = `He's not on a diet! More!`;
	if (value === 3) catProgressInfo = `The lil guy is satisfied. `;
	if (value >= 4)
		catProgressInfo = `The lil guy is completely stuffed. It's your fault if he becomes a chonkster.`;
	return (
		<>
			<Tooltip id="cat-progress-info" />

			<div
				className={`flex h-6 w-full overflow-hidden rounded-full ${themeColour?.catProgressBackground}`}
				data-tooltip-id="cat-progress-info"
				data-tooltip-content={catProgressInfo}
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={1}
				aria-valuemax={4}
			>
				<div
					className={`flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full  ${themeColour?.catProgress} text-center text-xl ${themeColour?.catProgressText} py-1 font-medium duration-500`}
					style={{
						width: `${(value / 4) * 100}%`,
						transition: `width 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
					}}
				>
					{value} / 4
				</div>
			</div>
		</>
	);
}

export default CatProgress;
