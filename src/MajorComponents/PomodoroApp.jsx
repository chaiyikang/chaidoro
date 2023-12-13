function PomodoroApp({ children, dashboardIsOpen }) {
	return (
		<div
			className={`h-screen w-screen transition-all duration-500 ${
				dashboardIsOpen ? "translate-x-full" : ""
			}`}
		>
			{children}
		</div>
	);
}

export default PomodoroApp;
