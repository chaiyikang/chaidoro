import { useState } from "react";
import Button from "../LowLevelComponents/Button";
import ToDo from "../LowLevelComponents/ToDo";

export function ToDoList({ toDos, setToDos, toDoIsOpen }) {
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
			const insertIndex = toDos.findLastIndex(task => task.done === false) + 1;
			const noTasksOrAllDone = insertIndex - 1 === -1; // check if findLastIndex returned -1
			if (!noTasksOrAllDone) {
				const toDosCopy = [...toDos];
				toDosCopy.splice(insertIndex, 0, { text: input, done: false, active: false });
				setToDos(toDosCopy);
			} else {
				setToDos([{ text: input, done: false, active: false }, ...toDos]);
			}
			setInput("");
		}
	}

	function handleClear() {
		if (!confirm("Are you sure you want to clear the to-do list?")) return;
		setToDos([]);
	}

	// if (!toDoIsOpen) return;

	return (
		<div
			className={` w-70 absolute right-0 top-0 h-screen overflow-y-auto bg-slate-900 p-4 opacity-75 transition-transform duration-500 ease-in-out ${
				toDoIsOpen ? "translate-x-0" : " translate-x-full"
			}`}
		>
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
			<ul className=" mt-4 ">
				{toDos.map((task, index) => (
					<ToDo index={index} key={index} toDos={toDos} setToDos={setToDos} />
				))}
			</ul>
			<Button onClick={handleClear} additionalClassName="mx-14">
				Clear
			</Button>
		</div>
	);
}
