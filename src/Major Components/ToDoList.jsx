import { useState } from "react";
import Button from "../Low Level Components/Button";

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
		setToDos(old => old.map((task, i) => (i === index ? { ...task, done: !task.done } : task)));
		// if the task is active and is being marked as done, we auto unselect the task
		setToDos(old =>
			old.map((task, i) => {
				if (index !== i) return task;
				return { ...task, active: task.active && task.done ? false : task.active };
			}),
		);
	}

	function handleClickActive(index) {
		setToDos(toDos.map((task, i) => ({ ...task, active: task.active ? false : index === i })));
	}

	function handleClear() {
		setToDos([]);
	}

	return (
		<div className=" w-70 absolute right-0 top-0 min-h-full bg-slate-900 p-4 opacity-75">
			<div className="mx-auto p-4">
				<h1 className="text-center text-4xl font-bold">To Do List</h1>
				<div className="mt-4 flex items-center justify-center">
					<input
						type="text"
						value={input}
						onChange={handleNewTaskInputChange}
						onKeyDown={handleEnter}
						placeholder="Enter a new task"
						className="h-7 w-auto rounded-xl border border-slate-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none"
					/>
					<Button onClick={handleAddTask} additionalClassName="ml-4">
						Add
					</Button>
				</div>
				<ul className="mt-4">
					{toDos.map((task, index) => (
						<li key={index} className="relative flex flex-row items-center justify-center text-2xl">
							<input
								type="checkbox"
								checked={task.done}
								onChange={() => {
									handleCheck(index);
								}}
								className={`appearance-none`}
								id={index}
							/>
							<label
								htmlFor={index}
								className={`material-symbols-outlined mr-2 ${task.done ? "filled-icon" : ""}`}
							>
								check_circle
							</label>
							<span
								onClick={() => handleClickActive(index)}
								className={`${task.done ? "line-through" : ""} ${
									task.active ? "rounded border border-slate-600 bg-slate-700 p-1" : ""
								}`}
							>
								{task.text}
							</span>
						</li>
					))}
				</ul>
				<Button onClick={handleClear} additionalClassName="mx-14">
					Clear
				</Button>
			</div>
		</div>
	);
}
