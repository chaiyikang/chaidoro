import { useState } from "react";
import useSound from "use-sound";
import meowSfx from "../sounds/meowwww.mp3";

function Cat() {
	const [animate, setAnimate] = useState(false);
	const [meowSound] = useSound(meowSfx);

	function handlePet() {
		setAnimate(true);
		meowSound();
	}

	return (
		<div className=" absolute left-[10rem] top-1/2 z-[999999999] h-[20rem] w-[20rem]">
			<svg
				onMouseEnter={handlePet}
				onMouseLeave={() => setAnimate(false)}
				className={`${animate ? "open" : "close"} h-auto w-auto`}
				id="svgContainer"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="50 90 230 180"
				shapeRendering="geometricPrecision"
				textRendering="geometricPrecision"
			>
				{/* body */}
				<g>
					<path
						d="M-78.679889,0c0-27.128555,21.31593-50.859376,64.769633-50.859376-3.7393,2.581716,16.000254-18.542677,48.251203-14.779648s44.338942,45.202014,44.338942,65.639024c0,27.128555-37.399663,24.777644-80.853366,24.777644s-76.506412,2.350911-76.506412-24.777644Z"
						transform="translate(174.792606 213.66022)"
						fill="#a7723e"
						strokeWidth={0}
					/>
					{/* head */}
					<path
						d="M-47.569268,0c-2.257918-27.597272,18.470758-42.927129,47.802197-43.949469s48.318845,16.113859,47.336339,43.949469-21.297487,45.056683-47.569268,45.056683-47.569268-20.172564-47.569268-45.056683Z"
						transform="matrix(1.046641 0 0 0.871027 119.882875 150.025573)"
						fill="#a6733e"
						strokeWidth={0}
					/>
				</g>
				<g id="leftEarPosition" transform="translate(88.429634,125.717866)">
					<g id="leftEarRotate" transform="rotate(-34.153047)">
						<g transform="scale(-1,1) translate(-19.804277,-111.747054)">
							<path
								d="M-3.229973,14.259065l-20.125-.000003L-3.354972,-22.62941"
								transform="translate(23.354973 97.284064)"
								fill="#4a3927"
								strokeWidth={0}
							/>
							<path
								d="M-3.229973,14.259065l-20.125-.000003L-3.354972,-22.62941"
								transform="matrix(-1 0 0 1 16.455706 97.284064)"
								fill="#a27e58"
								strokeWidth={0}
							/>
						</g>
					</g>
				</g>
				<g id="rightEarPosition" transform="translate(158.895473,107.624222)">
					<g id="rightEarRotate" transform="rotate(31.710381)">
						<g transform="translate(-19.90534,-93.098896)">
							<path
								d="M-3.229973,14.259065l-20.125-.000003L-3.354972,-22.62941"
								transform="translate(23.354973 97.284064)"
								fill="#4a3927"
								strokeWidth={0}
							/>
							<path
								d="M-3.229973,14.259065l-20.125-.000003L-3.354972,-22.62941"
								transform="matrix(-1 0 0 1 16.455706 97.284064)"
								fill="#a27e58"
								strokeWidth={0}
							/>
						</g>
					</g>
				</g>
				<g transform="translate(3 0)">
					<ellipse
						rx="15.85003"
						ry="15.85003"
						transform="matrix(.769235 0 0 0.769235 96.966318 137.386038)"
						fill="#606344"
						strokeWidth={0}
					/>
					<ellipse
						rx="9.591301"
						ry="9.591301"
						transform="translate(96.885037 136.979627)"
						strokeWidth={0}
					/>
				</g>
				<g transform="translate(37.332555-.369168)">
					<ellipse
						rx="15.85003"
						ry="15.85003"
						transform="matrix(.769235 0 0 0.769235 96.966318 137.386038)"
						fill="#606344"
						strokeWidth={0}
					/>
					<ellipse
						rx="9.591301"
						ry="9.591301"
						transform="translate(96.885037 136.979627)"
						strokeWidth={0}
					/>
				</g>
				<g>
					<path
						d="M1.697028,-5.232502c3.769204-1.041939,6.246293,4.486483,5.987927,9.669412l-6,.000002"
						transform="matrix(-.99999-.004453 0.001976-.44379 119.769769 162.343062)"
						fill="#745445"
						strokeWidth={0}
					/>
					<path
						d="M1.697028,-5.232502c3.769204-1.041939,6.246293,4.486483,5.987927,9.669412l-6,.000002"
						transform="matrix(.99999 0.004453 0.001976-.44379 116.038402 162.334427)"
						fill="#745445"
						strokeWidth={0}
					/>
				</g>
				<g transform="translate(3.000001 0.000001)">
					<path
						d="M-2.071874,-7.464513c-.786445,8.477719-3.253474,6.46278-4,2.180929"
						transform="translate(116.790761 172.114581)"
						fill="none"
						stroke="#754818"
						strokeMiterlimit={1}
					/>
					<path
						d="M-2.071874,-7.464513c-.786445,8.477719-3.253474,6.46278-4,2.180929"
						transform="matrix(-1 0 0 1 112.790761 172.114581)"
						fill="none"
						stroke="#754818"
						strokeMiterlimit={1}
					/>
				</g>
				<path
					d="M23.635564,-5.469386c-34.599015-1.660113-28.787236,27.562084-25.393582,34.769672"
					transform="translate(203.461267 201.652899)"
					fill="none"
					stroke="#9c5000"
					strokeWidth={3}
				/>
				<g id="tailRotate" transform="translate(252.76282,222.039048) rotate(0)">
					<path
						d="M-64.851301,0.781341C-7.013366,7.701536,56.157181,-5.950395,57.428562,-23.440228"
						transform="translate(-55.966276,23.931626)"
						fill="none"
						stroke="#a6733e"
						strokeWidth={15}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</svg>
		</div>
	);
}

export default Cat;
