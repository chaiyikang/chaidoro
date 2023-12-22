import { useContext } from "react";
import ControlButton from "../../UtilityComponents/ControlButton";
import { ThemeContext } from "../Theming/ThemeContext";

function Navbar({ navPage, setNavPage }) {
	const indicatorTranslation =
		navPage === 0
			? "-translate-x-[3.55rem]"
			: navPage === 2
			? "translate-x-[3.55rem]"
			: "translate-x-0";

	const { themeColour } = useContext(ThemeContext);

	return (
		<div
			className={`navBar ${themeColour?.backgroundOpaque} absolute bottom-5 left-1/2 z-20 flex h-[4rem] w-[11rem] -translate-x-1/2 items-center justify-center rounded-full py-1`}
		>
			<div
				className={`absolute z-10 h-[3.5rem] w-[3.5rem] rounded-full ${themeColour?.navIndicator} $ opacity-100 transition-all duration-300 ${indicatorTranslation}`}
			></div>
			<div className="absolute z-50 flex justify-between gap-[0.55rem]">
				<ControlButton
					handler={() => {
						setNavPage(0);
					}}
				>
					home
				</ControlButton>
				<ControlButton
					handler={() => {
						setNavPage(1);
					}}
					iconClassName="material-symbols-outlined-max-weight"
				>
					lightbulb
				</ControlButton>
				<ControlButton
					handler={() => {
						setNavPage(2);
					}}
				>
					pets
				</ControlButton>
			</div>
		</div>
	);
}

export default Navbar;
