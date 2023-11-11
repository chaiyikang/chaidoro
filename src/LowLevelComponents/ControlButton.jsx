function ControlButton({ handler, children, classes = "" }) {
	return (
		<button onClick={handler} className={classes}>
			<span className="material-symbols-outlined text-7xl hover:text-slate-500 active:text-slate-600">
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
