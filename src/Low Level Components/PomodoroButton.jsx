function PomodoroButton({ setPomodoroIsOpen }) {
	return (
		<button
			onClick={() => {
				setPomodoroIsOpen(curr => !curr);
			}}
			className="  z-2 absolute bottom-12 right-0"
		>
			<span className="material-symbols-outlined text-7xl text-slate-400">timer</span>
		</button>
	);
}

export default PomodoroButton;
