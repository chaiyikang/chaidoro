function ControlButton({ handler, children, classes = "", fontSize = "text-7xl" }) {
	return (
		<button onClick={handler} className={classes}>
			<span
				className={`material-symbols-outlined ${fontSize} hover:text-slate-500 active:text-slate-600`}
			>
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
