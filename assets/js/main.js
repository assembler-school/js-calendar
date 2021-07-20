// ----------- VARIABLES --------
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector("#modal");

// --------- EVENT LISTENERS FOR EVENT BUTTON & MODAL --------

buttonEvent.addEventListener("click", openModal);

function openModal() {
  modal.classList.add("modal--is-visible");
}

let modalClose = document.querySelector("#button-close");
modalClose.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("modal--is-visible");
}
// _______OPEN & CLOSE ___________
