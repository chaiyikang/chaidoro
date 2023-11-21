import { useEffect, useRef } from "react";
import supabase from "./supabase";

// export async function supabaseGetUser() {
// 	const { session } = await supabase.auth.getSession();
// 	if (!session.session) return null;

// 	const { data, error } = await supabase.auth.getUser();
// 	if (error) throw new Error(error.message);
// 	console.log(data);
// 	return data?.user;
// }

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

export function useRetrieveOrUpdate(userData, columnName, applyRetreivedDataCallback, state) {
	const renders = useRef(0);
	useEffect(
		function retrieveOrUpdate() {
			if (!userData) return; // ensure initial data from supabase has loaded

			async function initSavedSettings() {
				if (!userData) return;
				const { [columnName]: data } = userData;
				if (!data) return;
				applyRetreivedDataCallback(data);
			}
			async function updateSupabase() {
				await updateUserData(userData.USER_ID, columnName, state);
			}

			// console.log("🚀 ~ file: supabaseUserData.js:46 ~ retrieveOrUpdate ~ userData:", userData);
			if (renders.current < 1) {
				// we only want to init once
				renders.current++;
				initSavedSettings();
				return;
			}
			updateSupabase();
		},
		[userData, applyRetreivedDataCallback, state, columnName],
	);
}

// useEffect(
// 	function retrieveOrUpdateSecondsLeftCache() {
// 		async function initSavedSettingsSecondsLeftCache() {
// 			const userData = await getUserData();
// 			if (!userData) return;
// 			const { seconds_left: secondsLeftCache } = userData;
// 			setSecondsLeftCache(secondsLeftCache);
// 		}
// 		async function updateSecondsLeftCacheSupabase() {
// 			await updateUserData(2, "seconds_left", secondsLeftCache);
// 		}
// 		if (firstRender.current.secondsLeftCacheRenders < 2) {
// 			// ! accounting for double render during development
// 			firstRender.current.secondsLeftCacheRenders++;
// 			initSavedSettingsSecondsLeftCache();
// 			return;
// 		}
// 		updateSecondsLeftCacheSupabase();
// 	},
// 	[secondsLeftCache],
// );

// useEffect(function retrieveOrUpdateActiveType() {
// 	async function initSavedSettingsActiveType() {
// 		const userData = await getUserData();
// 		if (!userData) return;
// 		const { active_type: activeType } = userData;
// 		setActiveType(activeType);
// 	}
// 	async function updateActiveTypeSupabase() {
// 		await updateUserData(2, "active_type", activeType);
// 	}
// 	if (firstRender.current.activeTypeRenders < 2) {
// 		// ! accounting for double render during development
// 		firstRender.current.activeTypeRenders++;
// 		initSavedSettingsActiveType();
// 		return;
// 	}
// 	updateActiveTypeSupabase();
// });

// useEffect(
// 	function retrieveOrUpdateSettings() {
// 		async function initSavedSettingsSettings() {
// 			const userData = await getUserData();
// 			if (!userData) return;
// 			const { settings } = userData;
// 			// console.log(settings);
// 			dispatchSettings({
// 				payload: {
// 					...settings,
// 				},
// 			});
// 			// setActiveType("pomodoro");
// 			// setSecondsLeftCache(settings[`pomodoroLengthSec`]);
// 		}
// 		async function updateSettingsSupabase() {
// 			await updateUserData(2, "settings", settings);
// 		}

// 		if (firstRender.current.settingsRenders < 2) {
// 			// ! accounting for double render during development
// 			firstRender.current.settingsRenders++;
// 			initSavedSettingsSettings();
// 			return;
// 		}
// 		updateSettingsSupabase();
// 	},
// 	[settings],
// );

//useEffect(
// 	function retrieveOrUpdateToDos() {
// 		async function initSavedSettingsToDos() {
// 			const userData = await getUserData();
// 			if (!userData) return;
// 			const { to_do_list: toDoList } = userData;
// 			setToDos(toDoList);
// 		}
// 		async function updateToDosSupabase() {
// 			await updateUserData(2, "to_do_list", toDos);
// 		}
// 		if (firstRender.current.toDoRenders < 2) {
// 			// ! accounting for double render during development
// 			firstRender.current.toDoRenders++;
// 			initSavedSettingsToDos();
// 			return;
// 		}
// 		updateToDosSupabase();
// 	},
// 	[toDos],
// );

// useEffect(
// 	function retrieveOrUpdateStats() {
// 		async function initSavedSettingsStats() {
// 			const userData = await getUserData();
// 			if (!userData) return;
// 			const { stats } = userData;
// 			setStats(stats);
// 		}

// 		async function asyncUpdateStats() {
// 			updateUserData(2, "stats", stats);
// 		}

// 		if (firstRender.current.statsRenders < 2) {
// 			// ! accounting for double render during development
// 			firstRender.current.statsRenders++;
// 			initSavedSettingsStats();
// 			return;
// 		}
// 		// alert("not first render anymore");
// 		asyncUpdateStats();
// 	},
// 	[stats],
// );
