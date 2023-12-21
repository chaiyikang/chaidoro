import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function PageLoadingSpinner() {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`grid h-screen w-screen place-items-center bg-${theme}-800`}>
			<div
				className={`inline-block h-[10rem] w-[10rem] animate-spin rounded-full border-[1rem] border-current border-t-transparent text-${theme}-400`}
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default PageLoadingSpinner;
