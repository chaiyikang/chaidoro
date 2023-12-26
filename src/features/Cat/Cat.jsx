import { useState } from "react";
import useSound from "use-sound";
import meowSfx from "./meowwww.mp3";
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
			className={`myCatHehe absolute bottom-20 right-20 z-10 h-[15rem] w-[20rem] 	
			transition-transform duration-500 ease-in-out`}
		>
			{/* <h1 className="absolute">
				{foodFedToday} / {CAT_FEED_MAX}
			</h1> */}
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
			{children}
		</div>
	);
}

export default Cat;
