import Modal from "../../UtilityComponents/Modal";
import Cat from "./cat.png";

function Info({ infoIsOpen, setInfoIsOpen }) {
	const paraStyle = `text-xl pt-2`;
	return (
		<Modal isOpen={infoIsOpen} closeHandler={() => setInfoIsOpen(false)}>
			<div className="pt-4">
				<h1 className="text-3xl">Acknowledgements</h1>
				<h3 className="my-2 text-2xl font-bold">Model for cat illustration</h3>
				<div className="my-2 flex items-center gap-4">
					<img src={Cat} className="h-1/2 w-1/2" alt="cat" />
					<p className="text-xl">
						This guy may look majestic, but he&apos;s actually a tiny baby floofy chonk monster. I
						apologise for not being able to accurately represent his floofiness.
					</p>
				</div>
				<p className={paraStyle}>
					This app was developed with React, Tailwind, and many other libraries.
				</p>
				<p className={paraStyle}>
					Icons were obtained from
					<a
						href="https://fonts.google.com/icons"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Google Fonts
					</a>
				</p>

				<p className={paraStyle}>
					Spinning toolbar was adapted from{" "}
					<a
						href="https://codepen.io/hadarweiss/pen/WvEXeK/"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Hadar Weiss&apos; codepen
					</a>
				</p>
				<p className={paraStyle}>
					Day mode/night mode toggle switch was taken from{" "}
					<a
						href="https://codepen.io/fagnanm/pen/RpWNyb"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Matthew Fagnan&apos; codepen
					</a>
				</p>
				<p className={paraStyle}>
					Pomodoro circle timer was adapted from{" "}
					<a
						href="https://preline.co/docs/progress.html"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						the Preline.co component library
					</a>
				</p>
				<p className={paraStyle}>
					Timer sound effects were obtained from{" "}
					<a
						href="https://www.zapsplat.com"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						https://www.zapsplat.com
					</a>
				</p>
				<p className={paraStyle}>
					Website icon was generated using{" "}
					<a
						href="https://designer.microsoft.com/"
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Microsoft Designer
					</a>
				</p>
			</div>
		</Modal>
	);
}

export default Info;
