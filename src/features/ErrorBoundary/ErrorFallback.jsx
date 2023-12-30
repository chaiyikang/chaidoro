function ErrorFallback({ error }) {
	return (
		<>
			<div className="grid h-screen w-screen place-items-center bg-slate-900 text-5xl text-slate-400">
				There was an error. The error message is: &quot;{error.message}&quot;
			</div>
		</>
	);
}

export default ErrorFallback;
