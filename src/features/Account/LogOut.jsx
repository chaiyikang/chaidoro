import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabaseLogOut } from "./supabaseAccount";
import { secondsToHours } from "../../main/helpers";
import { useContext } from "react";
import { ThemeContext } from "../Theming/ThemeContext";
import Modal from "../../UtilityComponents/Modal";

function LogOut({ handleClose, lifetimeCurrentSecondsFocused, lifetimeWorkSessions }) {
	const { themeColour } = useContext(ThemeContext);
	const queryClient = useQueryClient();

	const { mutate: mutateLogOut, isPending } = useMutation({
		mutationFn: () => {
			return supabaseLogOut();
		},
		onSuccess: () => {
			toast.success("Successfully logged out! Your stats will no longer be saved.");
			handleClose();
			queryClient.invalidateQueries({ queryKey: ["userData"] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	return (
		<Modal isOpen={true}>
			<div className="flex h-5/6 w-[20rem] flex-col items-center">
				<h1 className="mb-4 mt-4 text-xl">
					In total, you have completed {lifetimeWorkSessions} sessions, focusing for a total of{" "}
					{secondsToHours(lifetimeCurrentSecondsFocused)} hours.
				</h1>
				<h1 className="mb-4 mt-4 text-xl">If you log out, your progress will no longer be saved</h1>
				<button onClick={handleClose} className="absolute right-1 top-1">
					<span className="material-symbols-outlined">close</span>
				</button>

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
						<button
							// disabled={isPending}
							onClick={mutateLogOut}
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
								"Log out"
							)}
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default LogOut;
