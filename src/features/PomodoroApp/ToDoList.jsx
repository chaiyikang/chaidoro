import { useContext, useState } from "react";
import Button from "../../UtilityComponents/Button";
import ToDo from "./ToDo";
import { ThemeContext } from "../Theming/ThemeContext";
import ControlButton from "../../UtilityComponents/ControlButton";
import { InputFocusContext } from "../Fullscreen/InputFocusContext";

export function ToDoList({ toDos, setToDos, toDoIsOpen, setToDoIsOpen, setCacheToDoIsOpen }) {
	const { themeColour } = useContext(ThemeContext);
	const setSomeInputIsFocused = useContext(InputFocusContext);

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
			className={` absolute right-0 top-0 z-20 h-screen w-1/3 min-w-[15rem] max-w-[20rem] overflow-x-visible ${
				themeColour?.background
			} ${themeColour?.overlapBackgroundOpaque} p-4 transition-transform duration-500 ease-in-out ${
				toDoIsOpen ? "translate-x-0" : " translate-x-full"
			}`}
		>
			<ControlButton
				classes={`absolute transition-transform duration-500 ease-in-out z-10 ${
					toDoIsOpen ? `left-1` : `left-[-10%]`
				} top-1/2`}
				handler={() => {
					setToDoIsOpen(old => !old);
					setCacheToDoIsOpen(old => !old);
				}}
			>
				{toDoIsOpen ? `arrow_forward_ios` : `arrow_back_ios`}
			</ControlButton>
			<div className="h-full w-full overflow-y-auto">
				<h1 className="text-center text-4xl">To Do List</h1>
				<div className="mt-4 flex items-center justify-center">
					<input
						type="text"
						value={input}
						onFocus={() => setSomeInputIsFocused(true)}
						onBlur={() => setSomeInputIsFocused(false)}
						onChange={handleNewTaskInputChange}
						onKeyDown={handleEnter}
						placeholder="Enter a new task"
						className={`h-7 w-5/6 rounded-xl border ${themeColour?.border} ${themeColour?.backgroundTranslucent} ${themeColour?.overlapBackgroundContrast} ${themeColour?.textPlaceholder} px-4 text-center text-xl focus:border-2 focus:outline-none`}
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
		</div>
	);
}
