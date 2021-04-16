const modalBackground = document.getElementById("modal-event-section");
const modalEventContent = document.getElementById("modal-event-content");
function eventModal (event) {
    disabledArrowKeys();
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
    let deleteEventBtn = document.getElementById("modal-event-edit-btn");
    deleteEventBtn.addEventListener('click', deleteEvent);
    deleteEventBtn.setAttribute("deletingEventId", eventId);
    document.getElementById("modal-event-edit-btn").addEventListener('click', deleteEvent);
    modalBackground.addEventListener("click", closeEventModal);
    modalEventContent.addEventListener("click", modalEventStopPropagation);
    //* Showing the modal
    modalBackground.classList.remove("hidden");
}

function modalEventStopPropagation(event){
    event.stopPropagation();
}

//* close event modal pressing esc key

window.addEventListener("keyup", closeEscEventOut);

function closeEscEventOut(event){
    const escEventNow = event.keyCode || event.which;
    if (escEventNow == 27){
        closeEventModal();  
    }
}

//* Close event modal function
function closeEventModal () {
    //* Remove event listeners
    document.getElementById("modal-event-close-button").removeEventListener('click', closeEventModal);
    modalBackground.removeEventListener("click", closeEventModal);
    modalEventContent.removeEventListener("click", modalEventStopPropagation);
    modalBackground.classList.add("hidden");
    document.getElementById("modal-event-edit-btn").removeEventListener('click', deleteEvent);
    enableArrowKeys();
}

//* Edit event modal function
function editEventModal () {
    //! TODO has to open normal modal and insert this event values
    closeEventModal();
}

function deleteEventDatesData (data, storageIndex) {
    for (const date in data) {
        data[date] = data[date].filter(event => {
            return event !== parseInt(eventId);
        });
        if (!data[date].length) {
            delete data[date];
        }
    }
    localStorage.setItem(storageIndex, JSON.stringify(data));
}

function deleteEvent (deletingEvent) {
    eventId = deletingEvent.target.getAttribute("deletingEventId");
    delete eventsById[eventId];
    localStorage.setItem("eventsById", JSON.stringify(eventsById));
    deleteEventDatesData(eventsByDate, 'eventsByDate');
    deleteEventDatesData(remindersByDate, 'remindersByDate');
    closeEventModal();
    renderCalendar('');
}