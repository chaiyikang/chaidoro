import supabase from "./supabase";
import { supabaseCreateUserData } from "./supabaseUserData";
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
	return data;
}

export async function supabaseSignUpCreateUserData({ email, password }) {
	try {
		const {
			user: { id, email: userEmail },
		} = await supabaseSignUp({ email, password });
		await supabaseCreateUserData({ id, email: userEmail });
	} catch (err) {
		throw new Error(err);
	}
}
