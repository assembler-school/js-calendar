const openModal = document.querySelector("[data-open]");
const closeModal = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

function initModalCreation() {
  openModal.addEventListener("click", function () {
    const modalId = this.dataset.open;
    const date = getDateTimeFullParams(currentYear, navigator, 1);
    const result = date.toISOString().split('T')[0];
    initDate.value = result;
    endDate.value = result;
    hideEndDateAndRemind();
    document.getElementById(modalId).classList.add(isVisible);
  });
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

function initRemindAlert() {
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

  document.querySelector("#modalEvent").classList.add(isVisible);
  document.querySelector("#titleEvent").value = tempEvent.title;
  document.querySelector("#initEventDate").value = getDateToISOString(tempEvent.initDate);
  document.querySelector("#endEventDate").value = getDateToISOString(tempEvent.endDate);
  document.querySelector("#descriptionEvent").value = tempEvent.description;
  document.querySelector("#optionTimeEvent").value = tempEvent.time;
  document.querySelector("#optionTimeEvent").textContent = tempEvent.time;
  document.querySelector("#optionTypeEvent").value = tempEvent.type;
  document.querySelector("#optionTypeEvent").textContent = tempEvent.type;
  document.querySelector("#idEvent").value = tempEvent.id;
}