function ControlButton({
	handler,
	children,
	classes = "",
	fontSize = "text-7xl",
	iconClassName = "",
}) {
	return (
		<button onClick={handler} className={classes + "leading-none"}>
			<span
				className={`material-symbols-outlined align-middle ${fontSize} hover:text-slate-500 active:text-slate-600 ${iconClassName}`}
			>
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
