import supabase from "./supabase";

export async function getUserData() {
	const { data: userData, error } = await supabase.from("userData").select("*");
	if (error) console.error(error);
	return userData;
}
