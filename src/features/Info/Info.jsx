import Modal from "../../UtilityComponents/Modal";

function Info({ infoIsOpen, setInfoIsOpen }) {
	return (
		<Modal isOpen={infoIsOpen} closeHandler={() => setInfoIsOpen(false)}>
			<div className="mt-4">sup</div>
		</Modal>
	);
}

export default Info;
