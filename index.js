let navigator;
let thisYear;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const isVisible = "is-visible";

const initDate = document.querySelector("#initDate");
const form = document.querySelector("#form");

const date = new Date();
const currentDay = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let actualEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

function initModal() {
  const openModal = document.querySelector("[data-open]");
  openModal.addEventListener("click", function () {
    const modalId = this.dataset.open;
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
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
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
}

const addEvent = (e) => {
  e.preventDefault();

  const event = {
    title: title.value,
    initDate: initDate.value,
    endDate: endDate.value ? endDate.value : "",
    time: time.value ? time.value : "",
    description: description.value ? description.value : "",
    type: type.value ? type.value : "",
  }
  const day = new Date(event.initDate).getDate();
  const month = new Date(event.initDate).getMonth();

  const daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
  daySquare.children[0].remove();
  const newEvent = document.createElement("div");
  newEvent.textContent = event.title;
  newEvent.classList.add("day-event");
  newEvent.addEventListener("click", () => openEvent());
  daySquare.append(newEvent);
  form.reset();
  document.querySelector(".modal.is-visible").classList.remove(isVisible);
}

function openEvent() {
  console.log("Mostrando evento");
}


function loadMonths() {
  const calendarContainer = document.querySelector("#months");
  navigator = month;

  for (let i = 0; i < monthNames.length; i++) {

    const monthContainer = document.createElement('div');
    monthContainer.setAttribute('id', i);
    monthContainer.classList.add('month');
    if (i !== month) monthContainer.style.display = 'none';

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

      if (x === currentDay && i === month) day.classList.add('current');

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
    day.setAttribute('data-day', x-emptyDays);
    day.setAttribute('data-month', i);
    day.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-day')) {
        document.querySelector(".modal").classList.add(isVisible);
        const date = new Date(y, i, x - emptyDays);
        const finalDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
        const result = finalDate.toISOString().split('T')[0];
        initDate.value = result;
      }
    });
    day.addEventListener('mouseover', function () {
      document.querySelector(`i[data-day="${x}"][data-month="${i}"]`).style.display = 'block';
    });
    day.addEventListener('mouseout', function () {
      document.querySelector(`i[data-day="${x}"][data-month="${i}"]`).style.display = 'none';
    });

    const icon = document.createElement('i');
    icon.classList.add('bi');
    icon.classList.add('bi-plus-circle');
    icon.setAttribute('data-day', x);
    icon.setAttribute('data-month', i);
    icon.style.display = 'none';
    day.appendChild(icon);
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
    navigator++;
    month.style.display = 'none';
    document.getElementById(navigator).style.display = 'flex';
    previousBtn.style.visibility = 'visible';
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;
    if (navigator === 11) nextBtn.style.visibility = 'hidden';
  } else {
    navigator--;
    month.style.display = 'none';
    document.getElementById(navigator).style.display = 'flex';
    nextBtn.style.visibility = 'visible';
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;
    if (navigator === 0) previousBtn.style.visibility = 'hidden';
  }
}

loadMonths();
initMonthButtons();
initModal();
initForm();




