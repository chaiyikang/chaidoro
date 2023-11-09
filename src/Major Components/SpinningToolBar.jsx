import { useState } from "react";

function SpinningToolBar({ setSettingsIsOpen, setPomodoroIsOpen }) {
	const [spinnerOpen, setSpinnerOpen] = useState(false);
	return (
		<div className="spinnerContainer absolute bottom-2 right-[25rem] z-10 ">
			<div className="relative grid h-[10rem]  w-[10rem] place-items-center ">
				<span
					className="material-symbols-outlined text-7xl"
					onClick={() => setSpinnerOpen(old => !old)}
				>
					grid_view
				</span>
				<span
					onClick={() => setSettingsIsOpen(old => !old)}
					className={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4 -translate-y-2/4 translate-x-[120%] -rotate-90 opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					settings
				</span>
				<span
					onClick={() => setPomodoroIsOpen(old => !old)}
					className={`material-symbols-outlined text-7xl ${
						spinnerOpen
							? "z-1 visible absolute top-2/4 -translate-x-[120%] -translate-y-2/4 -rotate-90 opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
							: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
					}`}
				>
					timer
				</span>
			</div>
		</div>
	);
}

export default SpinningToolBar;
