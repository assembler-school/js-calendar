let reminders = [];
let allEvents = [];

function loadEvents() {
  allEvents = getStorage("events") ? JSON.parse(getStorage("events")) : [];
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
    chooseDateEvent(event);
  });

}

const addEvent = (e) => {
  e.preventDefault();
  const date = new Date(initDate.value);

  // FIRST ERROR - ARE WE IN CORRECT MONTH???
  if (date.getMonth() === navigator) {

    // INIT DAY AND TIME ////////////////////////////////////////////////////////
    let startDate = getFullDateTime(initDate.value, 09, 30, 00);
    // Same day, take the correct hour
    if (startDate.getDate() === currentDate.getDate()) {
      startDate = new Date();
    }
    //console.log(startDate);
    //console.log(new Date());

    // END DAY AND TIME ////////////////////////////////////////////////////////
    let finalDate;
    endDate.value ? finalDate = getFullDateTime(endDate.value, 11, 30, 00) : finalDate = null;
    // Same day or not selected
    if (!endDate.value || finalDate.getDate() === currentDate.getDate()) {
      finalDate = new Date();
      finalDate = addHours_toDate(finalDate, 2);
    }
    //console.log(finalDate);

    // SECOND ERROR - END IS AFTER INIT???
    if (startDate < finalDate) {
      // THIRD ERROR - EVENT AFTER NOW???
      if (startDate >= new Date(currentYear, currentMonth, currentDay)) {

        // CREATE EVENT
        const event = {
          id: `id_${Date.now()}`,
          title: title.value,
          initDate: getFullDate_WithoutTimezone_UTCMethod(startDate),
          endDate: getFullDate_WithoutTimezone_UTCMethod(finalDate),
          time: time.value ? time.value : "",
          description: description.value ? description.value : "",
          type: type.value ? type.value : "",
          remind: time.value ? true : undefined,
          finished: false
        }

        // SET IN REMINDER IF IS NECESARY
        time.value && reminders.push(event);
        // SAVE EVENT - LIVE & STORAGE
        reloadEvents(event);
        saveStorage("events", allEvents);

        // PAINT EVENT IN HIS DAY
        chooseDateEvent(event);
        initModalEvent();

        // RESET FORM
        form.reset();

        // CLOSE MODAL
        document.querySelector("#addModal.is-visible").classList.remove(isVisible);
      } else alert("Wrong start date");
    } else alert("Wrong end date");
  } else {
    alert("Wrong selected month");
  }
}

function chooseDateEvent(event) {

  const day = new Date(event.initDate).getDate();
  const dayEnd = new Date(event.endDate).getDate();
  const month = new Date(event.initDate).getMonth();
  let totalDays = [];

  temp = dayEnd - day;
  for (let i = 0; i <= temp; i++) {
    totalDays.push(i + day);
  }

  totalDays.forEach(day => {
    let daySquare;
    daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    paintEvent(event, daySquare);
  });
}

function paintEvent(event, daySquare) {

  const newDomEvent = document.createElement("div");
  newDomEvent.textContent = event.title;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'eventModal');

  if (event.remind === false) newDomEvent.style.backgroundColor = 'orange';
  if (event.finished) newDomEvent.style.backgroundColor = 'red';

  daySquare.append(newDomEvent);
}

const removeEvent = (e) => {
  e.preventDefault();
  // Delete from localStorage
  allEvents = arrayRemove(allEvents, idEvent.value);
  removeStorage("events");
  saveStorage("events", allEvents);

  // Delete from DOM
  const day = new Date(initEventDate.value).getDate();
  const month = new Date(initEventDate.value).getMonth();
  const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
  Array.from(daySquare.children).forEach(el => {
    if (idEvent.value === el.id) el.remove();
  });
  // Close modal
  document.querySelector("#eventModal.is-visible").classList.remove(isVisible);
}

function disableEvent(task) {
  const content = document.querySelector("#endAlertContent");
  content.innerHTML = '';
  const text = document.createElement('p');
  text.innerHTML = `La tarea <h3>${task.title}</h3> ha finalizado`;
  document.querySelector("#endAlert").classList.add(isVisible);
  content.append(text);

  const eliminatedTask = document.querySelector(`#${task.id}`);
  eliminatedTask.style.backgroundColor = "red";
  removeStorage("events");
  allEvents.find(event => event.id === task.id).finished = true;
  saveStorage("events", allEvents);
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
  removeStorage("events");
  allEvents.find(event => event.id === task.id).remind = false;
  saveStorage("events", allEvents);
}