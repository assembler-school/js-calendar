const modalBackground = document.getElementById("modal-event-section");
function eventModal (event) {
    event.stopPropagation(); // Needed to prevent execution of parent div
    const eventId = event.target.getAttribute("divEventId");
    const eventTitle = eventsById[eventId].title;
    const eventInitialDate = new Date(eventsById[eventId].startDate);
    const eventEndDate = new Date(eventsById[eventId].endDate);
    let eventReminder;
    if (!!eventsById[eventId].reminder) {
        eventReminder = eventsById[eventId].reminder;
    } else {
        eventReminder = "no";
    }
    const eventType = eventsById[eventId].eventType;
    const eventDescription = eventsById[eventId].description;

    document.querySelector(".modal-event-title > h1").innerText = eventTitle;
    document.getElementById("modal-event-initial-date").innerText = eventInitialDate.toLocaleString();
    document.getElementById("modal-event-end-date").innerText = eventEndDate.toLocaleString();
    document.getElementById("modal-event-reminder").innerText = eventReminder;
    document.getElementById("modal-event-type").innerText = eventType;
    document.getElementById("modal-event-description").innerText = eventDescription;
     //* Adding eventListener to modal
    document.getElementById("modal-event-close-button").addEventListener('click', closeEventModal);
    document.getElementById("modal-event-edit-btn").addEventListener('click', editEventModal);
    //* Showing the modal
    modalBackground.classList.remove("hidden");
}
//* close event modal pressing esc key
window.onkeyup = function (event) {
    let escNow = event.keyCode || event.which;
    if (escNow == 27) {
        modalBackground.classList.add("hidden");
    }
}
//* close event modal clicking outside
window.onclick = function (event) {
    if (event.target == modalBackground) {
        modalBackground.classList.add("hidden");
    }
}


//* Close event modal function
function closeEventModal () {
    //* Remove event listeners
    document.getElementById("modal-event-close-button").removeEventListener('click', closeEventModal);
    document.getElementById("modal-event-edit-btn").removeEventListener('click', editEventModal);
    modalBackground.classList.add("hidden");
}

//* Edit event modal function
function editEventModal () {
    //! TODO has to open normal modal and insert this event values
    closeEventModal();
}
