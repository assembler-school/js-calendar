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
    chargeEvent(event);
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
    startDate = getDateTimeUTC(startDate);
    console.log(startDate);

    // END DAY AND TIME ////////////////////////////////////////////////////////
    let finalDate;
    endDate.value ? finalDate = getDateTime(endDate.value, 10, 30, 00) : finalDate = null;
    // Same day or not selected
    if (!endDate.value || finalDate.getDate() === currentDate.getDate()) {
      finalDate = new Date();
      finalDate = getDateWithMoreHours(finalDate, 2);
    }
    finalDate = getDateTimeUTC(finalDate);
    console.log(finalDate);

    if (startDate < finalDate) {
      if (startDate > new Date(Date.now())) {
        // CREATE EVENT
        const event = {
          id: `id_${Date.now()}`,
          title: title.value,
          initDate: startDate,
          endDate: finalDate,
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
        const day = new Date(initDate.value).getDate();
        const month = new Date(initDate.value).getMonth();
        const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
        chargeEvent(event, daySquare);

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
  if (event.finished) newDomEvent.style.backgroundColor = 'red';
  if (!event.remind) newDomEvent.style.backgroundColor = 'orange';

  if (!daySquare) {
    // When the page load and events are loaded
    const finalDate = getDateWithTimezoneProblems(new Date(event.initDate).getTime(), new Date(event.initDate).getTimezoneOffset());
    const daySquare = document.querySelector(`div[data-day="${finalDate.getDate()}"][data-month="${finalDate.getMonth()}"]`);
    daySquare.append(newDomEvent);
  } else {
    // When you add a new event
    daySquare.append(newDomEvent);
  }
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

function eliminateEvent(id) {
  const eliminatedTask = document.querySelector(`#${id}`);
  eliminatedTask.style.backgroundColor = "red";
  localStorage.removeItem("events");
  allEvents.find(event => event.id === id).finished = true;
  localStorage.setItem("events", JSON.stringify(allEvents));
}

function remindEvent(task) {
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