import supabase from "./supabase";
export async function supabaseLogIn({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		throw new Error(error.message);
	}
	// console.log("🚀 ~ file: supabaseLogin.js:11 ~ supabaseLogIn ~ data:", data);
	return data;
}

export async function supabaseLogOut() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function supabaseSignUp({ email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	// console.log("🚀 ~ file: supabaseAccount.js:24 ~ supabaseSignUp ~ data:", data);
	return { data, error };
}
