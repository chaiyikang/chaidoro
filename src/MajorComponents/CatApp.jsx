import Draggable from "react-draggable";
import CatTuna from "../LowLevelComponents/CatTuna";
import Cat from "./Cat";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import CatTunaBox from "../LowLevelComponents/CatTunaBox";
import toast from "react-hot-toast";
import { isSameDate } from "../helpers";

function CatApp({ dashboardIsOpen, catAppIsOpen, catFoodStats, setCatFoodStats }) {
	const [foodOriginalPosition1, setFoodOriginalPosition1] = useState(false);
	const translation = dashboardIsOpen
		? "translate-x-[200%]" // x o o
		: catAppIsOpen
		? "translate-x-0" // o o x
		: "translate-x-full"; // o x o
	const foodBalance = catFoodStats.reduce((acc, curr) => acc + curr.foodEarned - curr.foodFed, 0);

	const { ref, inView, entry } = useInView({
		root: document.querySelector(".myCatHehe"),
		threshold: 1,
		onChange: (inView, entry) => {
			if (!inView) return;
			if (foodBalance === 0) return toast.error("You don't have any food left.");
			setCatFoodStats(stats =>
				stats.map(stat =>
					isSameDate(stat.date, new Date()) ? { ...stat, foodFed: stat.foodFed + 1 } : stat,
				),
			);
			setFoodOriginalPosition1(true);
			setTimeout(() => setFoodOriginalPosition1(false), 0);
			// alert("fed");
		},
	});

	function handleClickFood() {
		if (foodBalance <= 0)
			return toast.error("You don't have any food left. Keep focusing to earn more.");
	}

	return (
		<div id="CatApp" className={`h-screen w-screen transition-all duration-500 ${translation}`}>
			<Cat>
				<div className="w-[3rem]">
					<div className="absolute left-0 top-0 translate-x-[30rem] translate-y-[10rem]">
						<div className="h-[5rem] w-[5rem]  bg-blue-900">
							<CatTunaBox>
								<div className="absolute bottom-0 right-0 bg-red-400">{foodBalance} </div>
							</CatTunaBox>

							{foodOriginalPosition1 || foodBalance <= 0 ? (
								<div className="shieldDiv">
									<div
										className="catTunaContainer absolute "
										onMouseDown={handleClickFood}
										ref={ref}
									>
										<CatTuna />
									</div>
								</div>
							) : (
								<Draggable>
									<div className="shieldDiv">
										<div
											className="catTunaContainer absolute "
											onMouseDown={handleClickFood}
											ref={ref}
										>
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
