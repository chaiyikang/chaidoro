import { useState } from "react";
import useSound from "use-sound";
import meowSfx from "../sounds/meowwww.mp3";
import { CAT_FEED_MAX } from "../config";
import CatFed4SvgContent from "./CatFed4SvgContent";
import CatFed3SvgContent from "./CatFed3SvgContent";
import CatFed2SvgContent from "./CatFed2SvgContent";
import CatFedSvgContent from "./CatFedSvgContent";

function Cat({ children, foodFedToday }) {
	const [animate, setAnimate] = useState(false);
	const [meowSound] = useSound(meowSfx);

	function handlePet() {
		setAnimate(true);
		meowSound();
	}

	return (
		<div
			className={`myCatHehe absolute left-1/2 top-1/2 z-10 h-[15rem] w-[20rem] -translate-x-1/2 -translate-y-1/2
			transition-transform duration-500 ease-in-out`}
		>
			<h1 className="absolute">
				{foodFedToday} / {CAT_FEED_MAX}
			</h1>
			{children}
			<svg
				onMouseEnter={handlePet}
				onMouseLeave={() => setAnimate(false)}
				className={`${animate ? "open" : "close"} h-auto w-auto`}
				id="svgContainer"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="50 90 230 180"
				shapeRendering="geometricPrecision"
				textRendering="geometricPrecision"
			>
				<CatFedSvgContent fedState={foodFedToday} />
			</svg>
		</div>
	);
}

export default Cat;
