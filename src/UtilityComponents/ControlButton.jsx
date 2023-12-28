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
	const seoulInsideDay = themeColour?.name === "seoulInsideDay";
	let ctrlBtnTheme;
	if (seoulInsideDay)
		ctrlBtnTheme = `${
			themeColour?.ctrlBtn + themeColour?.ctrlBtnHover + themeColour?.ctrlBtnActive
		}`;
	else ctrlBtnTheme = ` ${themeColour?.textHover + " " + themeColour?.textActive} `;

	return (
		<button
			onClick={handler}
			className={classes + " " + "leading-none outline-none transition-none"}
		>
			<span
				className={`material-symbols-outlined align-middle ${ctrlBtnTheme} ${fontSize}  ${iconClassName}`}
			>
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
