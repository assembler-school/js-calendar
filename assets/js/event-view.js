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


    // 
    let viewModelDate = '';
    if (finalDate === '') {
      viewModelDate = `${initialDate}`
    } else {
      viewModelDate = `${initialDate} - ${finalDate}`  
    }
    

    container.innerHTML = `
    <div id="modal-view" class="modal-view">
      <div class="modal-view-inner">
          
          <div class="modal-view-options row right-top">
            <div id="trash-bin-current">&#128465;</div>
            <div id="edit-event">&#128393;</div>
            <div id="close-modal-view">⨯</div>  
          </div>
          
          <div class="row"><h4>${title}</h4></div>
          <div class="row"><p>${viewModelDate}</p></div>
          <div class="row"><p>${description}</p></div>
          <div class="row"><p class="${type}">${type}</p></div>      
      </div>
    </div>
  `;

    // Delete Event
    document.getElementById("trash-bin-current").addEventListener("click", () => {
      deleteEventById(data)
      container.innerHTML = '';
    });

    // Edit event
    document.getElementById("edit-event").addEventListener("click", () => {
      displayModal("editEvent", data)
      container.innerHTML = '';
    });

    // Close modal
    document.getElementById("close-modal-view").addEventListener("click", () => {
      container.innerHTML = '';
    });
    document.getElementById("modal-view").addEventListener("click", () => {
      container.innerHTML = '';
    });

}

function convertDate(date) {
    return new Date(date).toLocaleString("en", {
        month: "long",
        year: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export { renderEventView, convertDate };