let reminders = [];
let myEvents = [];

function loadEvents() {
  myEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

  myEvents.forEach((event) => {
    event.isOpen ? reminders.push({
      isOpen: true,
      task: event.title,
      initDate: event.initDate,
      endDate: event.endDate,
      duration: event.time * 1000,
      id: event.id
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

    // END DAY AND TIME ////////////////////////////////////////////////////////
    let finalDate;
    endDate.value ? finalDate = getDateTime(endDate.value, 21, 30, 00) : finalDate = null;
    // Same day or not selected
    if (!endDate.value || finalDate.getDate() === currentDate.getDate()) {
      finalDate = getDateWithMoreHours(startDate, 1);
    }

    const event = {
      title: title.value,
      initDate: startDate,
      endDate: finalDate,
      time: time.value ? time.value : "",
      description: description.value ? description.value : "",
      type: type.value ? type.value : "",
      id: `id_${Date.now()}`,
      isOpen: time.value ? true : false,
    }

    time.value ? reminders.push({
      isOpen: true,
      task: title.value,
      initDate: initDate.value,
      duration: event.time * 1000,
    }) : null;

    reloadReminders(event);
    saveStorage("events", myEvents);

    const day = new Date(initDate.value).getDate();
    const month = new Date(initDate.value).getMonth();
    const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    chargeEvent(event, daySquare);
    form.reset();
    document.querySelector("#modal.is-visible").classList.remove(isVisible);
  } else {
    alert("Wrong month");
  }
}

const removeEvent = (e) => {
  e.preventDefault();
  // Delete from localStorage
  const events = arrayRemove(myEvents, idEvent.value)
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

function chargeEvent(event, daySquare) {
  const newDomEvent = document.createElement("div");
  newDomEvent.textContent = event.title;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'modalEvent');

  if (!daySquare) {
    // When the page load and events are loaded
    const finalDate = getDateWithTimezoneProblems(new Date(event.initDate));
    const daySquare = document.querySelector(`div[data-day="${finalDate.getDate()}"][data-month="${finalDate.getMonth()}"]`);
    daySquare.append(newDomEvent);
  } else {
    // When you add a new event
    daySquare.append(newDomEvent);
  }
}

