import { deleteEventById, renderAddEventForm } from "./event-form.js";
import { displayModal } from "./modal.js";

function renderEventView(data) {
    let container = document.getElementById("summary-current");

    let currentEvent = JSON.parse(window.localStorage.getItem(data))[0];

    let title = "";
    let description = "";
    let initialDate = "";
    let finalDate = "";
    let reminder = "";
    let type = "";

    // Get all event info
    for (const key in currentEvent) {
        if (key === "titleEvent") title = currentEvent[key];
        if (key === "descriptionEvent") description = currentEvent[key];
        if (key === "initialDate") initialDate = currentEvent[key];
        if (key === "finalDate") finalDate = currentEvent[key];
        if (key === "remiderEvent") reminder = currentEvent[key];
        if (key === "eventType") type = currentEvent[key];
    }

    // Parse dates
    if (initialDate != "") {
        initialDate = convertDate(initialDate);
    }

    if (finalDate != "") {
        finalDate = convertDate(finalDate);
    }

    container.innerHTML = `
    <div id="currentViewEvent">
      <div id="trash-bin-current">&#128465;</div>
      <div id="edit-event">&#128393;</div>
      <div><h4>${title}</h4></div>
      <div><p>${initialDate} - ${finalDate}</p></div>
      <div><p>${description}</p></div>

      <div><p>${reminder}</p></div>
      <div><p>${type}</p></div>
    </div>
  `;

    // Delete Event
    let trashIcon = document.getElementById("trash-bin-current");
    trashIcon.addEventListener("click", () => deleteEventById(data));

    // Edit event
    document
        .getElementById("edit-event")
        .addEventListener("click", () => displayModal("editEvent", data));
}

function convertDate(date) {
    return new Date(date).toLocaleString("en", {
        month: "long",
        year: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export { renderEventView, convertDate };