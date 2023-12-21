import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import toast from "react-hot-toast";
import { supabaseSignUpCreateUserData } from "./supabaseAccount";
import { ThemeContext } from "../Theming/ThemeContext";

function SignUp({ handleCloseSignUp, handleCloseAccountModal }) {
	const { theme } = useContext(ThemeContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const queryClient = useQueryClient();

	const {
		mutate: mutateSignUp,
		data,
		isPending,
	} = useMutation({
		mutationFn: ({ email, password }) => {
			return supabaseSignUpCreateUserData({ email, password });
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
		<div
			className={`absolute left-1/2 top-1/2 z-50 grid h-5/6 w-1/3 -translate-x-1/2 -translate-y-1/2 place-items-center bg-${theme}}-800 `}
		>
			<section className="">
				<div className="container h-full px-6 ">
					<button onClick={handleCloseSignUp} className="absolute right-1 top-1">
						<span className="material-symbols-outlined">close</span>
					</button>
					<h1 className="mb-2">Create an account to accumulate your progress</h1>
					<div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
						{/* <!-- Left column container with background--> */}
						{/* <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
    <img
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
        className="w-full"
        alt="Phone image"
    />
</div> */}

						{/* <!-- Right column container with form --> */}
						{/* <div className="md:w-8/12 lg:ml-6 lg:w-5/12"> */}
						<div className="">
							<form
								noValidate
								onSubmit={handleSignUp}
								// onSubmit={async function handleSignUp(e) {
								// 	e.preventDefault();
								// 	if (!email || !password) return;
								// 	const {
								// 		data: {
								// 			user: { id, email: userEmail },
								// 		},
								// 		error,
								// 	} = await supabaseSignUp({ email, password });
								// 	if (error) return;
								// 	console.log(id);
								// 	await supabaseCreateUserData({ id, email: userEmail });
								// 	queryClient.invalidateQueries({ queryKey: ["userData"] });
								// }}
							>
								{/* <!-- Email input --> */}
								<TEInput
									onChange={e => setEmail(e.target.value)}
									value={email}
									type="email"
									label="Email address"
									autoComplete="username"
									size="lg"
									className="mb-6"
								></TEInput>

								{/* <!--Password input--> */}
								<TEInput
									onChange={e => setPassword(e.target.value)}
									value={password}
									type="password"
									label="Password"
									className="mb-6"
									size="lg"
									autocomplete="current-password"
								></TEInput>

								<TEInput
									onChange={e => setConfirmPassword(e.target.value)}
									value={confirmPassword}
									type="password"
									label="Re-enter password"
									className="mb-6"
									size="lg"
								></TEInput>

								{/* <!-- Submit button --> */}

								<TERipple rippleColor="light" className="w-full">
									<button
										// disabled={isPending}
										type="submit"
										className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
									>
										{isPending ? (
											<div
												className={`inline-block h-[20px] w-[20px] animate-spin rounded-full border-[1px] border-current border-t-transparent text-${theme}-400`}
												role="status"
												aria-label="loading"
											>
												<span className="sr-only">Loading...</span>
											</div>
										) : (
											"Sign up"
										)}
									</button>
								</TERipple>

								{/* <!-- Divider --> */}
								<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
									<p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
								</div>

								{/* <!-- Social login buttons --> */}
								<TERipple rippleColor="light" className="w-full">
									<a
										className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
										style={{ backgroundColor: "#3b5998" }}
										href="#!"
										role="button"
									>
										{/* <!-- Facebook --> */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="mr-2 h-3.5 w-3.5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
										</svg>
										Continue with Facebook
									</a>
								</TERipple>
								<TERipple rippleColor="light" className="w-full">
									<a
										className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
										style={{ backgroundColor: "#55acee" }}
										href="#!"
										role="button"
									>
										{/* <!-- Twitter --> */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="mr-2 h-3.5 w-3.5"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
										</svg>
										Continue with Twitter
									</a>
								</TERipple>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default SignUp;
