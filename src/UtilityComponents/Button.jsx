import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function Button({ onClick, children, additionalClassName }) {
	const { theme } = useContext(ThemeContext);
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				`bg-${theme}-600 hover:bg-${theme}-700 active:bg-${theme}-800 inline-flex items-center rounded  p-3 text-base font-bold` +
				" " +
				additionalClassName
			}
		>
			{children}
		</button>
	);
}

export default Button;
