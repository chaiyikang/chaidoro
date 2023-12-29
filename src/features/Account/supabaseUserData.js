import { useEffect, useRef } from "react";
import supabase from "./supabase";

const defaultUserData = {
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
};

export async function supabaseCreateUserData({ id, email, currentUserData }) {
	console.log("🚀 ~ file: supabaseUserData.js:23 ~ supabaseCreateUserData ~ id:", id, email);
	const { data, error } = await supabase
		.from("userData")
		.insert([
			{
				...currentUserData,
				USER_ID: id,
				email,
			},
		])
		.select();
	if (error) throw new Error(error.message);
	console.log("🚀 ~ file: supabaseUserData.js:11 ~ supabaseCreateUserData ~ data:", data);
	return data;
}

export async function getUserData() {
	// get userid
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) return null;

	const { data: user, error: getUserError } = await supabase.auth.getUser();
	if (getUserError) throw new Error(getUserError.message);
	const userId = user.user.id;

	// fetch userdata
	const { data, error } = await supabase.from("userData").select("*").eq("USER_ID", userId);
	if (error) {
		console.error(error);
		return null;
	}
	const [userData] = data;
	// console.log("🚀 ~ file: supabaseUserData.js:11 ~ getUserData ~ userData:", userData);
	return userData;
}

export async function updateUserData(userId, columnName, payload) {
	const { data, error } = await supabase
		.from("userData")
		.update({
			[columnName]: payload,
		})
		.eq("USER_ID", userId)
		.select();
	if (error) console.error(error);
	// console.log("🚀 ~ file: supabaseUserData.js:25 ~ updateUserData ~ data:", data);
	return data;
}

export function useRetrieveOrUpdate(
	userData,
	columnName,
	applyRetreivedDataCallback,
	state,
	updateStatus = undefined,
	userDataIsLoading,
) {
	const renders = useRef(0);
	useEffect(
		function retrieveOrUpdate() {
			async function initSavedSettings() {
				if (!userData) return;
				const { [columnName]: data } = userData;
				if (!data) return;
				applyRetreivedDataCallback(data);
			}
			async function updateSupabase() {
				await updateUserData(userData.USER_ID, columnName, state);
			}

			if (!userData && userDataIsLoading === false) {
				return updateStatus?.(true);
			}
			if (!userData) return; // ensure initial data from supabase has loaded
			// console.log("🚀 ~ file: supabaseUserData.js:46 ~ retrieveOrUpdate ~ userData:", userData);
			if (renders.current < 1) {
				// we only want to init once
				renders.current++;
				initSavedSettings();
				updateStatus?.(true);
				return;
			}
			// guard to prevent updating empty data when error occurs
			if (Array.isArray(state) && state.length === 0) return;

			updateSupabase();
			return;
		},
		[userData, applyRetreivedDataCallback, state, columnName, updateStatus, userDataIsLoading],
	);
	return renders.current;
}
