import { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { supabaseLogIn, supabaseLogOut } from "../services/supabaseAccount";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../services/supabaseUserData";
import Overlay from "./Overlay";
import Login from "./Login";
import LogOut from "./LogOut";
import SignUp from "./SignUp";

function AccountModal({
	accountIsOpen,
	setAccountIsOpen,
	lifetimeCurrentSecondsFocused,
	lifetimeWorkSessions,
}) {
	const [signUpIsOpen, setSignUpIsOpen] = useState(false);
	// const { login, isPending } = useLogin();
	const queryClient = useQueryClient();
	const { data: userData } = useQuery({
		queryKey: ["userData"],
		queryFn: getUserData,
	});

	if (!accountIsOpen) return;
	if (userData)
		return (
			<>
				<LogOut
					handleClose={() => setAccountIsOpen(false)}
					lifetimeCurrentSecondsFocused={lifetimeCurrentSecondsFocused}
					lifetimeWorkSessions={lifetimeWorkSessions}
				/>
				<Overlay handleClose={() => setAccountIsOpen(false)} />
			</>
		);
	if (signUpIsOpen)
		return (
			<>
				<SignUp
					handleCloseSignUp={() => setSignUpIsOpen(false)}
					handleCloseAccountModal={() => setAccountIsOpen(false)}
				/>
				<Overlay handleClose={() => setSignUpIsOpen(false)} />
			</>
		);

	return (
		<>
			<Login handleClose={() => setAccountIsOpen(false)} setSignUpIsOpen={setSignUpIsOpen} />
			<Overlay handleClose={() => setAccountIsOpen(false)} />
		</>
	);
}

export default AccountModal;
