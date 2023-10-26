import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const validationConfigLengths = {
	required: "Please input desired duration",
	min: { value: 0.1, message: "Duration must be at least 0.1 minutes" },
	validate: function (value) {
		return Math.sign(+value) === 1 || "Please input a number";
	},
};

const validationConfigInterval = {
	required: "Please input desired interval length",
	min: { value: 1, message: "Interval length must at least be 1." },
	validate: function (value) {
		return Number.isInteger(+value) || "Please input a whole number";
	},
};

export function Settings({
	settings,
	dispatchSettings,
	timerRunning,
	setTimeStampEnd,
	activeType,
	currentTimeStamp,
	secondsLeftCache,
	setSecondsLeftCache,
}) {
	const [open, setOpen] = useState(false);
	const defaultValues = useMemo(
		() => ({
			pomodoroLengthMin: Math.round(settings.pomodoroLengthSec / 60),
			shortBreakLengthMin: Math.round(settings.shortBreakLengthSec / 60),
			longBreakLengthMin: Math.round(settings.longBreakLengthSec / 60),
			interval: settings.interval,
			autoPomodoro: settings.autoPomodoro,
			autoBreaks: settings.autoBreaks,
		}),
		[settings],
	);

	const {
		register,
		handleSubmit,
		reset: reactHookFormResetForm,
		formState: { errors },
	} = useForm({
		defaultValues,
	});

	useEffect(
		function updateForm() {
			reactHookFormResetForm(defaultValues);
		},
		[reactHookFormResetForm, defaultValues],
	);

	function onSubmit(data) {
		setOpen(false);
		applyUpdatedLength(data);
		dispatchSettings({
			payload: {
				pomodoroLengthSec: +data.pomodoroLengthMin * 60,
				shortBreakLengthSec: +data.shortBreakLengthMin * 60,
				longBreakLengthSec: +data.longBreakLengthMin * 60,
				interval: +data.interval,
				autoPomodoro: Boolean(data.autoPomodoro),
				autoBreaks: true,
			},
		});
	}

	function onError(error) {
		reactHookFormResetForm(defaultValues);
		setOpen(false);
		console.error(error);
	}

	function applyUpdatedLength(updatedSettings) {
		const timerWasRunning = timerRunning;
		if (timerWasRunning) setTimeStampEnd(undefined); // pause timer
		// if no change in activeType length, no time diffing required
		if (+updatedSettings[`${activeType}LengthMin`] * 60 === settings[`${activeType}LengthSec`]) {
			return timerRunning ? setTimeStampEnd(currentTimeStamp + secondsLeftCache * 1000) : true;
		}
		const elapsedSeconds = settings[`${activeType}LengthSec`] - secondsLeftCache;
		const updatedSeconds = +updatedSettings[`${activeType}LengthMin`] * 60 - elapsedSeconds;
		// guard clause in case duration was reduced such that current time left would be negative
		if (updatedSeconds < 1) {
			setSecondsLeftCache(1);
			return timerRunning ? setTimeStampEnd(currentTimeStamp + 1 * 1000) : true;
		}
		setSecondsLeftCache(updatedSeconds);
		return timerRunning ? setTimeStampEnd(currentTimeStamp + updatedSeconds * 1000) : true;
	}

	return (
		<>
			<Modal submitAndClose={handleSubmit(onSubmit, onError)} setOpen={setOpen} open={open}>
				<form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
					<h1 className="text-4xl flex justify-center">Settings</h1>
					<div className="">
						<SettingRow
							register={register}
							settingName="pomodoroLengthMin"
							errorMessage={errors?.pomodoroLengthMin?.message}
							config={validationConfigLengths}
						>
							Pomodoro Length (minutes)
						</SettingRow>
						<SettingRow
							register={register}
							settingName="shortBreakLengthMin"
							errorMessage={errors?.shortBreakLengthMin?.message}
							config={validationConfigLengths}
						>
							Short Break Length (minutes)
						</SettingRow>
						<SettingRow
							register={register}
							settingName="longBreakLengthMin"
							errorMessage={errors?.longBreakLengthMin?.message}
							config={validationConfigLengths}
						>
							Long Break Length (minutes)
						</SettingRow>
						<SettingRow
							register={register}
							settingName="interval"
							errorMessage={errors?.interval?.message}
							config={validationConfigInterval}
						>
							Long Break Interval (Pomodoros)
						</SettingRow>

						{/* //* AUTO BREAKS  */}
						<div className="flex justify-evenly my-2">
							<label className="">
								<span className="text-xl mr-4">Auto start breaks</span>
								<input {...register("autoBreaks")} type="checkbox" className="ml-8" />
								<span className=""></span>
							</label>
						</div>

						{/* //* AUTO POMODORO  */}
						<div className="flex justify-evenly my-2">
							<label className="">
								<span className="text-xl">Auto start pomodoro</span>
								<input {...register("autoPomodoro")} type="checkbox" className="ml-8" />
								<span className=""></span>
							</label>
						</div>
					</div>

					<div className="flex justify-end">
						<button type="submit" className="mr-2">
							<span className="material-symbols-outlined">check</span>
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}
function SettingRow({ register, settingName, children, errorMessage, config }) {
	return (
		<div className="flex justify-evenly my-2">
			<label className="">
				<span className="text-xl">{children}</span>
			</label>
			<input
				{...register(settingName, config)}
				type="text"
				inputMode="numeric"
				autoComplete="off"
				className="bg-transparent border border-slate-400 rounded-xl text-xl px-4 w-1/6"
			/>
			{/* <span className="text-red-700 ">{errorMessage}</span> */}
		</div>
	);
}

function Modal({ children, submitAndClose, setOpen, open }) {
	return (
		<>
			<button className="absolute bottom-0 right-0" onClick={() => setOpen(curr => !curr)}>
				<span className="material-symbols-outlined text-7xl">settings</span>
			</button>
			{open && (
				<>
					<div className="fixed top-1/2 left-1/2 w-auto h-auto p-7.5 -translate-x-1/2 -translate-y-1/2 bg-slate-900 z-10 text-base">
						<button onClick={submitAndClose} className="absolute right-1 top-1">
							<span className="material-symbols-outlined">close</span>
						</button>
						{children}
					</div>
					<div
						onClick={submitAndClose}
						className="fixed h-screen w-screen top-0 left-0 bg-black/70 z-0"
					></div>
				</>
			)}
		</>
	);

	// return (
	// 	<>
	// 		{/* You can open the modal using document.getElementById('ID').showModal() method */}
	// 		<button className="btn absolute bottom-0 right-0" onClick={() => modal.current.showModal()}>
	// 			Settings
	// 		</button>
	// 		<dialog ref={modal} className="modal">
	// 			<div className="modal-box">
	// 				<form method="dialog">
	// 					{/* if there is a button in form, it will close the modal */}
	// 					<button
	// 						onClick={() => {
	// 							handleSubmit(onSubmit)();
	// 						}}
	// 						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
	// 					>
	// 						✕
	// 					</button>
	// 				</form>
	// 				{children}
	// 			</div>
	// 			<form method="dialog" className="modal-backdrop">
	// 				<button
	// 					onClick={() => {
	// 						handleSubmit(onSubmit)();
	// 					}}
	// 					className="cursor-default"
	// 				></button>
	// 			</form>
	// 		</dialog>
	// 	</>
	// );
}
