/* IMPORT */
import { renderAddEventForm } from "./event-form.js";
import { renderEventView } from "./event-view.js";
/* GET ELEMENTS OF THE DOM */

const ADDBUTTON = document.getElementById("plus-btn");
const MODALWINDOW = document.getElementById("modal-window");

ADDBUTTON.addEventListener("click", () => displayModal("addEvent", new Date()));

function displayModal(type, dataset) {
  MODALWINDOW.innerHTML = ""; // First we clean our modal

  if (type === "addEvent") {
    // If we want to display our box for new events - Function Add Event
    renderAddEventForm(dataset, false);
  } else if (type === "editEvent") {
    // If we want to display our box for editing events - Function Edit Event
    renderAddEventForm(dataset, true);
  } else if (type === "viewEvent") {
    // To display event details
    renderEventView(dataset)
  }

}

function closeModal() {
  MODALWINDOW.innerHTML = "";
  document.removeEventListener("keydown", escapeEventListener);
}

function escapeEventListener(e) {
  // Closing by pressing Escape
  if (e.key === "Escape") closeModal();
}

/* EXPORT */

export { displayModal, closeModal, MODALWINDOW, escapeEventListener };
