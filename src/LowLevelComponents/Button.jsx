function Button({ onClick, children, additionalClassName }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={
				"inline-flex items-center rounded bg-slate-600 p-3 text-base  font-bold hover:bg-slate-700 active:bg-slate-800" +
				" " +
				additionalClassName
			}
		>
			{children}
		</button>
	);
}

export default Button;
