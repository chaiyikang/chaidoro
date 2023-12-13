function Dashboard({ dashboardIsOpen }) {
	return (
		<div
			className={`absolute transition-all duration-500 ${
				dashboardIsOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<div className="h-[10rem] w-[10rem] bg-red-400"></div>
		</div>
	);
}

export default Dashboard;
