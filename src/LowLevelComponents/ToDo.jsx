import { useRef, useState } from "react";
import ControlButton from "./ControlButton";

function ToDo({ task, index, toDos, setToDos }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editInput, setEditInput] = useState(task.text);
	const clickCount = useRef(0);

	function handleSubmitEdit() {
		if (editInput.trim()) {
			setToDos(toDos.map((ele, i) => (index === i ? { ...ele, text: editInput } : ele)));
			setIsEditing(false);
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
		clickCount.current++;
		setTimeout(() => {
			if (clickCount.current === 1) {
				console.log(`click count at timeout: ${clickCount.current}`);
				setToDos(toDos.map((task, i) => ({ ...task, active: task.active ? false : index === i })));
			}
			clickCount.current = 0; // Reset the click count
		}, 250); // Adjust the delay as needed
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
					className="h-7 w-auto rounded-xl border border-slate-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none"
				/>
			) : (
				<span
					onClick={() => handleClickActive(index)}
					className={`${task.done ? "line-through" : ""} ${
						task.active ? "rounded border border-slate-600 bg-slate-700 p-1" : ""
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
		</li>
	);
}

export default ToDo;
