function ProgressDot({ filled }) {
	return <span className={`material-symbols-outlined ${filled ? "filled-icon" : ""}`}>circle</span>;
}

export default ProgressDot;
