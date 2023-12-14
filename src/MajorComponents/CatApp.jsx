import Draggable from "react-draggable";
import CatTuna from "../LowLevelComponents/CatTuna";
import Cat from "./Cat";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";

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
			setTimeout(() => setFoodOriginalPosition1(false), 10);
			// alert("fed");
		},
	});

	const [foodOriginalPosition1, setFoodOriginalPosition1] = useState(false);

	return (
		<div id="CatApp" className={`h-screen w-screen transition-all duration-500 ${translation}`}>
			<Cat>
				<div className="w-[3rem]">
					{foodOriginalPosition1 ? (
						// <Draggable>
						<div className="foodContainerDragOffset">
							<div className="foodContainer absolute left-0  top-0 grid h-[5rem] w-[5rem] translate-x-[25rem] translate-y-[12rem] place-items-center bg-blue-900">
								<div className="catTunaDragOffset">
									<div className="catTunaContainer" ref={ref}>
										<CatTuna />
									</div>
								</div>
							</div>
						</div>
					) : (
						// </Draggable>
						// <Draggable>
						<div className="foodContainerDragOffset">
							<div className="foodContainer absolute left-0 top-0 grid h-[5rem] w-[5rem] translate-x-[25rem] translate-y-[12rem] place-items-center bg-blue-900">
								<Draggable>
									<div className="catTunaDragOffset">
										<div className="catTunaContainer" ref={ref}>
											<CatTuna />
										</div>
									</div>
								</Draggable>
							</div>
						</div>
						// </Draggable>
					)}
				</div>
			</Cat>
		</div>
	);
}

export default CatApp;
