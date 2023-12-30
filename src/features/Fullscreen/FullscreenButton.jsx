import { useContext, useEffect, useState } from "react";
import ControlButton from "../../UtilityComponents/ControlButton";
import { ThemeContext } from "../Theming/ThemeContext";
import { Tooltip } from "react-tooltip";
import { InputFocusContext } from "./InputFocusContext";

function FullscreenButton() {
	const { themeColour } = useContext(ThemeContext);
	const someInputIsFocused = useContext(InputFocusContext);
	const [fullscreen, setFullscreen] = useState(false); // we don't actually need state, but we use it to make the button change more responsive

	useEffect(
		function pressEnterToFullscreen() {
			function handlePressEnterFullscreen(e) {
				if (e.key !== "Enter") return;
				if (someInputIsFocused) return;
				toggleFullScreen();
			}
			document.addEventListener("keydown", handlePressEnterFullscreen);
			return () => document.removeEventListener("keydown", handlePressEnterFullscreen);
		},
		[someInputIsFocused],
	);

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setFullscreen(true);
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
			setFullscreen(false);
		}
	}
	return (
		<div
			data-tooltip-id="fullscreen-info"
			data-tooltip-content={`Press "Enter" to toggle fullscreen.`}
			className={`absolute bottom-0 right-0 z-50 rounded-full p-3 ${themeColour?.backgroundOpaque}`}
		>
			<Tooltip id="fullscreen-info" />
			<ControlButton handler={toggleFullScreen}>
				{fullscreen ? "fullscreen_exit" : "fullscreen"}
			</ControlButton>
		</div>
	);
}

export default FullscreenButton;
