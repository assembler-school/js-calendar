(function initVars() {
    if (localStorage.getItem('calendarEvents') && localStorage.getItem('calendarEvents') !== 'undefined') {
        calendarEvents = JSON.parse(localStorage.getItem('calendarEvents'));
    }
    if (localStorage.getItem('reminders') && localStorage.getItem('reminders') !== 'undefined') {
        reminders = JSON.parse(localStorage.getItem('reminders'));
    }
})();

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
        calendarView = 'month-view';
        event.target.disabled = true;
        document.getElementById("yearView-btn").disabled = false;
        updateTemplate("year-section","main-content-section","month-template");
        calendarMonthConstructor(month,year);
        buttonMonthYearStyle();
    }
});
document.getElementById('yearView-btn').addEventListener("click", (event)=>{
    if(document.querySelector(".main-content-section").firstElementChild.id === "month-section"){
        calendarView = 'year-view';
        event.target.disabled = true;
        document.getElementById("monthView-btn").disabled = false;
        updateTemplate("month-section","main-content-section","year-template");
        calendarConstructor(year);
        buttonMonthYearStyle();
    }
});
addNewTemplate("main-content-section", "month-template");
calendarMonthConstructor(month,year);
hideModal();
initRemindersList();
loadPastRemindersWarningCounter();

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

document.getElementById("endDateCheckboxId").addEventListener('click', (event) => {
    document.querySelector('.labelRequiredEndDate')?.remove();
    if (endDateValidation()) {
        addInputValidationLabel(
            'labelRequiredEndDate',
            'End Date must be greater than Initial Date',
            'endDateId'
        );
    }
    setCheckboxVisibility(event);
});

document.getElementById("reminderCheckboxId").addEventListener('click', (event) => {
    document.querySelector('.labelRequiredReminder')?.remove();
    if (reminderValidation()) {
        addInputValidationLabel(
            'labelRequiredReminder',
            'Reminder alert must be after current date and before initial Date',
            'reminderId'
        );
    }
    setCheckboxVisibility(event);
});

function addInputValidationLabel(labelClass, labelElementMsg, beforeElementId) {
    let labelRequired = document.createElement('label');
    labelRequired.classList.add(labelClass);
    labelRequired.textContent = labelElementMsg;
    document.querySelector('.modalContent').insertBefore(labelRequired, document.getElementById(beforeElementId));
}

document.getElementById("eventTitleId").addEventListener('keyup', (event) => {
    document.querySelector('.labelRequiredTitle')?.remove();
    if (!event.target?.value) {
        addInputValidationLabel(
            'labelRequiredTitle',
            'Event title cannot be empty',
            'eventTitleId'
        );
    }
});

document.getElementById("endDateId").addEventListener('change', () => {
    document.querySelector('.labelRequiredEndDate')?.remove();
    if (endDateValidation()) {
        addInputValidationLabel(
            'labelRequiredEndDate',
            'End Date must be greater than Initial Date',
            'endDateId'
        );
    }
});

document.getElementById("reminderId").addEventListener('change', () => {
    document.querySelector('.labelRequiredReminder')?.remove();
    if (reminderValidation()) {
        addInputValidationLabel(
            'labelRequiredReminder',
            'Reminder alert must be after current date and before initial Date',
            'reminderId'
        );
    }
});

// document.querySelector(".warningBox-btn").addEventListener('click', modalWarningBoxEnters);

function showModalWithDay(id) { //set calendar with selected day
    showModal();
    document.getElementById('initialDateId').value = setValueTime(new Date(id));
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
}

