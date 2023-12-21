import { useContext, useState } from "react";
import { secondsToHours } from "../../main/helpers";
import { ThemeContext } from "../Theming/ThemeContext";

function SearchStats({ taskStats }) {
	const { theme } = useContext(ThemeContext);
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
		<div
			className={`align-center mt-4 flex w-fit flex-col items-center justify-center bg-${theme}-900 p-4 opacity-75`}
		>
			<input
				type="text"
				value={input}
				onChange={handleInputChange}
				placeholder="Search for a task"
				className={`h-7 w-auto rounded-xl border border-${theme}-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none`}
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
