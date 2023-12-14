import Cat from "./Cat";

function CatApp({ dashboardIsOpen, catAppIsOpen }) {
	const translation = dashboardIsOpen
		? "translate-x-[200%]" // x o o
		: catAppIsOpen
		? "translate-x-0" // o o x
		: "translate-x-full"; // o x o
	return (
		<div id="CatApp" className={`h-screen w-screen transition-all duration-500 ${translation}`}>
			<Cat />
		</div>
	);
}

export default CatApp;
