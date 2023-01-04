let reminders = [];
let allEvents = [];

function loadEvents() {
  allEvents = getStorage("events") ? getStorage("events") : [];
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
    chooseDateEventAndPaint(event);
  });
}

const addEvent = (e) => {
  e.preventDefault();
  const date = new Date(initDate.value);
  if (date.getMonth() === navigator) {
    const startDate = getStartDateOfEvent(initDate.value);
    const finalDate = getEndDateOfEvent(endDate.value);
    if (finalDate.getMonth() - startDate.getMonth() <= 1) {
      if (startDate < finalDate) {
        if (startDate >= new Date(currentYear, currentMonth, currentDay)) {
          const event = createEvent(startDate, finalDate);
          time.value && reloadReminderEvents(event);
          reloadEvents(event);
          saveStorage("events", allEvents);
          chooseDateEventAndPaint(event);
          initModalEvent();
          form.reset();
          document.querySelector("#addModal.is-visible").classList.remove(isVisible);
        } else openError(1);
      } else openError(2);
    } else openError(3);
  } else openError(4);
}

function getStartDateOfEvent(date) {
  let startDate = getFullDateTime(date, 09, 30, 00);
  if (startDate.getDate() === currentDate.getDate()) {
    startDate = new Date();
  }
  return startDate;
}

function getEndDateOfEvent(date) {
  let finalDate;
  endDate.value ? finalDate = getFullDateTime(date, 11, 30, 00) : finalDate = null;
  if (!endDate.value || finalDate.getDate() === currentDate.getDate()) {
    finalDate = new Date();
    finalDate = addHours_toDate(finalDate, 2);
  }
  return finalDate;
}

function createEvent(startDate, finalDate) {
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
  return event;
}

function chooseDateEventAndPaint(event) {
  const month = new Date(event.initDate).getMonth();
  const monthEnd = new Date(event.endDate).getMonth();
  const { totalDays, daysInMonth1 } = getDaysOfEvent(event.initDate, event.endDate);
  totalDays.forEach((day, i) => {
    let daySquare;
    if (monthEnd - month > 0) {
      if (i <= daysInMonth1) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
    } else {
      daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    }
    paintEvent(event, daySquare);
  });
}

function paintEvent(event, daySquare) {
  const newDomEvent = document.createElement("div");
  const dateStart = getFullDate_WithoutTimezone_ISOMethod(event.initDate);
  const hoursStart = dateStart.getHours();
  const minutesStart = dateStart.getMinutes();
  const secondsStart = dateStart.getSeconds();
  const timeStart = getFullTime(hoursStart, minutesStart, secondsStart);
  const dateEnd = getFullDate_WithoutTimezone_ISOMethod(event.endDate);
  const hoursEnd = dateEnd.getHours();
  const minutesEnd = dateEnd.getMinutes();
  const secondsEnd = dateEnd.getSeconds();
  const timeEnd = getFullTime(hoursEnd, minutesEnd, secondsEnd);
  newDomEvent.innerHTML = `<p>${event.title}<p/>
  <p>${timeStart} - ${timeEnd}</p>`;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'eventModal');

  if (event.remind === false) newDomEvent.style.backgroundColor = 'orange';
  if (event.finished) newDomEvent.style.backgroundColor = 'rgb(203 55 55)';

  daySquare.append(newDomEvent);
}

const removeEvent = (e) => {
  e.preventDefault();
  allEvents = arrayRemove(allEvents, idEvent.value);
  removeStorage("events");
  saveStorage("events", allEvents);

  const month = new Date(initEventDate.value).getMonth();
  const monthEnd = new Date(endEventDate.value).getMonth();
  const { totalDays, daysInMonth1 } = getDaysOfEvent(initEventDate.value, endEventDate.value);

  totalDays.forEach((day, i) => {
    let daySquare;
    if (monthEnd - month > 0) {
      if (i <= daysInMonth1) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
    } else {
      daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    }
    Array.from(daySquare.children).forEach(el => {
      if (idEvent.value === el.id) el.remove();
    });
  });
  document.querySelector("#eventModal.is-visible").classList.remove(isVisible);
}

function getDaysOfEvent(initDate, endDate) {
  const dateStart = getFullDate_WithoutTimezone_ISOMethod(initDate);
  const dateFinal = getFullDate_WithoutTimezone_ISOMethod(endDate);;
  const year = dateStart.getFullYear();
  const dayInit = dateStart.getDate();
  const dayFinal = dateFinal.getDate();
  const monthInit = dateStart.getMonth();
  const monthEnd = dateFinal.getMonth();
  let totalDays = [];

  if (monthEnd - monthInit > 0) {
    const daysInMonth = getFullDate_WithoutTimezone_TimezonOffsetMethod_FromParameters(year, monthInit, 0).getDate();
    const daysInMonth1 = (daysInMonth - dayInit);
    const daysInMonth2 = dayFinal;
    const numberDays = daysInMonth1 + daysInMonth2;
    for (let i = 0; i <= numberDays; i++) {
      if (i <= daysInMonth1) totalDays.push(i + dayInit);
    }
    for (let x = 1; x <= (numberDays - daysInMonth1); x++) {
      totalDays.push(x);
    }
    const objectToReturn = {
      totalDays: totalDays,
      daysInMonth1: daysInMonth1,
    }
    console.log(objectToReturn);
    return objectToReturn;

  } else {
    const numberDays = dayFinal - dayInit;
    for (let i = 0; i <= numberDays; i++) {
      totalDays.push(i + dayInit);
    }
    return { totalDays: totalDays };
  }


}

function disableEvent(task) {
  openAlert(task, "end");
  removeStorage("events");
  allEvents.find(event => event.id === task.id).finished = true;
  saveStorage("events", allEvents);
  setTimeout(() => {
    if (document.querySelector("#endAlert.is-visible")) {
      document.querySelector("#endAlert.is-visible").classList.remove(isVisible);
    }
  }, 5000);
}

function remindEvent(task) {
  openAlert(task, "remind");
  removeStorage("events");
  allEvents.find(event => event.id === task.id).remind = false;
  saveStorage("events", allEvents);
  setTimeout(() => {
    if (document.querySelector("#remindAlert.is-visible")) {
      document.querySelector("#remindAlert.is-visible").classList.remove(isVisible);
    }
  }, 5000);
}