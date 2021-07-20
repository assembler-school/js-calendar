// ----------- VARIABLES --------

// Modal
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector("#modal");
let modalClose = document.querySelector("#button-close");
let closeModalBtn = document.querySelector("#close-modal");

// Form
const endDate = document.getElementById("endDate");
const remind = document.getElementById("remind");
const endDateInput = document.getElementById("endDateInput");
const remindInput = document.getElementById("remindInput");

// --------- EVENT LISTENER --------
window.addEventListener("keydown", pressEscape);
buttonEvent.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("--is-visible");
}

function closeModal() {
  modal.classList.remove("--is-visible");
}


// --------- FORM VALIDATION --------
endDate.addEventListener("click", displayStartDate);
remind.addEventListener("click", displayRemindEvent);

// Display start date input
function displayStartDate() {
  endDateInput.classList.toggle("--is-hidden");
}

// Display time to remind
function displayRemindEvent() {
  // remindInput.classList.replace("--is-hidden", "--is-visible");
  remindInput.classList.toggle("--is-hidden");
}

// Escape the modal window when pressing Escape
function pressEscape(event) {
  if(event.key === 'Escape') {
    modal.classList.remove("--is-visible");
  }
}