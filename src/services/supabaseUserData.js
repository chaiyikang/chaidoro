import supabase from "./supabase";

export async function getUserData() {
	const { data, error } = await supabase.from("userData").select("*");
	if (error) {
		console.error(error.message + "💥💥💥💥💥💥💥💥💥");
		return;
	}
	const [userData] = data;
	return userData;
}
