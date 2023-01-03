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

function openEvent(e) {
  let tempEvent;
  const events = getStorage("events");
  events &&
    events.forEach((event) => {
      if (event.id === e.target.id) {
        tempEvent = event;
      }
    });
  setEventData(tempEvent);
}