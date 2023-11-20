import Button from "../LowLevelComponents/Button";

export function Stats({ totalTimeFocused, stats, setStats, statsIsOpen, totalWorkSessions }) {
	// const timeProportions = stats.map(ele => ele.lengthSec / totalTimeFocused);

	function handleClearAll() {
		if (!confirm("Are you sure you want to permanently delete all statistics?")) return;
		setStats([]);
	}

	if (!statsIsOpen) return;
	return (
		<ul className="text-base-content absolute left-0 top-0 h-screen w-3/12 overflow-y-auto bg-slate-900 p-4 opacity-75 ">
			<li>
				<h1 className="text-7xl">Stats</h1>
			</li>
			<li>
				<h1 className="text-2xl italic ">Total Seconds Focused: {totalTimeFocused}</h1>
			</li>
			<li>
				<h1 className="text-2xl italic ">Work Sessions Completed: {totalWorkSessions}</h1>
			</li>
			{stats.map((stat, index) => {
				return (
					<li
						className="mt-2 bg-slate-700 text-xl"
						key={index}
						// TODO adjust minimum height
						style={{
							height: `${stat.lengthSec <= 60 ? 10 : Math.round(stat.lengthSec * 0.1)}vh`,
						}}
					>
						<h1>
							{index + 1}. {stat.task}
						</h1>
						<h1>Seconds Spent: {stat.lengthSec}</h1>
					</li>
				);
			})}
			<li>
				<Button additionalClassName="mt-2" onClick={handleClearAll}>
					Clear
				</Button>
			</li>
		</ul>
	);
}
