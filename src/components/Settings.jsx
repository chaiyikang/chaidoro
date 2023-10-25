import { useState } from "react";
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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			pomodoroLengthMin: Math.round(settings.pomodoroLengthSec / 60),
			shortBreakLengthMin: Math.round(settings.shortBreakLengthSec / 60),
			longBreakLengthMin: Math.round(settings.longBreakLengthSec / 60),
			interval: settings.interval,
			autoPomodoro: settings.autoPomodoro,
			autoBreaks: settings.autoBreaks,
		},
	});

	function onSubmit(data) {
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

	function submitAndClose() {
		handleSubmit(onSubmit)();
		setOpen(false);
	}

	return (
		<>
			<Modal submitAndClose={submitAndClose} setOpen={setOpen} open={open}>
				<form onSubmit={submitAndClose} noValidate>
					<h3 className="">Settings</h3>
					<div className="">
						{/* //* POMODORO LENGTH  */}
						<div className="">
							<label className="">
								<span className="">Pomodoro length (minutes)</span>
							</label>
							<input
								{...register("pomodoroLengthMin", validationConfigLengths)}
								type="number"
								className=""
							/>
							<span className="text-red-700 ">{errors?.pomodoroLengthMin?.message}</span>
						</div>

						{/* //* SHORTBREAK LENGTH  */}
						<div className="">
							<label className="">
								<span className="">Short break length (minutes)</span>
							</label>
							<input
								{...register("shortBreakLengthMin", validationConfigLengths)}
								type="number"
								className=""
							/>
							<span className="text-red-700">{errors?.shortBreakLengthMin?.message}</span>
						</div>

						{/* //* LONG BREAK LENGTH  */}
						<div className="">
							<label className="">
								<span className="">Long break length (minutes)</span>
							</label>
							<input
								{...register("longBreakLengthMin", validationConfigLengths)}
								type="number"
								className=""
							/>
							<span className="text-red-700">{errors?.longBreakLengthMin?.message}</span>
						</div>

						{/* //* INTERVAL  */}
						<div className="">
							<label className="label">
								<span className="">Long break interval (pomodoros)</span>
							</label>
							<input
								{...register("interval", validationConfigInterval)}
								type="number"
								className=""
							/>
							<span className="text-red-700">{errors?.interval?.message}</span>
						</div>

						{/* //* AUTO BREAKS  */}
						<div className="">
							<label className="">
								<span className="">Auto start breaks</span>
								<input {...register("autoBreaks")} type="checkbox" className="" />
								<span className=""></span>
							</label>
						</div>

						{/* //* AUTO POMODORO  */}
						<div className="">
							<label className="">
								<span className="">Auto start pomodoro</span>
								<input {...register("autoPomodoro")} type="checkbox" className="" />
								<span className=""></span>
							</label>
						</div>
					</div>
					<div className="">
						<button type="submit" className="">
							ok
						</button>
					</div>
				</form>
			</Modal>
		</>
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
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 z-10">
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
