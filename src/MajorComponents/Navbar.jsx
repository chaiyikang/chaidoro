import ControlButton from "../LowLevelComponents/ControlButton";

function Navbar({ dashboardIsOpen, setDashboardIsOpen }) {
	return (
		<div className="absolute bottom-5 left-1/2 z-20 flex h-[4rem] w-[7.5rem] -translate-x-1/2 items-center justify-center rounded-full bg-slate-900 py-1">
			<div
				className={`absolute z-10 h-[3.5rem] w-[3.5rem] rounded-full bg-slate-200 opacity-100 transition-all duration-300 ${
					dashboardIsOpen ? "-translate-x-7" : "translate-x-7"
				}`}
			></div>
			<div className="absolute z-50 flex justify-between gap-[0.55rem]">
				<ControlButton
					handler={() => {
						setDashboardIsOpen(true);
					}}
				>
					home
				</ControlButton>
				<ControlButton
					handler={() => setDashboardIsOpen(false)}
					iconClassName="material-symbols-outlined-max-weight"
				>
					lightbulb
				</ControlButton>
			</div>
		</div>
	);
}

export default Navbar;