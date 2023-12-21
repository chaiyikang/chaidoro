function Overlay({ handleClose }) {
	return (
		<div
			onClick={handleClose}
			className="fixed left-0 top-0 z-[49] h-screen w-screen bg-black/70"
		></div>
	);
}

export default Overlay;
