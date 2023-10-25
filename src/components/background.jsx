import bgVideo from "../videos/outside_sun.mp4";

export function Background() {
	return (
		<>
			<video
				className="bg-fixed absolute top-0 left-0 -z-2 w-screen h-screen object-cover"
				autoPlay
				loop
				muted
			>
				<source src={bgVideo} type="video/mp4" />
			</video>
			{/* <div className="-z-1 absolute top-0 left-0 w-screen h-screen bg-black/30" /> */}
		</>
	);
}
