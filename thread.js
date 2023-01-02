function threadTasks() {
  setInterval(() => {
 
   console.log('Buscando hilos');

    reminders.forEach(task => {
      if (task.isOpen) {
        const time = new Date().getTime();
        const initDate = new Date(task.initDate).getTime();
        const endDate = new Date(task.endDate).getTime();

        console.log("AHORA - " + time);
        console.log("FIN - " + endDate);
        console.log("AHORA - FIN : " + (time - endDate));
        console.log("DURACION - " + task.duration);

        if (time - endDate <= task.duration) {
          console.log("AVISANDO")
        }
        if (time <= endDate) {
          console.log("la tarea ha caducado");
          const modifiedTask = document.querySelector(`div[day-event="${task.timestamp}"]`);
          modifiedTask.style.backgroundColor = "red";
        }
        /*         if (time - initDate > task.duration) {
                  task.isOpen = false;
                } */
      }
    })
  }, 5000)
}