function clearModalContent() {
    document.getElementById('eventTitleId').value = '';
    document.getElementById('initialDateId').value = '';
    document.getElementById('endDateCheckboxId').checked = false;
    document.getElementById('endDateId').value = '';
    document.getElementById('reminderCheckboxId').checked = false;
    document.getElementById('reminderId').value = '';
    document.getElementById('description').value = '';
    document.getElementById('eventTypeSelect').options[0].selected = true;
    document.querySelector('.labelRequiredTitle')?.remove();
    document.querySelector('.labelRequiredInitialDate')?.remove();
    document.querySelector('.labelRequiredEndDate')?.remove();
    document.querySelector('.labelRequiredReminder')?.remove();

}

function hideModal() {
    let modal = document.getElementById("modalDiv");
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.removeAttribute('style');
    currentDateForBlur.removeAttribute('style');
    modal.classList.remove('showUp');
    clearModalContent();
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

function addReminder(eventId, reminderDate, eventTitle, initialDate) {
    reminders[eventId] = {
        'eventTitle': eventTitle,
        'reminderDate': reminderDate,
        'initialDate': initialDate
    };
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function addEventToCalendar(eventParams) {
    let dateId = formatDate(new Date(eventParams.initialDate));
    let validFields = {
        'id': eventParams.id,
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
        addReminder(validFields.id, eventParams.reminderDate, eventParams.eventTitle, eventParams.initialDate);
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
    let eventId = new Date().getTime();
    addEventToCalendar({
        id: eventId,
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
        let extraDays = Math.floor((new Date(endDate).getTime() - new Date(initialDate).getTime())/86400000);
        let initialDateDate = new Date(initialDate);
        for (let i = 0; i < extraDays; i++) {
            initialDateDate.setDate(initialDateDate.getDate() + 1);
            addEventToCalendar({
                id: eventId,
                eventTitle: eventTitle,
                initialDate: setValueTime(initialDateDate),
                endDateChecked: endDateChecked,
                endDate: endDate,
                description: description,
                eventType: eventType
            });
        }
    }
}

function failValidationShake() {
    document.getElementById('saveBtn').classList.add("apply-shake");
    document.getElementById('saveBtn').addEventListener("animationend", (e) => {
        e.target.classList.remove("apply-shake");
    });
}

function saveEvent() {
    if (!document.getElementById('eventTitleId').value) {
        if (!document.querySelector('.labelRequiredTitle')) {
            addInputValidationLabel(
                'labelRequiredTitle',
                'Event title cannot be empty',
                'eventTitleId'
            );
        }
        failValidationShake();
        return false;
    }

    if (endDateValidation()) { // endDate > startDate
        if (!document.querySelector('.labelRequiredEndDate')) {
            addInputValidationLabel(
                'labelRequiredEndDate',
                'End Date must be greater than Initial Date',
                'endDateId'
            );
        }
        failValidationShake();
        return false;
    }
    if (reminderValidation()) { //reminder > currentDate  && reminder < initialDate
        if (!document.querySelector('.labelRequiredReminder')) {
            addInputValidationLabel(
                'labelRequiredReminder',
                'Reminder alert must be after current date and before initial Date',
                'reminderId'
            );
        }
        failValidationShake();
        return false;
    }
    saveEventData();
    initRemindersList();
    hideModal();
    if(calendarView === 'month-view') {
        clearMonthCalendar();
        calendarMonthConstructor(month, year);
    } else if(calendarView === 'year-view') {
        clearYearCalendar()
        calendarConstructor(year);
    }
}

function removeReminder(id) {
    if (reminders[id]) {
        delete reminders[id];
        localStorage.setItem('reminders', JSON.stringify(reminders));
        initRemindersList();
        if (pastRemindersList.length === 0) {
            loadPastRemindersWarningCounter();
        }
    }
}

function removeEvent(id) {
    for(let day in calendarEvents) {
        calendarEvents[day] = calendarEvents[day].filter(event => {
            return event.id !== Number(id);
        });
        if (!calendarEvents[day].length) {
            delete calendarEvents[day];
        }
    }

    document.querySelectorAll(`p[class~="${id}"]`).forEach(e => {e.remove()});
    removeReminder(id);
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
}

