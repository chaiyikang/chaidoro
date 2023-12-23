import { useContext } from "react";
import { ThemeContext } from "../features/Theming/ThemeContext";

export default function Modal({ children, closeHandler, isOpen }) {
	const { themeColour } = useContext(ThemeContext);
	return (
		<>
			{isOpen && (
				<>
					<div
						className={`fixed left-1/2 top-1/2 z-50 h-auto w-auto -translate-x-1/2 -translate-y-1/2 ${themeColour?.backgroundOpaque} px-7 py-4 text-base`}
					>
						<button onClick={closeHandler} className="absolute right-1 top-1">
							<span className="material-symbols-outlined">close</span>
						</button>
						{children}
					</div>
					<div
						onClick={closeHandler}
						className="fixed left-0 top-0 z-[49] h-screen w-screen bg-black/70"
					></div>
				</>
			)}
		</>
	);
}
