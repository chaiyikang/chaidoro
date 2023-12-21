import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserData } from "./supabaseUserData";
import LogOut from "./LogOut";
import Overlay from "../../MiscComponents/Overlay";
import SignUp from "./SignUp";
import Login from "./Login";

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
