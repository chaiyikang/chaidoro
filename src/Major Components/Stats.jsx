export function Stats({ totalTimeFocused, stats }) {
	return (
		<ul className="text-base-content absolute left-0 top-0 h-screen w-3/12 overflow-y-auto bg-slate-900 p-4 opacity-75 ">
			<li>
				<h1 className="text-7xl">Stats</h1>
			</li>
			<li>
				<h1 className="text-2xl italic ">Total Seconds Focused: {totalTimeFocused}</h1>
			</li>
			{stats.map((stat, index) => {
				return (
					<li className="mt-2 text-xl" key={index}>
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
