function PomodoroApp({ children, navPage }) {
	const translation =
		navPage === 0 ? "translate-x-full" : navPage === 2 ? "-translate-x-full" : "translate-x-0";
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
