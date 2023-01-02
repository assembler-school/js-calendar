let navigator;
let thisYear;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const isVisible = "is-visible";

const initDate = document.querySelector("#initDate");
const form = document.querySelector("#form");
const formEvent = document.querySelector("#formEvent");

const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth();
const year = date.getFullYear();

let myEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

function initModal() {
  const openModal = document.querySelector("[data-open]");
  openModal.addEventListener("click", function () {
    const modalId = this.dataset.open;
    const date = new Date(year, navigator, 01);
    const finalDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    const result = finalDate.toISOString().split('T')[0];
    initDate.value = result;
    document.getElementById(modalId).classList.add(isVisible);
  });

  const closeModal = document.querySelectorAll("[data-close]");
  for (const el of closeModal) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }
  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#modal.is-visible")) {
      document.querySelector("#modal.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#modal.is-visible")) {
      document.querySelector("#modal.is-visible").classList.remove(isVisible);
    }
  });
}


function initModalEvent() {
  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#modalEvent.is-visible")) {
      document.querySelector("#modalEvent.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#modalEvent.is-visible")) {
      document.querySelector("#modalEvent.is-visible").classList.remove(isVisible);
    }
  });
}

function initForm() {
  const checkboxEndDate = document.querySelector("#existEndDate");
  const checkboxExpiration = document.querySelector("#expiration");
  const containerPreviousTime = document.querySelector("#previousTime");
  const containerEndDate = document.querySelector("#showEndDate");
  const containerExpiration = document.querySelector("#showExpiration");

  const showEndDate = () => {
    if (checkboxEndDate.checked) {
      containerEndDate.classList.add(isVisible);
      containerExpiration.classList.add(isVisible);
      checkboxExpiration.checked = true;
      containerPreviousTime.classList.add(isVisible);
    } else {
      containerEndDate.classList.remove(isVisible);
      containerExpiration.classList.remove(isVisible);
    }
  };

  const showPreviousTime = () => {
    if (checkboxExpiration.checked) {
      containerPreviousTime.classList.add(isVisible);
    } else {
      containerPreviousTime.classList.remove(isVisible);
    }
  };

  checkboxEndDate.addEventListener("change", showEndDate);
  checkboxExpiration.addEventListener("change", showPreviousTime);
  form.addEventListener("submit", addEvent);
  formEvent.addEventListener("submit", removeEvent);
}

const addEvent = (e) => {
  e.preventDefault();

  const date = new Date(initDate.value);
  if (date.getMonth() === navigator) {
    const event = {
      title: title.value,
      initDate: initDate.value,
      endDate: endDate.value ? endDate.value : "",
      time: time.value ? time.value : "",
      description: description.value ? description.value : "",
      type: type.value ? type.value : "",
      id: `id_${Date.now()}`,
    }
    myEvents.push(event);
    localStorage.setItem("events", JSON.stringify(myEvents));

    const day = new Date(event.initDate).getDate();
    const month = new Date(event.initDate).getMonth();

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

  const events = arrayRemove(myEvents, idEvent.value)
  console.log(events);
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(events));
  const day = new Date(initEventDate.value).getDate();
  const month = new Date(initEventDate.value).getMonth();
  const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
  Array.from(daySquare.children).forEach(el => {
    if (idEvent.value === el.id) el.remove();
  });
  document.querySelector("#modalEvent.is-visible").classList.remove(isVisible);

  function arrayRemove(arr, id) {
    return arr.filter(function (event) {
      return event.id != id;
    });
  }
}

function openEvent(e) {
  let getEvent;
  const JsonEvents = localStorage.getItem('events');
  const events = JSON.parse(JsonEvents);
  events && events.forEach((event) => {
    if (event.id === e.target.id) {
      getEvent = event;
    }
  });

  document.querySelector("#modalEvent").classList.add(isVisible);
  document.querySelector("#titleEvent").value = getEvent.title;
  document.querySelector("#initEventDate").value = getEvent.initDate;
  document.querySelector("#endEventDate").value = getEvent.endDate;
  document.querySelector("#descriptionEvent").value = getEvent.description;
  document.querySelector("#optionTimeEvent").value = getEvent.time;
  document.querySelector("#optionTimeEvent").textContent = getEvent.time;
  document.querySelector("#optionTypeEvent").value = getEvent.type;
  document.querySelector("#optionTypeEvent").textContent = getEvent.type;
  document.querySelector("#idEvent").value = getEvent.id;
}

