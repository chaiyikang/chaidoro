import Modal from "../../UtilityComponents/Modal";

function Help({ helpIsOpen, setHelpIsOpen }) {
	const questionStyle = `text-2xl font-bold pt-2`;
	const answerStyle = `text-xl pt-2`;
	const paraStyle = `text-xl pt-2`;
	return (
		<Modal isOpen={helpIsOpen} closeHandler={() => setHelpIsOpen(false)}>
			<div className="mt-4">
				<p className={questionStyle}>What is the pomodoro technique?</p>
				<p className={answerStyle}>
					The pomodoro technique is a productivity method that allows you to work for long periods
					of time while maximising your efficiency. The default &quot;pomodoro&quot; invovles
					working for 25 minutes, then taking a 5 minute short break break. Every fourth pomodoro,
					you get a &quot;long&quot; break of 15 minutes.
				</p>
				<p className={questionStyle}>How do I use the pomodoro technique on this app?</p>
				<p className={answerStyle}>
					Hit the play button to start the timer. You can fully customise the lengths of each
					pomodoro, short break, and long break, as well as the long break interval, ie the number
					of pomodoros completed before you get a long break. The dots at the center of the timer
					indicate which pomodoro set you are on. You can press the reset button to reset the
					pomodoro set count. Additionally, you can also click on the &quot;Pomodoro&quot;,
					&quot;Short Break&quot;, and &quot;Long Break&quot; labels to freely jump between
					work/rest.
				</p>
			</div>
		</Modal>
	);
}

export default Help;
