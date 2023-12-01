import React, { useState } from "react";

const Test = () => {
	// State variable that controls the visibility of the sidebar
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<>
			{/* Button or icon that can toggle the sidebar */}
			{showSidebar ? (
				<button
					className="fixed right-10 top-6 z-50 flex cursor-pointer items-center text-4xl text-white"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					x
				</button>
			) : (
				<svg
					onClick={() => setShowSidebar(!showSidebar)}
					className="fixed right-10 top-6 z-30 flex cursor-pointer items-center"
					fill="#2563EB"
					viewBox="0 0 100 80"
					width="40"
					height="40"
				>
					<rect width="100" height="10"></rect>
					<rect y="30" width="100" height="10"></rect>
					<rect y="60" width="100" height="10"></rect>
				</svg>
			)}

			{/* Sidebar component that renders a div element with some content and styles */}
			<div
				className={`w- [35vw] duration- [500] fixed right-0 top-0 z-40 h-full transform bg-blue-600 p-10 pl-20 text-white transition-all ease-in ${
					showSidebar ? "translate-x- [0]" : "translate-x- [100%]"
				}`}
			>
				<h3 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h3>
			</div>
		</>
	);
};

export default Test;
