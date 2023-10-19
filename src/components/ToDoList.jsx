import { useState } from "react";

export function ToDoList({ toDos, setToDos }) {
	const [input, setInput] = useState("");
	function handleNewTaskInputChange(e) {
		setInput(e.target.value);
	}

	function handleEnter(e) {
		if (e.key === "Enter") {
			handleAddTask();
		}
	}

	function handleAddTask() {
		if (input.trim()) {
			setToDos([...toDos, { text: input, done: false, active: false }]);
			setInput("");
		}
	}

	function handleCheck(index) {
		setToDos(toDos.map((task, i) => (i === index ? { ...task, done: !task.done } : task)));
	}

	function handleClickActive(index) {
		setToDos(toDos.map((task, i) => ({ ...task, active: index === i })));
	}

	function handleClear() {
		setToDos([]);
	}

	return (
		<div className="menu p-4 w-70 min-h-full bg-gray-500 text-base-content absolute top-0 right-0">
			<div className="container mx-auto p-4">
				<h1 className="text-4xl font-bold text-center">To Do List</h1>
				<div className="flex justify-center items-center mt-4">
					<input
						type="text"
						value={input}
						onChange={handleNewTaskInputChange}
						onKeyDown={handleEnter}
						placeholder="Enter a new task"
						className="input input-bordered w-32"
					/>
					<button onClick={handleAddTask} className="btn btn-primary ml-2">
						Add
					</button>
				</div>
				<ul className="list-disc list-inside mt-4">
					{toDos.map((task, index) => (
						<li key={index} className="flex flex-row items-center justify-center">
							<input
								type="checkbox"
								checked={task.done}
								onChange={() => handleCheck(index)}
								className="checkbox checkbox-primary mr-2"
							/>
							<span
								onClick={() => handleClickActive(index)}
								className={`${task.done ? "line-through" : ""} ${
									task.active ? "bg-yellow-200 border border-yellow-500 rounded p-1" : ""
								}`}
							>
								{task.text}
							</span>
						</li>
					))}
				</ul>
				<button onClick={handleClear} className="btn btn-primary w-20 mx-14">
					Clear
				</button>
			</div>
		</div>
	);
}
