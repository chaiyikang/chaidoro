import supabase from "./supabase";

export async function getUserData(userId = 2) {
	const { data, error } = await supabase.from("userData").select("*").eq("user_id", userId);
	// console.log("🚀 ~ file: supabaseUserData.js:6 ~ getUserData ~ data:", data);
	if (error) {
		console.error(error.message + "💥💥💥💥💥💥💥💥💥");
		return;
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
		.eq("user_id", userId)
		.select();
	if (error) console.error(error);
	// console.log("🚀 ~ file: supabaseUserData.js:25 ~ updateUserData ~ data:", data);
	return data;
}
