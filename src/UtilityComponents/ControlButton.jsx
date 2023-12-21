import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function ControlButton({
	handler,
	children,
	classes = "",
	fontSize = "text-7xl",
	iconClassName = "",
}) {
	const { themeColour } = useContext(ThemeContext);
	return (
		<button onClick={handler} className={classes + "leading-none outline-none"}>
			<span
				className={`material-symbols-outlined align-middle ${fontSize} ${themeColour?.textHover} ${themeColour?.textActive} ${iconClassName}`}
			>
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