function loadMonths() {
  const calendarContainer = document.querySelector("#months");
  navigator = currentMonth;

  for (let i = 0; i < monthNames.length; i++) {

    const monthContainer = document.createElement('div');
    monthContainer.setAttribute('id', i);
    monthContainer.classList.add('month');
    monthContainer.style.transition = 'opacity 3s ease-out';

    if (i !== currentMonth) monthContainer.style.opacity = '0';
    if (i !== currentMonth) monthContainer.style.height = '0';
    if (i !== currentMonth) monthContainer.style.overflow = 'hidden';
    if (i !== currentMonth) monthContainer.style.lineHeight = '0';

    const firstDayOfMonth = new Date(year, i, 1);
    const daysInMonth = new Date(year, i + 1, 0).getDate();
    const dateStr = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    let emptyDays = weekDays.indexOf(dateStr.split(", ")[0]);

    for (let x = 1; x <= emptyDays + daysInMonth; x++) {

      const day = document.createElement('div');
      day.classList.add('day');

      if (x === currentDay && i === currentMonth) day.classList.add('current');

      if (x > emptyDays) {
        addDay(day, x, i, year, emptyDays);
      } else {
        day.classList.add('empty');
      }
      monthContainer.appendChild(day);
    }
    calendarContainer.appendChild(monthContainer);
  }

  monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;

  function addDay(day, x, i, y, emptyDays) {
    day.textContent = x - emptyDays;
    day.setAttribute('data-day', x - emptyDays);
    day.setAttribute('data-month', i);
    day.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-day')) {
        document.querySelector("#modal").classList.add(isVisible);
        const date = new Date(y, i, x - emptyDays);
        const finalDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
        const result = finalDate.toISOString().split('T')[0];
        initDate.value = result;
      }
    });
  }
  loadEvents();
}

function loadEvents() {
  myEvents.forEach((event) => {
    chargeEvent(event);
  });
}

function chargeEvent(event, daySquare) {
  const newDomEvent = document.createElement("div");
  newDomEvent.textContent = event.title;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'modalEvent');

  if (!daySquare) {
    const date = new Date(event.initDate);
    const finalDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    const daySquare = document.querySelector(`div[data-day="${finalDate.getDate()}"][data-month="${finalDate.getMonth()}"]`);
    daySquare.append(newDomEvent);
  } else {
    daySquare.append(newDomEvent);
  }
}

function initMonthButtons() {
  document.querySelector('#previousMonth').style.visibility = 'hidden';
  document.querySelector('#nextMonth').addEventListener('click', () => changeMonth('up'));
  document.querySelector('#previousMonth').addEventListener('click', () => changeMonth('down'));
}

function changeMonth(action) {
  const month = document.getElementById(navigator);
  const previousBtn = document.querySelector('#previousMonth');
  const nextBtn = document.querySelector('#nextMonth');
  const monthDisplay = document.querySelector("#monthDisplay");

  if (action === 'up') {
    month.style.opacity = '0';
    month.style.height = '0';
    month.style.lineHeight = '0';
    month.style.overflow = 'hidden';
    navigator++;
    document.getElementById(navigator).style.opacity = '1';
    document.getElementById(navigator).style.height = 'auto';
    document.getElementById(navigator).style.lineHeight = 'inherit';
    document.getElementById(navigator).style.overflow = 'visible';

    previousBtn.style.visibility = 'visible';
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;
    if (navigator === 11) nextBtn.style.visibility = 'hidden';
  } else {
    month.style.opacity = '0';
    month.style.height = '0';
    month.style.lineHeight = '0';
    month.style.overflow = 'hidden';
    navigator--;
    document.getElementById(navigator).style.opacity = '1';
    document.getElementById(navigator).style.height = 'auto';
    document.getElementById(navigator).style.lineHeight = 'inherit';
    document.getElementById(navigator).style.overflow = 'visible';


    nextBtn.style.visibility = 'visible';
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;
    if (navigator === 0) previousBtn.style.visibility = 'hidden';
  }
}

loadMonths();
initMonthButtons();
initModal();
initModalEvent();
initForm();




