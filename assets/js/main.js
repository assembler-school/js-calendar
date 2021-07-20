// ----------- VARIABLES --------
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector("#modal");
let modalClose = document.querySelector("#button-close");

// --------- EVENT LISTENER --------

buttonEvent.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("modal--is-visible");
}

function closeModal() {
  modal.classList.remove("modal--is-visible");
}
