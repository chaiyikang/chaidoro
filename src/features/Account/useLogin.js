import { useMutation } from "@tanstack/react-query";
import { supabaseLogIn } from "./supabaseLogin";
import toast from "react-hot-toast";
export function useLogin() {
	const { mutate: login, isPending } = useMutation({
		mutationFn: ({ email, password }) => {
			console.log("🚀 ~ file: useLogin.js:8 ~ useLogin ~ password:", password);
			supabaseLogIn({ email, password });
		},
		onSuccess: user => {
			console.log("🚀 ~ file: useLogin.js:9 ~ useLogin ~ user:", user);
		},
		onError: err => {
			console.error(err);
			toast.error("Email or password is incorrect");
		},
	});
	return { login, isPending };
}
