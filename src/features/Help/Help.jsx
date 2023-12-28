import Modal from "../../UtilityComponents/Modal";

function Help({ helpIsOpen, setHelpIsOpen }) {
	return (
		<Modal isOpen={helpIsOpen} closeHandler={() => setHelpIsOpen(false)}>
			<div className="mt-4">help</div>
		</Modal>
	);
}

export default Help;
