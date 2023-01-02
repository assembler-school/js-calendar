function threadRemindTasks() {
  setInterval(() => {
    reminders.forEach(task => {
      if (task.remind) {
        //console.log(task);
        const now = new Date();
        const end = getFullDateWithoutTimezone(task.endDate);
/*         console.log("AHORA - " + now);
        console.log("FIN - " + end);
        console.log("DURACION - " + task.time);
        console.log("timeRemind - " + timeRemind);
        console.log("finalTime - " + reminded); */
        const timeRemind = end.getTime() - (task.time * 60 * 1000);
        const reminded = now > new Date(timeRemind);

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
        //console.log(task);
        const init = getFullDateWithoutTimezone(task.initDate);
        const end = getFullDateWithoutTimezone(task.endDate);
        const now = new Date(Date.now());
        if (now > end) {
          eliminateEvent(task.id);
          task.finished = true;
        }
      }
    })
  }, 1000);
}