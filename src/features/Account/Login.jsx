import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { supabaseLogIn } from "./supabaseAccount";
import toast from "react-hot-toast";
import { ThemeContext } from "../Theming/ThemeContext";
import Modal from "../../UtilityComponents/Modal";
import Button from "../../UtilityComponents/Button";

function Login({ handleClose, setSignUpIsOpen }) {
	const { themeColour } = useContext(ThemeContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const queryClient = useQueryClient();
	const {
		mutate: mutateLogIn,
		data,
		isPending,
	} = useMutation({
		mutationFn: ({ email, password }) => {
			return supabaseLogIn({ email, password });
		},
		onSuccess: () => {
			toast.success("Successfully logged in!");
			handleClose();
			queryClient.invalidateQueries({ queryKey: ["userData"] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	if (true)
		return (
			<Modal isOpen={true} closeHandler={handleClose}>
				<form
					onSubmit={async function handleLogin(e) {
						e.preventDefault();
						if (!email || !password) return;
						// await supabaseLogIn({ email, password });
						mutateLogIn({ email, password });
					}}
				>
					<div className="flex h-5/6 w-[20rem] flex-col items-center">
						<h1 className="mt-4 text-3xl">Login to save your progress</h1>
						<h3 className="mt-[1rem] text-xl">Email</h3>
						<input
							onChange={e => setEmail(e.target.value)}
							value={email}
							type="email"
							label="Email address"
							autoComplete="username"
							size="lg"
							className={`text-neutal-700 mt-2 h-7 w-auto rounded-xl border ${themeColour?.border} ${themeColour?.modalInputBg} ${themeColour?.modalInputText} px-4 text-center text-xl focus:border-2 focus:outline-none`}
						></input>
						<h3 className=" mt-[1rem] text-xl">Password</h3>
						<input
							onChange={e => setPassword(e.target.value)}
							value={password}
							type="password"
							label="Password"
							autoComplete="current-password"
							className={`text-neutal-700 mt-2 h-7 w-auto rounded-xl border ${themeColour?.border} ${themeColour?.modalInputBg} ${themeColour?.modalInputText} px-4 text-center text-xl focus:border-2 focus:outline-none`}
							size="lg"
						></input>
						<div className="flex justify-start">
							<button
								type="submit"
								className={`mt-[1rem] flex items-center rounded  ${themeColour?.modalButton} p-2  text-xl font-bold`}
							>
								{isPending ? (
									<div
										className={`inline-block h-[20px] w-[20px] animate-spin rounded-full border-[1px] border-current border-t-transparent ${themeColour.text}`}
										role="status"
										aria-label="loading"
									>
										<span className="sr-only">Loading...</span>
									</div>
								) : (
									"Log in"
								)}
							</button>
						</div>
						<p className="mb-0 mt-2 pt-1 text-sm font-semibold">
							Don&apos;t have an account?
							<a
								onClick={() => setSignUpIsOpen(true)}
								className={`ml-1 hover:cursor-pointer ${themeColour?.textAccent} ${themeColour?.textAccentHover} ${themeColour?.textAccentActive}`}
							>
								Register
							</a>
						</p>
					</div>
				</form>
			</Modal>
		);
}

export default Login;
