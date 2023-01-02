let reminders = [];
let allEvents = [];

function loadEvents() {
  allEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

  allEvents.forEach((event) => {
    event.remind ? reminders.push({
      id: event.id,
      title: event.title,
      initDate: event.initDate,
      endDate: event.endDate,
      time: event.time,
      description: event.description,
      type: event.type,
      remind: event.remind,
      finished: event.finished,
    }) : null;

    const day = new Date(event.initDate).getDate();
    const dayEnd = new Date(event.endDate).getDate();
    const month = new Date(event.initDate).getMonth();
    const monthEnd = new Date(event.endDate).getMonth();
    let temp;
    let rare = 0;
    let first;
    let second;
    const daysInMonth = getDateTimeFullParams(currentYear, month, 0).getDate();
    if (month === monthEnd) {
      temp = dayEnd - day;
    } else {
      const date1 = getDateTimeFullParams(currentYear, month, day);
      const date2 = getDateTimeFullParams(currentYear, monthEnd, dayEnd);
      let time = date2.getTime() - date1.getTime();
      temp = time / (1000 * 3600 * 24);
      first = daysInMonth - day;
      second = temp - first;
    }
    const allDays = [];
    for (let i = 0; i <= temp; i++) {
      if (i <= first) {
        allDays.push(i + day);
      } else {
        allDays.push(second--);
      }
    }
    console.log(allDays);

    allDays.forEach((day, i) => {
      console.log(day);
      let daySquare;
      if (i <= first) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
      chargeEvent(event, daySquare);
    });
  });
}

const addEvent = (e) => {
  e.preventDefault();
  const date = new Date(initDate.value);

  if (date.getMonth() === navigator) {

    // INIT DAY AND TIME ////////////////////////////////////////////////////////
    let startDate = getDateTime(initDate.value, 09, 30, 00);

    // Same day, take the correct hour
    if (startDate.getDate() === currentDate.getDate()) {
      startDate = new Date();
    }
    //startDate = getDateTimeUTC(startDate);
    console.log(startDate);
    console.log(new Date());

    // END DAY AND TIME ////////////////////////////////////////////////////////
    let finalDate;
    endDate.value ? finalDate = getDateTime(endDate.value, 10, 30, 00) : finalDate = null;
    // Same day or not selected
    if (!endDate.value || finalDate.getDate() === currentDate.getDate()) {
      finalDate = new Date();
      finalDate = getDateWithMoreHours(finalDate, 2);
    }
    //finalDate = getDateTimeUTC(finalDate);
    console.log(finalDate);
    if (startDate < finalDate) {
      if (startDate >= new Date()) {
        // CREATE EVENT
        const event = {
          id: `id_${Date.now()}`,
          title: title.value,
          initDate: getDateTimeUTC(startDate),
          endDate: getDateTimeUTC(finalDate),
          time: time.value ? time.value : "",
          description: description.value ? description.value : "",
          type: type.value ? type.value : "",
          remind: time.value ? true : false,
          finished: false
        }


        // SET IN REMINDER IF IS NECESARY
        time.value && reminders.push(event);
        // SAVE EVENT - LIVE & STORAGE
        reloadEvents(event);
        saveStorage("events", allEvents);

        // PAINT EVENT IN HIS DAY
           const day = new Date(event.initDate).getDate();
    const dayEnd = new Date(event.endDate).getDate();
    const month = new Date(event.initDate).getMonth();
    const monthEnd = new Date(event.endDate).getMonth();
    let temp;
    let rare = 0;
    let first;
    let second;
    const daysInMonth = getDateTimeFullParams(currentYear, month, 0).getDate();
    if (month === monthEnd) {
      temp = dayEnd - day;
    } else {
      const date1 = getDateTimeFullParams(currentYear, month, day);
      const date2 = getDateTimeFullParams(currentYear, monthEnd, dayEnd);
      let time = date2.getTime() - date1.getTime();
      temp = time / (1000 * 3600 * 24);
      first = daysInMonth - day;
      second = temp - first;
    }
    const allDays = [];
    for (let i = 0; i <= temp; i++) {
      if (i <= first) {
        allDays.push(i + day);
      } else {
        allDays.push(second--);
      }
    }
    console.log(allDays);

    allDays.forEach((day, i) => {
      console.log(day);
      let daySquare;
      if (i <= first) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
      chargeEvent(event, daySquare);
    });

        // RESET FORM
        form.reset();

        // CLOSE MODAL
        document.querySelector("#modal.is-visible").classList.remove(isVisible);
      } else alert("Wrong start date");
    } else alert("Wrong end date");
  } else {
    alert("Wrong month");
  }
}

function chargeEvent(event, daySquare) {
  const newDomEvent = document.createElement("div");
  newDomEvent.textContent = event.title;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'modalEvent');
  if (!event.remind) newDomEvent.style.backgroundColor = 'orange';
  if (event.finished) newDomEvent.style.backgroundColor = 'red';
  daySquare.append(newDomEvent);
}

const removeEvent = (e) => {
  e.preventDefault();
  // Delete from localStorage
  const events = arrayRemove(allEvents, idEvent.value)
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(events));
  // Delete from DOM
  const day = new Date(initEventDate.value).getDate();
  const month = new Date(initEventDate.value).getMonth();
  const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
  Array.from(daySquare.children).forEach(el => {
    if (idEvent.value === el.id) el.remove();
  });
  // Close modal
  document.querySelector("#modalEvent.is-visible").classList.remove(isVisible);
}

function eliminateEvent(task) {
  const content = document.querySelector("#endAlertContent");
  content.innerHTML = '';
  const text = document.createElement('p');
  text.innerHTML = `La tarea <h3>${task.title}</h3> ha finalizado`;
  document.querySelector("#endAlert").classList.add(isVisible);
  content.append(text);

  const eliminatedTask = document.querySelector(`#${task.id}`);
  eliminatedTask.style.backgroundColor = "red";
  localStorage.removeItem("events");
  allEvents.find(event => event.id === task.id).finished = true;
  localStorage.setItem("events", JSON.stringify(allEvents));
}

function remindEvent(task) {
  const content = document.querySelector("#remindAlertContent");
  content.innerHTML = '';
  const text = document.createElement('p');
  text.innerHTML = `Quedan ${task.time} minutos para terminar la tarea <h3>${task.title}</h3>`;
  document.querySelector("#remindAlert").classList.add(isVisible);
  content.append(text);

  const remindedTask = document.querySelector(`#${task.id}`);
  remindedTask.style.backgroundColor = "orange";
  localStorage.removeItem("events");
  allEvents.find(event => event.id === task.id).remind = false;
  localStorage.setItem("events", JSON.stringify(allEvents));
}


/* function eliminateAllFinishedEvents() {
  allEvents.forEach(e => {
    if (e.finished) eliminateEvent(e.id);
  });
} */