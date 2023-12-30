import { getInitThemeByTime } from "../main/helpers";

function PageLoadingSpinner() {
	const day = getInitThemeByTime() === "seoulInsideDay" ? true : false;

	return (
		<div
			className={`grid h-screen w-screen place-items-center ${
				day ? "bg-amber-100" : "bg-indigo-700"
			}`}
		>
			<div
				className={`${
					day ? "text-amber-600" : "text-indigo-200"
				} inline-block h-[10rem] w-[10rem] animate-spin rounded-full border-[1rem] border-current border-t-transparent`}
				role="status"
				aria-label="loading"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default PageLoadingSpinner;
