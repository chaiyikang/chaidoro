import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../styles/index.css";
import "../features/PomodoroApp/Pomodoro/menuAnimation.css";
import "../features/Cat/catAnimation.css";
import "../features/Theming/dayNightToggle.css";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../features/ErrorBoundary/ErrorFallback.jsx";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary fallbackRender={ErrorFallback}>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				<App />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>,
);
