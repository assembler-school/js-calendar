
/*! This function is to be executed each time someone click on an event
TODO associate eventListener
*/

function eventModal (event) {
    event.stopPropagation(); // Needed to prevent execution of parent div
    /* 
    TODO Here it has to include some code to get the information from localStorage 
    */
    /* 
    TODO it has to load the data inside the modal
   */
    //* constants in use
    const modalBackground = document.getElementById("modal-event-section");
    const initialDate = document.getElementById("modal-event-initial-date");
    const endDate = document.getElementById("modal-event-end-date");
    const reminder = document.getElementById("modal-event-reminder");
    const eventType = document.getElementById("modal-event-type");
    const description = document.getElementById("modal-event-description");

     //* Adding eventListener to modal
    document.getElementById("modal-event-close-button").addEventListener('click', closeEventModal);
    document.getElementById("modal-event-edit-btn").addEventListener('click', editEventModal);
    //* Adding content to modal
    //TODO
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
// ! Function to add a mock event

function addEventTesting () {
    const daysContainer = document.getElementById("modal-event-div").children;
    let newEvent = document.createElement("div");
    newEvent.classList.add("event-in-calendar");
    newEvent.classList.add("blue-event");
    newEvent.innerHTML = "Evento Prueba";
    newEvent.addEventListener('click', eventModal);
    daysContainer[5].appendChild(newEvent);
    const allEvents = document.querySelectorAll(".event-in-calendar");
    
    /*
    ! This code may be usable for later
    for (let event of allEvents) {
        event.addEventListener('click', eventModal);
    } */
}
addEventTesting();