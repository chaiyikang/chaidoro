import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function Button({ onClick, children, additionalClassName }) {
	const { themeColour } = useContext(ThemeContext);
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				`${themeColour?.button} ${themeColour?.buttonHover} ${themeColour?.buttonActive} inline-flex items-center rounded  p-3 text-base font-bold` +
				" " +
				additionalClassName
			}
		>
			{children}
		</button>
	);
}

export default Button;
