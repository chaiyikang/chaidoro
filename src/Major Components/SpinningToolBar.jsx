import { useState } from "react";
import ControlButton from "../Low Level Components/ControlButton";

function SpinningToolBar({ setSettingsIsOpen, setPomodoroIsOpen, setStatsIsOpen, setToDoIsOpen }) {
	const [spinnerOpen, setSpinnerOpen] = useState(false);
	return (
		<div className="spinnerContainer absolute bottom-2 right-[25rem] z-10 ">
			<div className="relative grid h-[10rem]  w-[10rem] place-items-center ">
				<ControlButton
					classes="material-symbols-outlined text-7xl"
					handler={() => setSpinnerOpen(old => !old)}
				>
					grid_view
				</ControlButton>
				<ControlButton
					handler={() => setSettingsIsOpen(old => !old)}
					classes={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4 -translate-y-2/4 translate-x-[120%]  opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					settings
				</ControlButton>
				<ControlButton
					handler={() => setPomodoroIsOpen(old => !old)}
					classes={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4 -translate-x-[120%] -translate-y-2/4  opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					timer
				</ControlButton>
				<ControlButton
					handler={() => setStatsIsOpen(old => !old)}
					classes={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4 -translate-y-[150%] opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					bar_chart
				</ControlButton>
				<ControlButton
					handler={() => setToDoIsOpen(old => !old)}
					classes={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4  translate-y-[55%]  opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 -rotate-90 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					checklist
				</ControlButton>
			</div>
		</div>
	);
}

export default SpinningToolBar;
