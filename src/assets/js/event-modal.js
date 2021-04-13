
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
    //* constants in use
    const modalBackground = document.getElementById("modal-event-section");
     //* Adding eventListener to modal
    document.getElementById("modal-event-close-button").addEventListener('click', closeEventModal);
    document.getElementById("modal-event-edit-btn").addEventListener('click', editEventModal);
    //* Showing the modal
    modalBackground.classList.remove("hidden");
}


//* Close event modal function
function closeEventModal () {
    const modalBackground = document.getElementById("modal-event-section");
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
