import { createContext } from "react";

export const CurrentUserDataContext = createContext({
	to_do_list: [],
	stats: [],
	active_type: "pomodoro",
	settings: {
		interval: 4,
		autoBreaks: true,
		autoPomodoro: true,
		pomodoroLengthSec: 1500,
		longBreakLengthSec: 900,
		shortBreakLengthSec: 300,
	},
	seconds_left: 1500,
	work_sets_completed: 0,
	lifetime_work_sessions: 0,
	cat_food_stats: [
		{
			date: "1970-01-01",
			foodFed: 0,
			foodEarned: 10,
		},
	],
});
