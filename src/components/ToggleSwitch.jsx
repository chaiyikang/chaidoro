function ToggleSwitch({ register, settingName }) {
	return (
		<>
			<input
				{...register(settingName)}
				type="checkbox"
				id="hs-basic-usage"
				className=" mt-1 relative w-[3.25rem] h-4 rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent bg-slate-600 checked:bg-blue-700  before:bg-slate-400 checked:before:bg-slate-200 appearance-none 
                before:inline-block before:w-6 before:h-6   before:translate-x-0 before:translate-y-[-0.3rem] checked:before:translate-x-[110%] before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200
				"
			/>
			<label htmlFor="hs-basic-usage" className="sr-only">
				switch
			</label>
		</>
	);
}

export default ToggleSwitch;
