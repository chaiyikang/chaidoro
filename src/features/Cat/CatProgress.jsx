import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../Theming/ThemeContext";

function CatProgress({ value }) {
	const { theme } = useContext(ThemeContext);
	let catProgressInfo;
	if (value === 0) catProgressInfo = `The lil guy is starving. GET TO WORK!!!`;
	if (value === 1)
		catProgressInfo = `That's it? The lil guy is still very hungry. Work more human!`;
	if (value === 2) catProgressInfo = `He's not on a diet! More!`;
	if (value === 3) catProgressInfo = `The lil guy is satisfied. `;
	if (value >= 4)
		catProgressInfo = `The lil guy is completely stuffed. It's your fault if he becomes a chonkster.`;
	return (
		<div
			className={`flex h-4 w-full overflow-hidden rounded-full bg-${theme}700`}
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin="0"
			aria-valuemax="4"
			data-tooltip-id="cat-progress-info"
			data-tooltip-content={catProgressInfo}
		>
			<Tooltip id="cat-progress-info" />
			<div
				className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full bg-blue-600 text-center text-xs text-white transition duration-500"
				style={{ width: `${(value / 4) * 100}%` }}
			>
				{value} / 4
			</div>
		</div>
	);
}

export default CatProgress;
