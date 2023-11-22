import { TERipple } from "tw-elements-react";

function LogOut({ handleClose, handleLogOut }) {
	return (
		<div className="absolute left-1/2 top-1/2 z-50 grid h-5/6 w-1/3 -translate-x-1/2 -translate-y-1/2 place-items-center bg-slate-800 ">
			<section className="">
				<div className="container h-full px-6 ">
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
							<TERipple rippleColor="light" className="w-full">
								<button
									// disabled={isPending}
									onClick={handleLogOut}
									type="submit"
									className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
								>
									Sign Out
								</button>
							</TERipple>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default LogOut;
