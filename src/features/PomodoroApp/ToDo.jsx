import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../Theming/ThemeContext";
import ControlButton from "../../UtilityComponents/ControlButton";

function ToDo({ index, toDos, setToDos }) {
	const { themeColour } = useContext(ThemeContext);
	const task = toDos[index];

	const [isEditing, setIsEditing] = useState(false);
	const [editInput, setEditInput] = useState(task.text);
	const clickCount = useRef(0);

	function handleSubmitEdit() {
		if (editInput.trim()) {
			setToDos(old => old.map((ele, i) => (index === i ? { ...ele, text: editInput } : ele)));
			setIsEditing(false);
		}
	}

	function handleDelete() {
		if (!confirm(`Are you sure you want to delete "${task.text}"?`)) return;
		setToDos(old => old.filter((ele, i) => !(index === i)));
	}

	function handleCheck(index) {
		// determine context
		const markingAsDone = task.done === false;
		const isCurrentlyActive = task.active;
		// toggle done state
		setToDos(old => old.map((task, i) => (i === index ? { ...task, done: !task.done } : task)));

		// if the task is active and is being marked as done, we auto unselect the task
		if (isCurrentlyActive && markingAsDone) {
			setToDos(old =>
				old.map((task, i) => {
					if (index !== i) return task;
					return { ...task, active: false };
				}),
			);
		}
		// if task is being marked as done we move it to bottom of list
		if (markingAsDone) {
			setToDos(old => {
				const element = old.splice(index, 1)[0]; // Remove the element at index and store it in a variable
				old.push(element); // Add the element to the end of the array
				return old;
			});
		}
	}

	function handleClickActive(index) {
		clickCount.current++;
		setTimeout(() => {
			if (clickCount.current === 1) {
				// console.log(`click count at timeout: ${clickCount.current}`);
				setToDos(old =>
					old.map((task, i) => ({ ...task, active: task.active ? false : index === i })),
				);
			}
			clickCount.current = 0; // Reset the click count
		}, 200); // Adjust the delay as needed
	}

	return (
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
				className={`material-symbols-outlined mr-2 ${task.done ? "" : "unfilled-icon"}`}
			>
				check_circle
			</label>
			{isEditing ? (
				<input
					type="text"
					value={editInput}
					onChange={e => setEditInput(e.target.value)}
					onKeyDown={e => {
						if (e.key === "Enter") {
							handleSubmitEdit();
						}
					}}
					autoFocus
					onBlur={handleSubmitEdit}
					className={`h-7 w-auto rounded-xl border ${themeColour.border} bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none`}
				/>
			) : (
				<span
					onClick={() => handleClickActive(index)}
					className={`${task.done ? "line-through" : ""} ${
						task.active
							? `rounded border ${themeColour?.border} ${themeColour?.backgroundTranslucent}  p-1`
							: ""
					}`}
					onDoubleClick={() => {
						clickCount.current = 0;
						setIsEditing(true);
					}}
				>
					{task.text}
				</span>
			)}
			<ControlButton
				handler={() => {
					if (!isEditing) setIsEditing(true);
					if (isEditing) handleSubmitEdit();
				}}
				fontSize="text-3xl"
				classes="ml-4 mt-2"
			>
				edit
			</ControlButton>
			<ControlButton handler={handleDelete} fontSize="text-3xl" classes="ml-4 mt-2">
				delete
			</ControlButton>
		</li>
	);
}

export default ToDo;
