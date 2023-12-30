import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { supabaseSignUpCreateUserData } from "./supabaseAccount";
import { ThemeContext } from "../Theming/ThemeContext";
import Modal from "../../UtilityComponents/Modal";
import { CurrentUserDataContext } from "./currentUserDataContext";
import { InputFocusContext } from "../Fullscreen/InputFocusContext";

function SignUp({ handleCloseSignUp, handleCloseAccountModal }) {
	const { themeColour } = useContext(ThemeContext);
	const setSomeInputIsFocused = useContext(InputFocusContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const queryClient = useQueryClient();

	const currentUserData = useContext(CurrentUserDataContext);

	const { mutate: mutateSignUp, isPending } = useMutation({
		mutationFn: ({ email, password }) => {
			return supabaseSignUpCreateUserData({ email, password, currentUserData });
		},
		onSuccess: () => {
			toast.success("Account successfully created!");
			queryClient.invalidateQueries({ queryKey: ["userData"] });
			handleCloseSignUp();
			handleCloseAccountModal();
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	async function handleSignUp(e) {
		e.preventDefault();
		if (!email || !password) return;
		if (!(password === confirmPassword)) return toast.error("Passwords do not match.");
		mutateSignUp({ email, password });
	}

	return (
		<Modal isOpen={true} closeHandler={handleCloseSignUp}>
			<form noValidate onSubmit={handleSignUp}>
				<div className="flex h-5/6 w-[20rem] flex-col items-center">
					<h1 className="mt-4 text-3xl">Create an account to save your progress</h1>
					<h3 className="mt-[1rem] text-xl">Email</h3>
					<input
						onChange={e => setEmail(e.target.value)}
						onFocus={() => setSomeInputIsFocused(true)}
						onBlur={() => setSomeInputIsFocused(false)}
						value={email}
						type="email"
						label="Email address"
						autoComplete="username"
						size="lg"
						className={`text-neutal-700 mt-2 h-7 w-auto rounded-xl border ${themeColour?.border} ${themeColour?.modalInputBg} ${themeColour?.modalInputText} px-4 text-center text-xl focus:border-2 focus:outline-none`}
					></input>
					<h3 className=" mt-[1rem] text-xl">Password</h3>{" "}
					<input
						onChange={e => setPassword(e.target.value)}
						onFocus={() => setSomeInputIsFocused(true)}
						onBlur={() => setSomeInputIsFocused(false)}
						value={password}
						type="password"
						label="Password"
						className={`text-neutal-700 mt-2 h-7 w-auto rounded-xl border ${themeColour?.border} ${themeColour?.modalInputBg} ${themeColour?.modalInputText} px-4 text-center text-xl focus:border-2 focus:outline-none`}
						size="lg"
						autoComplete="current-password"
					></input>
					<h3 className=" mt-[1rem] text-xl">Confirm Password</h3>{" "}
					<input
						onChange={e => setConfirmPassword(e.target.value)}
						onFocus={() => setSomeInputIsFocused(true)}
						onBlur={() => setSomeInputIsFocused(false)}
						value={confirmPassword}
						type="password"
						label="Re-enter password"
						className={`text-neutal-700 mt-2 h-7 w-auto rounded-xl border ${themeColour?.border} ${themeColour?.modalInputBg} ${themeColour?.modalInputText} px-4 text-center text-xl focus:border-2 focus:outline-none`}
						size="lg"
					></input>
					<button
						disabled={isPending}
						type="submit"
						className={`mt-[1rem] flex items-center rounded  ${themeColour?.modalButton} p-2  text-xl font-bold`}
					>
						{isPending ? (
							<div
								className={`inline-block h-[20px] w-[20px] animate-spin rounded-full border-[1px] border-current border-t-transparent `}
								role="status"
								aria-label="loading"
							>
								<span className="sr-only">Loading...</span>
							</div>
						) : (
							"Sign up"
						)}
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default SignUp;
