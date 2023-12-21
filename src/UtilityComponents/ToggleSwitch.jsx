import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

function ToggleSwitch({ register, settingName, id }) {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<input
				{...register(settingName)}
				type="checkbox"
				id={id}
				className={`relative mt-1 h-4 w-[3.25rem] cursor-pointer appearance-none rounded-full border border-transparent bg-${theme}-600 ring-1 ring-transparent transition-colors duration-200 ease-in-out  before:inline-block before:h-6 before:w-6 
                before:translate-x-0 before:translate-y-[-0.3rem] before:transform   before:rounded-full before:bg-slate-400 before:shadow before:ring-0 before:transition before:duration-200 before:ease-in-out checked:bg-blue-700 checked:before:translate-x-[110%] checked:before:bg-slate-200`}
			/>
			<label htmlFor={id} className="sr-only">
				switch
			</label>
		</>
	);
}

export default ToggleSwitch;
