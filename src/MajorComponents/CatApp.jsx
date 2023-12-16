import Draggable from "react-draggable";
import CatTuna from "../LowLevelComponents/CatTuna";
import Cat from "./Cat";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import CatTunaBox from "../LowLevelComponents/CatTunaBox";

function CatApp({ dashboardIsOpen, catAppIsOpen }) {
	const translation = dashboardIsOpen
		? "translate-x-[200%]" // x o o
		: catAppIsOpen
		? "translate-x-0" // o o x
		: "translate-x-full"; // o x o

	const { ref, inView, entry } = useInView({
		root: document.querySelector(".myCatHehe"),
		threshold: 1,
		onChange: (inView, entry) => {
			if (!inView) return;
			setFoodOriginalPosition1(true);
			setTimeout(() => setFoodOriginalPosition1(false), 0);
			// alert("fed");
		},
	});

	const [foodOriginalPosition1, setFoodOriginalPosition1] = useState(false);

	return (
		<div id="CatApp" className={`h-screen w-screen transition-all duration-500 ${translation}`}>
			<Cat>
				<div className="w-[3rem]">
					<div className="masterFoodContainer absolute left-0 top-0 translate-x-[30rem] translate-y-[10rem]">
						<div className="foodContainer  h-[5rem] w-[5rem]  bg-blue-900">
							<CatTunaBox />

							{foodOriginalPosition1 ? (
								<div className="shieldDiv">
									<div className="catTunaContainer absolute " ref={ref}>
										<CatTuna />
									</div>
								</div>
							) : (
								<Draggable>
									<div className="shieldDiv">
										<div className="catTunaContainer absolute " ref={ref}>
											<CatTuna />
										</div>
									</div>
								</Draggable>
							)}
						</div>
					</div>
				</div>
			</Cat>
		</div>
	);
}

export default CatApp;
