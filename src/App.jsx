import "tailwindcss/tailwind.css";
import "daisyui";
import cat from "../public/img/cat.jpg";

function App() {
  return (
    <>
      <Pomodoro />
      <Drawer />
      <Music />
      <ToDoList />
    </>
  );
}

function Drawer() {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-gray-500 text-base-content absolute top-0 left-0">
      {/* Sidebar content here */}
      <li>
        <h1 className="text-xl">Stats</h1>
      </li>
    </ul>
  );
}

function ToDoList() {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-gray-500 text-base-content absolute top-0 right-0">
      {/* Sidebar content here */}
      <li>
        <h1 className="text-xl">To Do</h1>
      </li>
    </ul>
  );
}

function Music() {
  return (
    <div className="absolute bottom-0 left-0 flex items-center p-4 bg-gray-700 rounded-lg shadow-lg">
      <div className="relative w-16 h-16 mr-4">
        <img
          src="https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"
          alt="Album cover"
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-transparent rounded-lg opacity-75"></div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-white">
          lofi 🎧 for study, chill, and
        </h3>
        <p className="text-sm text-gray-300">Your Eyes - Joey Pecoraro</p>
        <div className="flex items-center mt-2 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-purple-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.5 15.5a1.5 1.5 0 100-3v3zm0 0H21M3 10l6.5 6.5M9.5 15.5L3 21M21 3v6.5M21 9.5h-6.5M3.5 3.5L9.5 9.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 19l7-7-7-7m-8 14l7-7-7-7"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17.25a4.25 4.25 0 100-8.5m4.25-.25a4.25 4.25 0 100-.25m1.25-.75a1.25 1.25 0 11-2.5-.25m1.25-.75a1.25 1.25 0 11-.25-2.5m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25 1.25 0 11-.25-.25m-.75-.75a1.25
				a1
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				.2
				0 11-.25-.25"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h5m8-15H13a2 2 0 00-2 2v11a2 2 0 002 2h5a2 2 0 002-2V7a2 2 0 00-2-2z"
            />
          </svg>
        </div>
        <div className="flex items-center mt-2 space-x-1">
          <span className="text-xs text-gray-400">00:00</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full"
              style={{ width: "30%" }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">03:12</span>
        </div>
      </div>
    </div>
  );
}

function Pomodoro() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-base-200 relative">
      <div className="card shadow-lg w-96">
        <div className="card-body">
          <h2 className="card-title text-center text-4xl font-bold">
            Pomodoro Timer
          </h2>
          <div className="divider"></div>
          <img src={cat} className="w-12 h-12 mx-auto" />
          <div className="flex items-center justify-center mt-4">
            <span className="text-6xl font-mono">25:00</span>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button className="btn btn-circle btn-lg btn-primary mr-4">
              {"\u25B6"}
            </button>
            <button className="btn btn-circle btn-lg btn-secondary ml-4">
              {"\u23F8"}
            </button>
          </div>
          <div className="flex items-center justify-around mt-4">
            <button className="badge badge-primary">Pomodoro</button>
            <button className="badge badge-secondary">Short Break</button>
            <button className="badge badge-secondary">Long Break</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
