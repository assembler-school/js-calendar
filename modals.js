const isVisible = "is-visible";

function initModalCreation() {

  const openAddModal = document.querySelectorAll('[data-open="addModal"]');
  const closeAddModal = document.querySelectorAll('[data-close="addModal"]');

  for (const el of openAddModal) {
    el.addEventListener("click", function (e) {
      if (e.target.classList.contains("day") || e.target.classList.contains("open-modal")) {
        let date;
        if (el.hasAttribute('data-day')) {
          const year = el.getAttribute('data-year');
          const day = el.getAttribute('data-day');
          const month = el.getAttribute('data-month');
          const emptyDays = el.getAttribute('data-empty');
          date = getFullDate_WithoutTimezone_TimezonOffsetMethod_FromParameters(year, month, day - emptyDays, 12, 00, 00);
        } else {
          date = getFullDate_WithoutTimezone_TimezonOffsetMethod_FromParameters(currentYear, navigator, 1);
        }
        const result = date.toISOString().split('T')[0];
        setDatesInForm(result);
        hideEndDateAndRemind();
        document.getElementById("addModal").classList.add(isVisible);
      }
    });
  }

  for (const el of closeAddModal) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }
  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#addModal.is-visible")) {
      document.querySelector("#addModal.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#addModal.is-visible")) {
      document.querySelector("#addModal.is-visible").classList.remove(isVisible);
    }
  });
}

function initModalEvent() {

  const openEventModal = document.querySelectorAll('[data-open="eventModal"]');
  const closeEventModal = document.querySelectorAll('[data-close="eventModal"]');

  for (const el of openEventModal) {
    el.addEventListener("click", function () {
      document.querySelector("#eventModal").classList.add(isVisible);
    });
  }

  for (const el of closeEventModal) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#eventModal.is-visible")) {
      document.querySelector("#eventModal.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#eventModal.is-visible")) {
      document.querySelector("#eventModal.is-visible").classList.remove(isVisible);
    }
  });
}

function initRemindAlert() {

  const closeRemindAlert = document.querySelectorAll('[data-close="remindAlert"]');

  for (const el of closeRemindAlert) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#remindAlert.is-visible")) {
      document.querySelector("#remindAlert.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#remindAlert.is-visible")) {
      document.querySelector("#remindAlert.is-visible").classList.remove(isVisible);
    }
  });
}

function initEndAlert() {

  const closeEndAlert = document.querySelectorAll('[data-close="endAlert"]');

  for (const el of closeEndAlert) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#endAlert.is-visible")) {
      document.querySelector("#endAlert.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#endAlert.is-visible")) {
      document.querySelector("#endAlert.is-visible").classList.remove(isVisible);
    }
  });
}

function initErrors() {

  const closeEndAlert = document.querySelectorAll('[data-close="error"]');

  for (const el of closeEndAlert) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector("#error.is-visible")) {
      document.querySelector("#error.is-visible").classList.remove(isVisible);
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector("#error.is-visible")) {
      document.querySelector("#error.is-visible").classList.remove(isVisible);
    }
  });
}

function initializeModals() {
  initModalCreation();
  initModalEvent();
  initRemindAlert();
  initEndAlert();
  initErrors();
}

function openEvent(e) {
  let tempEvent;
  const events = getStorage("events");
  events &&
    events.forEach((event) => {

      if (event.id === e.target.parentElement.id) {
        tempEvent = event;
      }
    });
  setEventData(tempEvent);
}

function openError(type) {
  const content = document.querySelector("#errorContent");
  content.innerHTML = '';
  const text = document.createElement('span');

  switch (type) {
    case 1:
      text.textContent = 'Error . . . Cannot create an event on a date before the current date';
      break;
    case 2:
      text.textContent = 'Error . . . The end date of the event must be later than the start date.';
      break;
    case 3:
      text.textContent = 'Error . . . The duration of the event cannot exceed two months.';
      break;
    case 4:
      text.textContent = 'Error . . . The month from which you are trying to create the event is incorrect. Please select the correct month before creating the event.';
      break;
  }
  content.append(text);
  document.querySelector("#error").classList.add(isVisible);
}

function openAlert(task, type) {
  if (type === "end") {
    const content = document.querySelector("#endAlertContent");
    content.innerHTML = '';
    const text = document.createElement('span');
    text.innerHTML = `La tarea <strong>${task.title}</strong> ha finalizado`;
    content.append(text);
    document.querySelector("#endAlert").classList.add(isVisible);
    const disabledTasks = document.querySelectorAll(`#${task.id}`);
    for (const task of disabledTasks) {
      task.style.backgroundColor = "rgb(203 55 55)";
    }
  } else {
    const content = document.querySelector("#remindAlertContent");
    content.innerHTML = '';
    const text = document.createElement('span');
    text.innerHTML = `Quedan <strong>${task.time} minutos</strong> para terminar la tarea <strong>${task.title}</strong>`;
    content.append(text);
    document.querySelector("#remindAlert").classList.add(isVisible);
    const remindedTasks = document.querySelectorAll(`#${task.id}`);
    for (const task of remindedTasks) {
      task.style.backgroundColor = "orange";
    }

  }
}