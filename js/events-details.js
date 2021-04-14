// Display the event's details when click on it --------------------
function loadListennersForDetails() {
    let elementEvent = document.querySelectorAll('.event-text');
    elementEvent.forEach(element => {
        element.addEventListener('click', function() {
            let eventId = element.getAttribute('class');
            eventId = eventId.split(' ')[1];
            let dateId = element.parentNode.parentNode.children[0].getAttribute('id');
            displayDetailsOfEvent(eventId, dateId);
        })});
}

function displayDetailsOfEvent(eventId, dateId) {
        for (let i = 0; i < calendarEvents[dateId].length; i++) {
            if (calendarEvents[dateId][i].id == eventId) {
                let titleText = calendarEvents[dateId][i].eventTitle;
                let initialDateText = calendarEvents[dateId][i].initialDate.split('T');
                initialDateText = `${initialDateText[0]} ${initialDateText[1]}`
                let endDateText;
                if (calendarEvents[dateId][i].endDate !== undefined) {
                    endDateText = calendarEvents[dateId][i].endDate.split('T');
                    endDateText = `${endDateText[0]} ${endDateText[1]}`
                }  
                let descriptionText = calendarEvents[dateId][i].description;
                let eventTypeText = calendarEvents[dateId][i].eventType;
                let reminderDateText
                if (calendarEvents[dateId][i].reminderDate !== undefined) {
                    reminderDateText = calendarEvents[dateId][i].reminderDate.split('T');
                    reminderDateText = `${reminderDateText[0]} ${reminderDateText[1]}`
                }
                modalForDetails(titleText, initialDateText, endDateText, reminderDateText, descriptionText, eventTypeText, eventId)
            }
        }
}