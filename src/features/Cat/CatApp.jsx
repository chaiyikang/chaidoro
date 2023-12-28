import Draggable from "react-draggable";
import CatTuna from "./CatTuna";
import Cat from "./Cat";
import { useInView } from "react-intersection-observer";
import { useContext, useRef, useState } from "react";
import CatTunaBox from "./CatTunaBox";
import toast from "react-hot-toast";
import CatProgress from "./CatProgress";
import { isSameDate } from "../../main/helpers";
import { ThemeContext } from "../Theming/ThemeContext";

function CatApp({ navPage, catFoodStats, setCatFoodStats }) {
	const { themeColour } = useContext(ThemeContext);
	// * STATE //
	const [foodOriginalPosition1, setFoodOriginalPosition1] = useState(false);

	// * DERIVED STATE //
	const translation =
		navPage === 0
			? "translate-x-[200%]" // x o o
			: navPage === 2
			? "translate-x-0" // o o x
			: "translate-x-full"; // o x o
	const foodBalance =
		catFoodStats?.reduce((acc, curr) => acc + curr.foodEarned - curr.foodFed, 0) || 0;
	const foodFedToday = catFoodStats?.find(ele => isSameDate(ele.date, new Date()))?.foodFed || 0;

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

	function handleNoMoreFood() {
		if (foodBalance <= 0)
			return toast.error("You don't have any food left. Keep focusing to earn more.");
	}

	return (
		<div
			id="CatApp"
			className={`h-screen w-screen transition-transform duration-500 ${translation}`}
		>
			<Cat foodFedToday={foodFedToday}>
				<CatTunaBox handler={handleNoMoreFood}>
					<div
						className={`absolute bottom-0 right-0 w-auto -translate-x-[2rem] rounded-full bg-red-400 px-2 text-center text-4xl text-red-900`}
					>
						{foodBalance}
					</div>
				</CatTunaBox>

				{foodOriginalPosition1 || foodBalance <= 0 ? (
					"" // to destroy the element, resetting the translation state
				) : (
					<div className="tra absolute bottom-0 left-0 w-fit -translate-x-[390%] -translate-y-[270%]">
						<Draggable>
							<div className="shieldDiv">
								<div
									className="catTunaContainer cursor-grab active:cursor-grabbing"
									onMouseDown={handleNoMoreFood}
									ref={ref}
								>
									<CatTuna />
								</div>
							</div>
						</Draggable>
					</div>
				)}
				<CatProgress value={foodFedToday} />
			</Cat>
		</div>
	);
}

export default CatApp;
