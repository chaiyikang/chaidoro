import Modal from "../../UtilityComponents/Modal";

function Help({ helpIsOpen, setHelpIsOpen }) {
	const questionStyle = `text-2xl font-bold pt-2`;
	const answerStyle = `text-xl pt-2`;
	return (
		<Modal isOpen={helpIsOpen} closeHandler={() => setHelpIsOpen(false)}>
			<div className="mt-4 max-h-full w-full overflow-auto">
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
				<p className={questionStyle}>I refreshed the page, now all my progress is gone!</p>
				<p className={answerStyle}>
					To save your progress, simply create an account with your email. There isn’t even any
					email verification needed.
				</p>
				<p className={questionStyle}>How does the To-Do list work?</p>
				<p className={answerStyle}>
					After adding a new task, click on it to mark it as “active” when you are working on it.
					After you have completed the task, you can click the check button to mark it as complete.
				</p>
				<p className={questionStyle}>How do the statistics work?</p>
				<p className={answerStyle}>
					The statistics feature was created to allow the user to appreciate their cumulative
					progress, encourage consistency, and respect their grind. Whenever the timer runs, what
					you are doing is recorded in the timeline on the left, be it a Pomodoro or a break. If you
					have selected a task, the task name you specified is recorded in the timeline. A new
					timeline is created everyday, so you can visualise the amount of work you did that day. On
					the homepage dashboard, you will notice a calendar. Each day in a month is represented by
					a square, and the more time you focused that day, the darker the square. You can click on
					the square to check out the timeline that was recorded for that day. Streaks are also
					recorded to encourage you to stay consistent. So long as you recorded a non-break
					statistic for the day, it will be counted as you having worked that day. There is no
					minimum requirement of time focused. Below the calendar, there is a search bar that allows
					you to search for a task that you have focused on, and it tells you how much time, in
					total, you have spent on it. This even includes the breaks you have taken.
				</p>
				<p className={questionStyle}>Why is there an ugly looking cat staring at me?</p>
				<p className={answerStyle}>
					That’s because he’s starving. If statistics and streaks aren’t enough to encourage you to
					stay consistent, maybe being accused of animal cruelty will do the trick. To feed him,
					drag the tuna to him. He gets chonkier the more you feed him hehe. To earn more food,
					every 25 minutes of work done per day earns you 1 can of tuna. This 25 minutes does not
					need to be an unbroken session, ie it can be interrupted by breaks, pausing the timer, or
					switching between to-do tasks.
				</p>
				<p className={questionStyle}>Are there any other features?</p>
				<p className={answerStyle}>
					On the home dashboard, nice quotes are shown. There is literally only 1 quote to start but
					I will progressively add quotes that I think are nice from the books I read. If you have
					recorded some statistics, it may also display some facts about your statistics. You can
					click the refresh button to show a new quote/statistic. You can toggle between the day and
					night themes with the day/night toggle switch. You can use the left and right arrow keys
					to navigate between the 3 tabs. You can press “Enter” to enter fullscreen mode.
				</p>
			</div>
		</Modal>
	);
}

export default Help;
