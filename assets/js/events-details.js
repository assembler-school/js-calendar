// Display the event's details when click on it 
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
                let initialDateText = calendarEvents[dateId][i].initialDate;
                initialDateText = new Date(initialDateText).toLocaleString('en-UK', optDate);
                let endDateText;
                if (calendarEvents[dateId][i].endDate !== undefined) {
                    endDateText = calendarEvents[dateId][i].endDate;
                    endDateText = new Date(endDateText).toLocaleString('en-UK', optDate);
                }  
                let descriptionText = calendarEvents[dateId][i].description;
                let eventTypeText;
                if (calendarEvents[dateId][i].eventType === 'event-type-2') {
                    eventTypeText = 'Personal';
                }   else if (calendarEvents[dateId][i].eventType === 'event-type-3') {
                    eventTypeText = 'Work';
                }   else if (calendarEvents[dateId][i].eventType === 'event-type-4') {
                    eventTypeText = 'Sport';
                }
                let reminderDateText
                if (calendarEvents[dateId][i].reminderDate !== undefined) {
                    reminderDateText = calendarEvents[dateId][i].reminderDate;
                    reminderDateText = new Date(reminderDateText).toLocaleString('en-UK', optDate);
                }
                modalForDetails(titleText, initialDateText, endDateText, reminderDateText, descriptionText, eventTypeText, eventId)
            }
        }
}