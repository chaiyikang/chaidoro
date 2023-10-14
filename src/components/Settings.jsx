import { useRef } from "react";
import { useForm } from "react-hook-form";

const validationConfigLengths = {
	required: "Please input desired duration",
	min: { value: 0.1, message: "Duration must be at least 0.1 minutes" },
	validate: function (value) {
		console.log(`handleSubmit: ${typeof value}`);
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

export function Settings({ settings, dispatchSettings }) {
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

	return (
		<>
			<Modal handleSubmit={handleSubmit} onSubmit={onSubmit}>
				<form
					onSubmit={() => {
						handleSubmit(onSubmit)();
					}}
					method="dialog"
					noValidate
					data-theme="black"
				>
					<h3 className="font-bold text-lg">Settings</h3>
					<div className="py-4">
						{/* //* POMODORO LENGTH  */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Pomodoro length (minutes)</span>
							</label>
							<input
								{...register("pomodoroLengthMin", validationConfigLengths)}
								type="number"
								className="input input-bordered"
							/>
							<span className="text-red-700 text-xs">{errors?.pomodoroLengthMin?.message}</span>
						</div>

						{/* //* SHORTBREAK LENGTH  */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Short break length (minutes)</span>
							</label>
							<input
								{...register("shortBreakLengthMin", validationConfigLengths)}
								type="number"
								className="input input-bordered"
							/>
							<span className="text-red-700 text-xs">{errors?.shortBreakLengthMin?.message}</span>
						</div>

						{/* //* LONG BREAK LENGTH  */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Long break length (minutes)</span>
							</label>
							<input
								{...register("longBreakLengthMin", validationConfigLengths)}
								type="number"
								className="input input-bordered"
							/>
							<span className="text-red-700 text-xs">{errors?.longBreakLengthMin?.message}</span>
						</div>

						{/* //* INTERVAL  */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Long break interval (pomodoros)</span>
							</label>
							<input
								{...register("interval", validationConfigInterval)}
								type="number"
								className="input input-bordered"
							/>
							<span className="text-red-700 text-xs">{errors?.interval?.message}</span>
						</div>

						{/* //* AUTO BREAKS  */}
						<div className="form-control mt-4">
							<label className="cursor-pointer label">
								<span className="label-text">Auto start breaks</span>
								<input
									{...register("autoBreaks", { required: true })}
									type="checkbox"
									className="toggle"
								/>
								<span className="toggle-mark"></span>
							</label>
						</div>

						{/* //* AUTO POMODORO  */}
						<div className="form-control mt-4">
							<label className="cursor-pointer label">
								<span className="label-text">Auto start pomodoro</span>
								<input
									{...register("autoPomodoro", { required: true })}
									type="checkbox"
									className="toggle"
								/>
								<span className="toggle-mark"></span>
							</label>
						</div>
					</div>
					<div className="flex justify-end">
						<button type="submit" className="btn">
							ok
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

function Modal({ children, handleSubmit, onSubmit }) {
	const modal = useRef(null);

	return (
		<>
			{/* You can open the modal using document.getElementById('ID').showModal() method */}
			<button className="btn absolute bottom-0 right-0" onClick={() => modal.current.showModal()}>
				Settings
			</button>
			<dialog ref={modal} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button
							onClick={() => {
								handleSubmit(onSubmit)();
							}}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>
					</form>
					{children}
				</div>
				<form method="dialog" className="modal-backdrop">
					<button
						onClick={() => {
							handleSubmit(onSubmit)();
						}}
						className="cursor-default"
					>
						close
					</button>
				</form>
			</dialog>
		</>
	);
}
