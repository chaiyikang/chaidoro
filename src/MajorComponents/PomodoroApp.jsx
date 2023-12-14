function PomodoroApp({ children, dashboardIsOpen, catAppIsOpen }) {
	const translation = dashboardIsOpen
		? "translate-x-full"
		: catAppIsOpen
		? "-translate-x-full"
		: "translate-x-0";
	return (
		<div
			id="PomodoroApp"
			className={`absolute h-screen w-screen transition-all duration-500 ${translation}`}
		>
			{children}
		</div>
	);
}

export default PomodoroApp;
