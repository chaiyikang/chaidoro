function DayNightToggle({ checked, handler }) {
	return (
		<div className="absolute left-1/2 top-1/2">
			<div className="container flex h-auto w-auto items-center justify-center bg-transparent">
				<div className="switch">
					<label htmlFor="toggle">
						<input
							id="toggle"
							onChange={handler}
							checked={checked}
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
