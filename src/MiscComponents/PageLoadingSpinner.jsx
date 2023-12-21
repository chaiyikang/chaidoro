import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function PageLoadingSpinner() {
	const { themeColour } = useContext(ThemeContext);

	return (
		<div className={`grid h-screen w-screen place-items-center bg-neutral-800`}>
			<div
				className={`text-netural-400 inline-block h-[10rem] w-[10rem] animate-spin rounded-full border-[1rem] border-current border-t-transparent`}
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default PageLoadingSpinner;
