import ControlButton from "../LowLevelComponents/ControlButton";

function Navbar({ dashboardIsOpen, setDashboardIsOpen, catAppIsOpen, setCatAppIsOpen }) {
	const indicatorTranslation = dashboardIsOpen
		? "-translate-x-[3.55rem]"
		: catAppIsOpen
		? "translate-x-[3.55rem]"
		: "translate-x-0";
	return (
		<div className="absolute bottom-5 left-1/2 z-20 flex h-[4rem] w-[11rem] -translate-x-1/2 items-center justify-center rounded-full bg-slate-900 py-1">
			<div
				className={`absolute z-10 h-[3.5rem] w-[3.5rem] rounded-full bg-slate-200 opacity-100 transition-all duration-300 ${indicatorTranslation}`}
			></div>
			<div className="absolute z-50 flex justify-between gap-[0.55rem]">
				<ControlButton
					handler={() => {
						setDashboardIsOpen(true);
						setCatAppIsOpen(false);
					}}
				>
					home
				</ControlButton>
				<ControlButton
					handler={() => {
						setDashboardIsOpen(false);
						setCatAppIsOpen(false);
					}}
					iconClassName="material-symbols-outlined-max-weight"
				>
					lightbulb
				</ControlButton>
				<ControlButton
					handler={() => {
						setDashboardIsOpen(false);
						setCatAppIsOpen(true);
					}}
				>
					pets
				</ControlButton>
			</div>
		</div>
	);
}

export default Navbar;
