let navigator;
let thisYear;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const isVisible = "is-visible";

let actualEvents = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

function initModal() {
  const openModal = document.querySelector("[data-open]");
  openModal.addEventListener("click", function () {
    const modalId = this.dataset.open;
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
}


function loadMonths() {
  const calendarContainer = document.querySelector("#months");
  const date = new Date();
  const currentDay = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  navigator = month;
  thisYear = year;

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
      day.setAttribute('id', x);
      day.setAttribute('month', i);
      day.addEventListener('click', function () {
        document.querySelector(".modal").classList.add(isVisible);
      });
      day.addEventListener('mouseover', function (e) {
        const icon = document.createElement('i');
        icon.classList.add('bi');
        icon.classList.add('bi-plus-circle');
        e.target.appendChild(icon);
      });
      day.addEventListener('mouseout', function (e) {
        e.target.children[0].remove();
      });

      if (x === currentDay && i === month) day.classList.add('current');


      if (x > emptyDays) {
        day.textContent = x - emptyDays;
      } else {
        day.classList.add('empty');
      }
      monthContainer.appendChild(day);
    }

    calendarContainer.appendChild(monthContainer);
  }

  monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${year}</p>`;
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
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${thisYear}</p>`;
    if (navigator === 11) nextBtn.style.visibility = 'hidden';
  } else {
    navigator--;
    month.style.display = 'none';
    document.getElementById(navigator).style.display = 'flex';
    nextBtn.style.visibility = 'visible';
    monthDisplay.innerHTML = `<p>${monthNames[navigator]}, ${thisYear}</p>`;
    if (navigator === 0) previousBtn.style.visibility = 'hidden';
  }
}

loadMonths();
initMonthButtons();
initModal();
initForm();




