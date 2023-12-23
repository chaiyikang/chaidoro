import { useState, useEffect, useMemo, useContext } from "react";
import { useForm } from "react-hook-form";
import ToggleSwitch from "../../UtilityComponents/ToggleSwitch";
import toast, { Toaster } from "react-hot-toast";
import { updateUserData } from "../Account/supabaseUserData";
import { ThemeContext } from "../Theming/ThemeContext";
import Modal from "../../UtilityComponents/Modal";

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
	max: {
		value: 20,
		message:
			"Interval length exceeded 20. If you don't want long breaks, set the long break duration to be the short break duration.",
	},
	validate: function (value) {
		return Number.isInteger(+value) || "Please input a whole number for the interval";
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
	settingsIsOpen,
	setSettingsIsOpen,
}) {
	const { themeColour } = useContext(ThemeContext);
	const defaultValues = useMemo(
		() => ({
			pomodoroLengthMin: +(settings.pomodoroLengthSec / 60).toFixed(1),
			shortBreakLengthMin: +(settings.shortBreakLengthSec / 60).toFixed(1),
			longBreakLengthMin: +(settings.longBreakLengthSec / 60).toFixed(1),
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
		setSettingsIsOpen(false);
		applyUpdatedLength(data);
		const payload = {
			pomodoroLengthSec: +data.pomodoroLengthMin * 60,
			shortBreakLengthSec: +data.shortBreakLengthMin * 60,
			longBreakLengthSec: +data.longBreakLengthMin * 60,
			interval: +data.interval,
			autoPomodoro: Boolean(data.autoPomodoro),
			autoBreaks: Boolean(data.autoBreaks),
		};
		dispatchSettings({
			payload: payload,
		});
	}

	function onError(error) {
		reactHookFormResetForm(defaultValues);
		setSettingsIsOpen(false);
		function formatSettingName(name) {
			if (name === "pomodoroLengthMin") return "Pomodoro Length";
			if (name === "shortBreakLengthMin") return "Short Break Length";
			if (name === "longBreakLengthMin") return "Long Break Length";
			if (name === "interval") return "Interval";
		}

		// Object.values(error).map(err => toast.error(err.message));
		Object.entries(error).map(([setting, errObj]) =>
			toast.error(`${formatSettingName(setting)}: ${errObj.message}`),
		);
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
			<Modal closeHandler={handleSubmit(onSubmit, onError)} isOpen={settingsIsOpen}>
				<form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
					<h1 className="flex justify-start text-4xl">Settings</h1>
					<div className="">
						<SettingRow
							register={register}
							settingName="pomodoroLengthMin"
							errorMessage={errors?.pomodoroLengthMin?.message}
							config={validationConfigLengths}
						>
							Pomodoro Length
						</SettingRow>
						<SettingRow
							register={register}
							settingName="shortBreakLengthMin"
							errorMessage={errors?.shortBreakLengthMin?.message}
							config={validationConfigLengths}
						>
							Short Break Length
						</SettingRow>
						<SettingRow
							register={register}
							settingName="longBreakLengthMin"
							errorMessage={errors?.longBreakLengthMin?.message}
							config={validationConfigLengths}
						>
							Long Break Length
						</SettingRow>
						<SettingRow
							register={register}
							settingName="interval"
							errorMessage={errors?.interval?.message}
							config={validationConfigInterval}
						>
							Long Break Interval
						</SettingRow>

						<ToggleSettingRow register={register} settingName={"autoBreaks"} id="breaks">
							Auto Start Breaks
						</ToggleSettingRow>

						<ToggleSettingRow register={register} settingName={"autoPomodoro"} id="pomodoro">
							Auto Start Pomodoro
						</ToggleSettingRow>
					</div>

					<div className="absolute bottom-0 right-0">
						<button type="submit" className="align-bottom">
							<span className="material-symbols-outlined">check</span>
						</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

function ToggleSettingRow({ children, settingName, register, id }) {
	return (
		<div className="my-2 flex justify-between">
			<span className="mr-4 text-xl">{children}</span>
			<ToggleSwitch register={register} settingName={settingName} id={id} />
		</div>
	);
}

function SettingRow({ register, settingName, children, errorMessage, config }) {
	const { theme } = useContext(ThemeContext);
	return (
		<div className="my-2 flex justify-between">
			<label className="">
				<span className="text-xl">{children}</span>
			</label>
			<input
				{...register(settingName, config)}
				type="text"
				inputMode="numeric"
				autoComplete="off"
				className={`h-7 w-14 rounded-xl border border-${theme}-400 bg-transparent px-4 text-center text-xl focus:border-2 focus:outline-none`}
			/>
			{/* <span className="text-red-700 ">{errorMessage}</span> */}
		</div>
	);
}
