function ControlButton({ handler, children }) {
	return (
		<button onClick={handler} className="">
			<span className="material-symbols-outlined text-icon hover:text-slate-500 active:text-slate-600">
				{children}
			</span>
		</button>
	);
}

export default ControlButton;
