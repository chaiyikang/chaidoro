function PomodoroButton({ setPomodoroIsOpen }) {
	return (
		<button
			onClick={() => {
				setPomodoroIsOpen(curr => !curr);
			}}
			className="absolute bottom-0 right-0"
		>
			<span className="material-symbols-outlined">timer</span>
		</button>
	);
}

export default PomodoroButton;
