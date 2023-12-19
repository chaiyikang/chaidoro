## Changelog

### 30 Nov 2023 Updates:

1. Lifetime stats like total time focused and total sessions are permanent and will no longer be cleared.
2. Clearing stats will only remove the timeline and not the lifetime stats.
3. Stats were improved to reflect hours and minutes instead of seconds.
4. Height of timeline blocks has been scaled down.
5. To-dos can now be individually deleted
6. Timer ending toggles hidden pomodoro

### 1 Dec 2023 Updates:

1. Toggling components (Stats, Pomodoro, To-do List) now has animations.

### 3 Dec 2023 Updates:

1. Added cat hehe

### 4 Dec 2023 Updates:

1. Added animation to cat: Airplane ears ✈️
2. Cat can now be pet by hovering over him. He meows and goes into airplane mode for you to pet.

### 5 Dec 2023 Updates:

1. restructured how lifetime seconds focused works =>
   lifetime seconds = archived + sum of seconds in stats;
   when stats are cleared archived = lifetime seconds. This fixed the bug where lifetime focus time was slightly unsynchronised with timeline.
2. Work cycle can now be reset with the button below the progress dots.
3. Cat can now be toggled.
4. Fixed bug where timeline was inaccurate when browser is not open / on different tab. Previously statistics were incremented in the useEffect, which was assumed to run every second. This assumption is not guaranteed. Synchronous, blocking tasks such as alert windows or being in a different tab or the browswer being minimised would block some renders, resulting in lower time recorded than expected. A solution where time was calculated based on the difference of timestamps was implemented.

### 12 Dec 2023 Updates:

1. Implemented calendar, tracking by day, traverse timelines of different days, and feature where you can search for a task and see total time spent`

### 13 Dec 2023 Updates:

1. Implemented navbar and scrolling animation for toggling between dashboard and pomodoro.
2. Implemented dashboard with time display, calendar stats, task stat searcher.
3. Implemented dynamic quote/statistic display.

### 14 Dec 2023 Updates:

1. Implemented third tab for cat and basic dragging of food to cat

### 18 Dec 2023 Updates:

1. i am so braindead today but i implemented base logic for cat feeding - food earned by focus time and food fed, tracked by day
2. changed how clearing stats works. instead of deleting from the stats state, clearing stats now simply sets the show property on the stat to false, and only stats with show: true are displayed on the timeline. Solves the problem of having to preserve seconds focused for deleted stats.

### 19 Dec 2023 Updates:

1. IMPLEMENTED CAT CHONKINESS. HE GETS FAT WHEN YOU FEED HIMMMMMMM
