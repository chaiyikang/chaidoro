import { useState } from "react";
import { secondsToHours } from "../helpers";

function SearchStats({ stats }) {
	const [input, setInput] = useState("slack");
	const searchResultArray = [];
	if (input !== "") {
		stats.forEach(ele => {
			if (!ele.task.toLowerCase().includes(input.toLowerCase())) return; // search does not match stats
			if (!searchResultArray.some(result => result.task.toLowerCase() === ele.task.toLowerCase())) {
				// task is not alr in array, so we add it
				return searchResultArray.push({ task: ele.task, totalLength: ele.lengthSec });
			}
			// task is in array, so we increment the value
			searchResultArray.find(
				result => result.task.toLowerCase() === ele.task.toLowerCase(),
			).totalLength += ele.lengthSec;
			return;
		});
	}

	function handleInputChange(e) {
		setInput(e.target.value);
	}

	return (
		<div className="mt-4">
			<input
				type="text"
				value={input}
				onChange={handleInputChange}
				placeholder="Search for a task"
				className="h-7 w-auto rounded-xl border border-slate-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none"
			/>
			<ul className="search-results">
				{searchResultArray.map((result, i) => (
					<li key={i}>
						You spent {secondsToHours(result.totalLength)} hours on &quot;{result.task}&quot;
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchStats;
