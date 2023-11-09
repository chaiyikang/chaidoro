import { Stats } from "./Major Components/Stats";
import { ToDoList } from "./Major Components/ToDoList";
import { useReducer, useState } from "react";
import { Pomodoro } from "./Major Components/Pomodoro";
import { Settings } from "./Major Components/Settings";
import useTimeState from "./hooks/useTimeState";
import { Background } from "./Major Components/Background";
import { Toaster } from "react-hot-toast";
import { settingsReducer, initialSettings } from "./App";

export function App() {
	const [timeStampEnd, setTimeStampEnd] = useState(undefined);
	const [settings, dispatchSettings] = useReducer(settingsReducer, initialSettings);
	const [activeType, setActiveType] = useState("pomodoro");
	const currentTimeStamp = useTimeState(); // returns the live time stamp which updates every 1s
	const [secondsLeftCache, setSecondsLeftCache] = useState(settings.pomodoroLengthSec);
	const [toDos, setToDos] = useState([]);
	const [stats, setStats] = useState([]);
	const [spinnerOpen, setSpinnerOpen] = useState(false);

	// * DERIVED STATE //
	const timerRunning = Boolean(timeStampEnd);
	const totalTimeFocused = stats.reduce((acc, curr) => {
		return acc + (curr.task === "break" ? 0 : curr.lengthSec);
	}, 0);

	return (
		<div className="select-none font-roboto font-light text-slate-400">
			<div className="spinnerContainer absolute bottom-2 right-[25rem] z-10">
				<div className="relative grid h-[10rem]  w-[10rem] place-items-center ">
					<span
						className="material-symbols-outlined text-7xl"
						onClick={() => setSpinnerOpen(old => !old)}
					>
						grid_view
					</span>
					<span
						className={`material-symbols-outlined text-7xl ${
							spinnerOpen
								? "z-1 visible absolute top-2/4 -translate-y-2/4 translate-x-[120%] -rotate-90 opacity-100 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
								: "z-1 left-2/6 invisible absolute top-2/4 -translate-y-2/4 opacity-0 transition-all delay-[0s] duration-[0.5s] ease-[ease]"
						}`}
					>
						settings
					</span>
				</div>
			</div>
			<Toaster toastOptions={{ style: { background: "#1e293b", color: "#94a3b8" } }} />
			<Background />
			<Stats totalTimeFocused={totalTimeFocused} stats={stats} />
			{/* <Music /> */}
			<ToDoList toDos={toDos} setToDos={setToDos} />
			<Pomodoro
				settings={settings}
				timeStampEnd={timeStampEnd}
				setTimeStampEnd={setTimeStampEnd}
				timerRunning={timerRunning}
				activeType={activeType}
				setActiveType={setActiveType}
				currentTimeStamp={currentTimeStamp}
				secondsLeftCache={secondsLeftCache}
				setSecondsLeftCache={setSecondsLeftCache}
				toDos={toDos}
				stats={stats}
				setStats={setStats}
			/>
			<Settings
				settings={settings}
				dispatchSettings={dispatchSettings}
				timerRunning={timerRunning}
				setTimeStampEnd={setTimeStampEnd}
				activeType={activeType}
				currentTimeStamp={currentTimeStamp}
				secondsLeftCache={secondsLeftCache}
				setSecondsLeftCache={setSecondsLeftCache}
			/>
		</div>
	);
}
