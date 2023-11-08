import bgVideo from "../videos/outside_sun.mp4";

export function Background() {
	return (
		<>
			<video
				className="absolute top-0 left-0 object-cover w-screen h-screen bg-fixed -z-2"
				autoPlay
				loop
				muted
			>
				<source src={bgVideo} type="video/mp4" />
			</video>
			{/* <div className="absolute top-0 left-0 w-screen h-screen -z-1 bg-black/30" /> */}
		</>
	);
}
