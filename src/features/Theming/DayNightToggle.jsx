function DayNightToggle({ day, setDay, setTheme }) {
	function handleCheck() {
		setDay(check => !check);
		if (day) setTheme("seoulInsideNight");
		else setTheme("seoulInsideDay");
	}
	return (
		<div className="absolute bottom-0 left-1/2 z-20 translate-x-full">
			<div className="container flex h-auto w-auto items-center justify-center bg-transparent">
				<div className="switch">
					<label htmlFor="toggle">
						<input
							id="toggle"
							onChange={handleCheck}
							checked={day}
							className="toggle-switch"
							type="checkbox"
						/>
						<div className="sun-moon">
							<div className="dots" />
						</div>
						<div className="background">
							<div className="stars1" />
							<div className="stars2" />
						</div>
					</label>
				</div>
			</div>
		</div>
	);
}

export default DayNightToggle;
