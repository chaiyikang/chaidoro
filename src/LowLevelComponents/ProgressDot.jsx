function ProgressDot({ filled }) {
	return (
		<span className={`material-symbols-outlined ${filled ? "" : "unfilled-icon"}`}>circle</span>
	);
}

export default ProgressDot;
