function PomodoroButton({ setPomodoroIsOpen }) {
	return (
		<button
			onClick={() => {
				setPomodoroIsOpen(curr => !curr);
			}}
			className="absolute bottom-12 right-0"
		>
			<span className="material-symbols-outlined text-slate-400 text-7xl">timer</span>
		</button>
	);
}

export default PomodoroButton;
