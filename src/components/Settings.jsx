import { useRef } from "react";

export function Settings() {
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
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">Press ESC key or click on ✕ button to close</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="cursor-default">close</button>
				</form>
			</dialog>
		</>
	);
}
