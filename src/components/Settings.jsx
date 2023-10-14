import { useRef } from "react";

export function Settings() {
	return (
		<>
			<Modal>
				<form data-theme="black">
					<h3 className="font-bold text-lg">Settings</h3>
					<div className="py-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Pomodoro length (minutes)</span>
							</label>
							<input type="number" min="1" max="60" className="input input-bordered" />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Short break length (minutes)</span>
							</label>
							<input type="number" min="1" max="15" className="input input-bordered" />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Long break length (minutes)</span>
							</label>
							<input type="number" min="15" max="60" className="input input-bordered" />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Long break interval (pomodoros)</span>
							</label>
							<input type="number" min="1" max="10" className="input input-bordered" />
						</div>
						<div className="form-control mt-4">
							<label className="cursor-pointer label">
								<span className="label-text">Auto start breaks</span>
								<input type="checkbox" className="toggle" />
								<span className="toggle-mark"></span>
							</label>
						</div>
						<div className="form-control mt-4">
							<label className="cursor-pointer label">
								<span className="label-text">Auto start pomodoro</span>
								<input type="checkbox" className="toggle" />
								<span className="toggle-mark"></span>
							</label>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}

function Modal({ children }) {
	const modal = useRef(null);

	return (
		<>
			{/* You can open the modal using document.getElementById('ID').showModal() method */}
			<button className="btn absolute bottom-0 right-0" onClick={() => modal.current.showModal()}>
				Settings
			</button>
			<dialog ref={modal} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
					{children}
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="cursor-default">close</button>
				</form>
			</dialog>
		</>
	);
}
