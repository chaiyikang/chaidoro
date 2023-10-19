export function Stats({ totalTimeFocused, stats }) {
	return (
		<ul className="p-4 w-3/12 h-screen overflow-y-scroll bg-gray-500 text-base-content absolute top-0 left-0 ">
			<li>
				<h1 className="text-xl">Stats</h1>
			</li>
			<li>
				<h1>Total Seconds Focused: {totalTimeFocused}</h1>
			</li>
			{stats.map((stat, index) => {
				return (
					<li className="mt-2" key={index}>
						<h1>
							{index + 1}. {stat.task}
						</h1>
						<h1>Seconds Spent: {stat.lengthSec}</h1>
					</li>
				);
			})}
		</ul>
	);
}
