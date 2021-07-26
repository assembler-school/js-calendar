'use strict';

//initialize calendar
writeMonth(currentMonth);
setNewDate();
writeEventsOfTheDay(today);
writeDayWeek(today);
addDotsToCalendar();

//initialize reminders
activateReminders(reminders)
setInterval(function () { activateReminders(reminders) }, 10 * 1000);
