

function addNewTemplate(containerId, templateId) {
    const templateContent = document.querySelector(`#${templateId}`).content;
    document.getElementById(containerId).appendChild(document.importNode(templateContent, true));
}

function updateTemplate(previousStep, containerId, templateId) {
    document.getElementById(previousStep)?.remove();
    addNewTemplate(containerId, templateId);
}

document.getElementById('monthView-btn').addEventListener("click", (event)=>{
    if(document.querySelector(".main-content-section").firstElementChild.id === "year-section"){
        event.target.disabled=true;
        document.getElementById("yearView-btn").disabled=false;
        updateTemplate("year-section","main-content-section","month-template");
        calendarMonthConstructor();
        //Calendar view
        calendarView = 'month-view';
    }
});
document.getElementById('yearView-btn').addEventListener("click", (event)=>{
    if(document.querySelector(".main-content-section").firstElementChild.id === "month-section"){
        event.target.disabled=true;
        document.getElementById("monthView-btn").disabled=false;
        updateTemplate("month-section","main-content-section","year-template");
        calendarConstructor();
        //Calendar view
        calendarView = 'year-view';
    }
});
addNewTemplate("main-content-section", "month-template");
calendarMonthConstructor()


hideModal();

function setCheckboxVisibility(event) {
    let id = event.target.id.replace('Checkbox', '');
    document.getElementById(id).disabled = !event.target.checked;
}
document.getElementById("createEventBtn").addEventListener("click", () => {
    showModal();
    document.getElementById('initialDateId').value = setValueTime();
});
document.getElementById("cancelBtn").addEventListener('click', hideModal);
document.getElementById("saveBtn").addEventListener('click', saveEvent);
document.querySelector('.modalOut').addEventListener('click', hideModal);

document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.showUp")) {
        hideModal();
    }
});

document.getElementById("endDateCheckboxId").addEventListener('click', setCheckboxVisibility);
document.getElementById("reminderCheckboxId").addEventListener('click', setCheckboxVisibility);

function showModalWithDay() { //set calendar with selected day
    showModal();
    document.getElementById('initialDateId').value = setValueTime(); // falta recibir el dia por parametros de la funcion y settearlo
}

function setValueTime(date = new Date()) {
    return date.toLocaleString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).replace(" ", "T");
}

function showModal() {
    let modal = document.getElementById("modalDiv");
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.style.filter = 'blur(5px)';
    currentDateForBlur.style.filter = 'blur(5px)';
    modal.classList.add('showUp');
    document.getElementById('initialDateId').setAttribute('min', setValueTime());
}

function hideModal() {
    let modal = document.getElementById("modalDiv");
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.removeAttribute('style');
    currentDateForBlur.removeAttribute('style');
    modal.classList.remove('showUp')
    modal.classList.remove('showUp');
}

function endDateValidation() {
    return document.getElementById('endDateCheckboxId').checked
        && (document.getElementById('endDateId').value < document.getElementById('initialDateId').value);
}

function isReminderDateLesserThanInitialDate() {
    return document.getElementById('initialDateId').value > document.getElementById('reminderId').value;
}

function isReminderGreaterThanCurrentDate() {
    return setValueTime() < document.getElementById('reminderId').value;
}

function reminderValidation() {
    return document.getElementById('reminderCheckboxId').checked
        && (!isReminderGreaterThanCurrentDate() || !isReminderDateLesserThanInitialDate());
}

function formatDate(date) {
    return date.toLocaleDateString('en-ZA'); //format YYYY/MM/DD
}

function addReminder(reminderDate, eventTitle, initialDate) {
    let reminderId = new Date().getTime();
    reminders[reminderId] = {
        'eventTitle': eventTitle,
        'reminderDate': reminderDate,
        'initialDate': initialDate
    };
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function addEventToCalendar(eventParams) {
    let dateId = formatDate(new Date(eventParams.initialDate));
    let validFields = {
        'eventTitle': eventParams.eventTitle,
        'initialDate': eventParams.initialDate,
        'description': eventParams.description,
        'eventType': eventParams.eventType
    };

    if (eventParams.endDateChecked) {
        validFields['endDate'] = eventParams.endDate;
    }
    if (eventParams.reminderChecked) {
        validFields['reminderDate'] = eventParams.reminderDate;
        addReminder(eventParams.reminderDate, eventParams.eventTitle, eventParams.initialDate);
    }
    if (!calendarEvents.hasOwnProperty(dateId)) {
        calendarEvents[dateId] = [];
    }
    calendarEvents[dateId].push(validFields);
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
}

function saveEventData() {
    let eventTitle =  document.getElementById('eventTitleId').value;
    let initialDate = document.getElementById('initialDateId').value;
    let endDateChecked = document.getElementById('endDateCheckboxId').checked;
    let endDate = document.getElementById('endDateId').value;
    let reminderChecked = document.getElementById('reminderCheckboxId').checked;
    let reminderDate = document.getElementById('reminderId').value;
    let description = document.getElementById('description').value;
    let eventType = document.getElementById('eventTypeSelect').value;
    //añadir reminder solo al primer dia si dura varios dias el evento
    addEventToCalendar({
        eventTitle: eventTitle,
        initialDate: initialDate,
        endDateChecked: endDateChecked,
        endDate: endDate,
        reminderChecked: reminderChecked,
        reminderDate: reminderDate,
        description: description,
        eventType: eventType
    });

    if (endDateChecked) {
        let extraDays = (new Date(endDate).getTime() - new Date(initialDate).getTime())/86400000;
        let initialDateDate = new Date(initialDate);
        for (let i = 0; i < extraDays; i++) {
            initialDateDate.setDate(initialDateDate.getDate() + 1);
            addEventToCalendar({
                eventTitle: eventTitle,
                initialDate: initialDateDate,
                endDateChecked: endDateChecked,
                endDate: endDate,
                description: description,
                eventType: eventType
            });
        }
    }
}

function saveEvent() {
    if (!document.getElementById('eventTitleId').value) {
        alert('The event tittle is required.')
        return false;
    }

    if (endDateValidation()) { // endDate > startDate
        alert('The start date must be before the end date.')
        return false;
    }
    if (reminderValidation()) { //reminder > currentDate  && reminder < initialDate
        alert('Reminder alert must be after current date and before initial date')
        return false;
    }
    saveEventData();//save data
}