import { useState } from "react";
import useSound from "use-sound";
import meowSadSfx from "./meowSad.mp3";
import meowFedSfx from "./meowwww.mp3";
import CatFedSvgContent from "./CatFedSvgContent";

function Cat({ children, foodFedToday, show }) {
	const [animate, setAnimate] = useState(false);
	const [meowFed] = useSound(meowFedSfx, { interrupt: true });
	const [meowSad] = useSound(meowSadSfx, { interrupt: true });

	function handlePet() {
		setAnimate(true);
		if (foodFedToday <= 2) {
			meowSad();
		} else {
			meowFed();
		}
	}

	return (
		<div
			className={`myCatHehe absolute bottom-[10%] right-[5%] z-10 h-[15rem] w-[20rem] 	
			transition-transform duration-500 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}
		>
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
