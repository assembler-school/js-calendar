function threadRemindTasks() {
  setInterval(() => {
    reminders.forEach(task => {
      if (task.remind) {
        const now = new Date();
        const end = getFullDate_WithoutTimezone_ISOMethod(task.endDate);
        console.log("AHORA - " + now);
        console.log("FIN - " + end);
        console.log("DURACION - " + task.time);
        const timeRemind = end.getTime() - (task.time * 60 * 1000);
        const reminded = now > new Date(timeRemind);
        //console.log("timeRemind - " + timeRemind);
        //console.log("finalTime - " + reminded);

        if (reminded) {
          remindEvent(task);
          task.remind = false;
        }
      }
    })
  }, 1000)
}

function threadPendingTasks() {
  setInterval(() => {
    allEvents.forEach((task) => {
      if (!task.finished) {
        const init = getFullDate_WithoutTimezone_ISOMethod(task.initDate);
        const end = getFullDate_WithoutTimezone_ISOMethod(task.endDate);
        const now = new Date(Date.now());
        if (now > end) {
          disableEvent(task);
          task.finished = true;
        }
      }
    })
  }, 1000);
}