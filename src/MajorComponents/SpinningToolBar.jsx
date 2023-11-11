import { useState } from "react";
import ControlButton from "../Low Level Components/ControlButton";

function SpinningToolBar({ setSettingsIsOpen, setPomodoroIsOpen, setStatsIsOpen, setToDoIsOpen }) {
	const [spinnerOpen, setSpinnerOpen] = useState(false);
	return (
		<nav className="menu absolute bottom-48 right-[5rem] z-40 h-[50px] w-[75px] ">
			<div
				className="absolute z-50 h-[50px] w-[75px]"
				onClick={() => setSpinnerOpen(old => !old)}
			></div>
			<input checked={spinnerOpen} className="menu-toggler" id="menu-toggler" type="checkbox" />
			<label className="spinnerOpen" htmlFor="menu-toggler" />
			<ul>
				<li className="menu-item">
					<ControlButton handler={() => setSettingsIsOpen(old => !old)}>settings</ControlButton>
				</li>
				<li className="menu-item">
					<ControlButton handler={() => setSettingsIsOpen(old => !old)}>settings</ControlButton>
				</li>
				<li className="menu-item">
					<ControlButton handler={() => setSettingsIsOpen(old => !old)}>settings</ControlButton>
				</li>
				<li className="menu-item">
					<ControlButton handler={() => setStatsIsOpen(old => !old)}>bar_chart</ControlButton>
				</li>
				<li className="menu-item">
					<ControlButton handler={() => setPomodoroIsOpen(old => !old)}>timer</ControlButton>
				</li>
				<li className="menu-item">
					<ControlButton handler={() => setToDoIsOpen(old => !old)}>checklist</ControlButton>
				</li>
			</ul>
		</nav>

		// <div className="spinnerContainer absolute bottom-2 right-[25rem] z-10 ">
		// 	<div className="relative grid h-[10rem]  w-[10rem] place-items-center ">
		// 		<ControlButton
		// 			classes="material-symbols-outlined text-7xl"
		// 			handler={() => setSpinnerOpen(old => !old)}
		// 		>
		// 			grid_view
		// 		</ControlButton>
		// 		<ControlButton
		// 			handler={() => setSettingsIsOpen(old => !old)}
		// 			classes={`material-symbols-outlined text-7xl ${
		// 				spinnerOpen
		// 					? "z-1 visible absolute top-2/4 -translate-y-2/4 translate-x-[120%]  opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 					: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 			}`}
		// 		>
		// 			settings
		// 		</ControlButton>
		// 		<div
		// 			className={`rotationContainer ${
		// 				spinnerOpen ? "-rotate-90 transition-all duration-[1s]" : ""
		// 			}`}
		// 		>
		// 			<ControlButton
		// 				handler={() => setPomodoroIsOpen(old => !old)}
		// 				classes={`material-symbols-outlined text-7xl -z-10 absolute ${
		// 					spinnerOpen
		// 						? " visible opacity-1  "
		// 						: " left-2/6 visible opacity-1 circleAnimated origin-[130%_-30%] rotate(90)"
		// 				}`}
		// 			>
		// 				timer
		// 			</ControlButton>
		// 		</div>
		// 		<ControlButton
		// 			handler={() => setStatsIsOpen(old => !old)}
		// 			classes={`material-symbols-outlined text-7xl ${
		// 				spinnerOpen
		// 					? "z-1 visible absolute top-2/4 -translate-y-[150%] opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 					: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 			}`}
		// 		>
		// 			bar_chart
		// 		</ControlButton>
		// 		<ControlButton
		// 			handler={() => setToDoIsOpen(old => !old)}
		// 			classes={`material-symbols-outlined text-7xl ${
		// 				spinnerOpen
		// 					? "z-1 visible absolute top-2/4  translate-y-[55%]  opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 					: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
		// 			}`}
		// 		>
		// 			checklist
		// 		</ControlButton>
		// 	</div>
		// </div>
	);
}

export default SpinningToolBar;
