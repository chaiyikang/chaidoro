import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { supabaseLogIn } from "./supabaseAccount";
import toast from "react-hot-toast";
import { ThemeContext } from "../Theming/ThemeContext";

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
	return (
		<div
			className={`loginModal absolute left-1/2 top-1/2 z-50 grid h-5/6 w-1/3 -translate-x-1/2 -translate-y-1/2 place-items-center ${themeColour.backgroundOpaque}`}
		>
			<div className="h-full px-6 ">
				<button onClick={handleClose} className="absolute right-1 top-1">
					<span className="material-symbols-outlined">close</span>
				</button>

				{/* <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
						<div className="">
							<form
								onSubmit={async function handleLogin(e) {
									e.preventDefault();
									if (!email || !password) return;
									// await supabaseLogIn({ email, password });
									mutateLogIn({ email, password });
								}}
							>
								<input
									onChange={e => setEmail(e.target.value)}
									value={email}
									type="email"
									label="Email address"
									autoComplete="username"
									size="lg"
									className="mb-6"
								></input>

								<input
									onChange={e => setPassword(e.target.value)}
									value={password}
									type="password"
									label="Password"
									autoComplete="current-password"
									className="mb-6"
									size="lg"
								></input>


								<button
									type="submit"
									className=""
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
										"Sign in"
									)}
								</button>

								<p className="mb-0 mt-2 pt-1 text-sm font-semibold">
									Don&apos;t have an account?
									<a
										onClick={() => setSignUpIsOpen(true)}
										className="ml-1 text-danger transition duration-150 ease-in-out hover:cursor-pointer hover:text-danger-600 focus:text-danger-600 active:text-danger-700 "
									>
										Register
									</a>
								</p>

								<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
									<p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200"></p>
								</div>
							</form>
						</div>
					</div> */}
			</div>
		</div>
	);
}

export default Login;
