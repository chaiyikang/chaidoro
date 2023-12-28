import { useContext, useEffect } from "react";
import ControlButton from "../../UtilityComponents/ControlButton";
import { ThemeContext } from "../Theming/ThemeContext";

function Navbar({
	navPage,
	setNavPage,
	setStatsIsOpen,
	setToDoIsOpen,
	cacheStatsIsOpen,
	cacheToDoIsOpen,
}) {
	const indicatorTranslation =
		navPage === 0
			? "-translate-x-[3.55rem]"
			: navPage === 2
			? "translate-x-[3.55rem]"
			: "translate-x-0";

	const { themeColour } = useContext(ThemeContext);

	// if we hide stats, then go to dashboard, stats are "shown again". so when we go back to pomo we hide stats again
	useEffect(
		function rememberStatsOpenState() {
			if (navPage !== 1) return;
			if (!cacheStatsIsOpen) {
				setStatsIsOpen(false);
			}
			if (!cacheToDoIsOpen) {
				setToDoIsOpen(false);
			}
		},
		[cacheStatsIsOpen, cacheToDoIsOpen, navPage, setStatsIsOpen, setToDoIsOpen],
	);

	useEffect(
		function arrowKeyNav() {
			function handleKeyDown(e) {
				// console.log(e.key);
				if (e.key === "ArrowLeft" && navPage > 0) {
					if (navPage === 1) setStatsIsOpen(true); // hidden stats are pushed to left, so we dont want to show it in dashboard
					return setNavPage(page => page - 1);
				}
				if (e.key === "ArrowRight" && navPage < 2) {
					if (navPage === 1) setToDoIsOpen(true); // hidden toDoList are pushed to left, so we dont want to show it in dashboard
					return setNavPage(page => page + 1);
				}
			}
			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		},
		[navPage, setNavPage, setStatsIsOpen, setToDoIsOpen, cacheStatsIsOpen],
	);

	return (
		<div
			className={`navBar ${themeColour?.backgroundOpaque} absolute bottom-0 left-1/2 z-20 flex h-[4rem] w-[11rem] -translate-x-1/2 items-center justify-center rounded-full py-1`}
		>
			<div
				className={`absolute z-10 h-[3.5rem] w-[3.5rem] rounded-full ${themeColour?.navIndicator} $ opacity-100 transition-transform duration-300 ${indicatorTranslation}`}
			></div>
			<div className="absolute z-50 flex justify-between gap-[0.55rem]">
				<ControlButton
					handler={() => {
						setNavPage(0);
						setStatsIsOpen(true);
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
						setToDoIsOpen(true);
					}}
				>
					pets
				</ControlButton>
			</div>
		</div>
	);
}

export default Navbar;
