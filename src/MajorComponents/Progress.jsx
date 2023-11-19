function Progress({ ratioDone, children }) {
	// const RADIUS = 36;
	const offsetValue = ratioDone * -101;
	return (
		<>
			<div className="relative z-10 grid h-[15rem] w-[15rem]">
				<svg
					className="h-full w-full"
					width={36}
					height={36}
					viewBox={`0 0 36 36`}
					xmlns="http://www.w3.org/2000/svg"
				>
					{/* Background Circle */}
					<circle
						cx={18}
						cy={18}
						r={16}
						fill="none"
						className="stroke-current text-slate-500 "
						strokeWidth={1}
					/>
					{/* Progress Circle inside a group with rotation */}
					<g className="origin-center -rotate-90 transform">
						<circle
							cx={18}
							cy={18}
							r={16}
							fill="none"
							className="stroke-current text-gray-700"
							strokeWidth={1}
							strokeDasharray={101}
							strokeDashoffset={offsetValue}
						/>
					</g>
				</svg>
				{/* Percentage Text */}
				<div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
					{children}
				</div>
			</div>
		</>
	);
}

export default Progress;
