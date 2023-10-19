export function Stats({ totalTimeFocused, stats }) {
	return (
		<div className="h-10 outline-double absolute top-0 left-0">
			<ul className="menu p-4 w-70 overflow-hidden bg-gray-500 text-base-content ">
				<li>
					<h1 className="text-xl">Stats</h1>
				</li>
				<li>
					<h1>Total Seconds Focused: {totalTimeFocused}</h1>
				</li>
				{stats.map((stat, index) => {
					return (
						<li key={index}>
							<h1>
								{index + 1}. {stat.task}
							</h1>
							<h1>Seconds Spent: {stat.lengthSec}</h1>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
