import { useState } from "react";
import { secondsToHours } from "../helpers";

function SearchStats({ taskStats }) {
	const [input, setInput] = useState("");
	let searchResultArray;
	if (input !== "") {
		searchResultArray = taskStats?.filter(taskStat => {
			if (taskStat.task.toLowerCase().includes(input.toLowerCase())) return true;
			return false;
		});
	}

	function handleInputChange(e) {
		setInput(e.target.value);
	}

	return (
		<div className="align-center mt-4 flex w-fit flex-col items-center justify-center bg-slate-900 p-4 opacity-75">
			<input
				type="text"
				value={input}
				onChange={handleInputChange}
				placeholder="Search for a task"
				className="h-7 w-auto rounded-xl border border-slate-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none"
			/>
			<ul className="search-results">
				{searchResultArray?.map((result, i) => (
					<li key={i}>
						You spent {secondsToHours(result.totalLength)} hours on &quot;{result.task}&quot;
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchStats;
