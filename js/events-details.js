// Display the event's details when click on it --------------------

let elementEvent = document.querySelectorAll('.event-text');
elementEvent.forEach(element => {
    element.addEventListener('click', function() {
        let eventId = element.getAttribute('class');
        eventId = eventId.split(' ')[0];
        let dateId = element.parentNode.children[0].getAttribute('id');
        displayDetailsOfEvent(eventId, dateId);
    })});

function displayDetailsOfEvent(eventId, dateId) {
        for (let i = 0; i < calendarEvents[dateId].length; i++) {
            if (calendarEvents[dateId][i].id == eventId) {
                let titleText = calendarEvents[dateId][i].eventTitle;
                let initialDateText = calendarEvents[dateId][i].initialDate;
                let endDateText
                if (calendarEvents[dateId][i].endDate !== undefined) {
                    endDateText = calendarEvents[dateId][i].endDate;
                } else {
                    endDateText = '-';
                }
                let descriptionText = calendarEvents[dateId][i].description;
                let eventTypeText = calendarEvents[dateId][i].eventType;
                let reminderDateText
                if (calendarEvents[dateId][i].reminderDate !== undefined) {
                    reminderDateText = calendarEvents[dateId][i].reminderDate;
                } else {
                    reminderDateText = '-';
                }
                alert(`Title: ${titleText},
Initial date: ${initialDateText},
End date: ${endDateText},
Reminder: ${reminderDateText},
Description: ${descriptionText},
Type of event: ${eventTypeText}`)
            }
        }
}

function removeThisEvent(element) {
    element.remove();
}