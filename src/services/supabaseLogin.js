import supabase from "./supabase";
export async function supabaseLogIn({ email, password }) {
	console.log("🚀 ~ file: supabaseLogin.js:4 ~ supabaseLogIn ~ email:", email);
	console.log("🚀 ~ file: supabaseLogin.js:5 ~ supabaseLogIn ~ password:", password);
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	console.log("🚀 ~ file: supabaseLogin.js:11 ~ supabaseLogIn ~ data:", data);
	return data;
}

export async function supabaseLogOut() {
	let { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
