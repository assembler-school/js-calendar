function modalForDetails(title, initialDate, endDate, reminderDate, eventDescription, typeOfEvent, id) {
    if(document.getElementById("alert-container")) return;

    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.style.filter = 'blur(5px)';
    currentDateForBlur.style.filter = 'blur(5px)';

    let alertContainer = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    alertContainer.id = "alert-container";

    let modDetailsContent = alertContainer.appendChild(document.createElement('div'));
    modDetailsContent.id = "details-content";
    modDetailsContent.style.visiblity="visible";

    let titleOfEventTxt = modDetailsContent.appendChild(document.createElement("h1"));
    titleOfEventTxt.classList.add('title-event')
    titleOfEventTxt.innerHTML = title;

    let detailsDiv = modDetailsContent.appendChild(document.createElement("div"));
    detailsDiv.classList.add('details-container')

    let div1 = detailsDiv.appendChild(document.createElement("div"));
    let labelInit = div1.appendChild(document.createElement('h4'));
    labelInit.classList.add('label-for-details');
    labelInit.innerText = 'Starts:';
    let initDateTxt = div1.appendChild(document.createElement('h3'));
    initDateTxt.classList.add('detailed-event');
    initDateTxt.textContent = initialDate;

    if (endDate !== undefined) {
        let div2 = detailsDiv.appendChild(document.createElement("div"));
        let labelEnd = div2.appendChild(document.createElement('h4'));
        labelEnd.classList.add('label-for-details');
        labelEnd.innerText = 'Ends:';
        let endDateTxt = div2.appendChild(document.createElement('h3'));
        endDateTxt.classList.add('detailed-event');
        endDateTxt.textContent = endDate;
    }

    if (reminderDate !== undefined) {
        let div3 = detailsDiv.appendChild(document.createElement("div"));
        let labelRemind = div3.appendChild(document.createElement('h4'));
        labelRemind.classList.add('label-for-details');
        labelRemind.innerText = 'Alerts:';
        let remindDateTxt = div3.appendChild(document.createElement('h3'));
        remindDateTxt.classList.add('detailed-event');
        remindDateTxt.textContent = reminderDate;
    }

    if (typeOfEvent !== undefined) {
        let div4 = detailsDiv.appendChild(document.createElement("div"));
        let labelType = div4.appendChild(document.createElement('h4'));
        labelType.classList.add('label-for-details');
        labelType.innerText = 'Type of event:';
        let typeOfEventTxt = div4.appendChild(document.createElement('h3'));
        typeOfEventTxt.classList.add('detailed-event');
        typeOfEventTxt.textContent = typeOfEvent;
    }

    if (eventDescription !== '') {
        let div5 = detailsDiv.appendChild(document.createElement("div"));
        let labelDescrip = div5.appendChild(document.createElement('h4'));
        labelDescrip.classList.add('label-for-details');
        labelDescrip.innerText = 'Description:';
        let eventDescriptionTxt = div5.appendChild(document.createElement('h3'));
        eventDescriptionTxt.classList.add('detailed-event');
        eventDescriptionTxt.textContent = eventDescription;
    }

    let div6 = detailsDiv.appendChild(document.createElement("div"));
    div6.classList.add('div-for-btns')
    let rmvBtn = div6.appendChild(document.createElement("button"));
    rmvBtn.classList.add('remove-btn')
    let okBtn = div6.appendChild(document.createElement("button"));
    okBtn.classList.add('ok-btn')
    rmvBtn.innerHTML = 'Delete event'
    rmvBtn.onclick = function() {
        removeEvent(id)
        removeCustomAlert()
    }
    okBtn.innerHTML = 'Ok'
    okBtn.onclick = removeCustomAlert;
    document.querySelector('#alert-container').addEventListener('click', removeCustomAlert);
    document.querySelector('#details-content').addEventListener('click', e => e.stopPropagation());
}

function modalForReminders(title, initialDate, id) {
    if(document.getElementById("alert-reminder-container")) return;

    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.style.filter = 'blur(5px)';
    currentDateForBlur.style.filter = 'blur(5px)';

    let alertContainer = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    alertContainer.id = "alert-reminder-container";

    let modDetailsContent = alertContainer.appendChild(document.createElement('div'));
    modDetailsContent.id = "details-reminder-content";
    modDetailsContent.style.visiblity="visible";

    let reminderHeader = modDetailsContent.appendChild(document.createElement("h1"));
    reminderHeader.classList.add('reminder-header');
    reminderHeader.innerHTML = 'Hey! remember:';

    let detailsDiv = modDetailsContent.appendChild(document.createElement("div"));
    detailsDiv.classList.add('details-reminder-container');

    let titleOfEventTxt = detailsDiv.appendChild(document.createElement("h1"));
    titleOfEventTxt.classList.add('title-event');
    titleOfEventTxt.innerHTML = title;

    let div1 = detailsDiv.appendChild(document.createElement("div"));
    let labelInit = div1.appendChild(document.createElement('h4'));
    labelInit.classList.add('label-for-details');
    labelInit.innerText = 'Starts:';
    let initDateTxt = div1.appendChild(document.createElement('h3'));
    initDateTxt.classList.add('detailed-event');
    initDateTxt.textContent = initialDate;

    let div6 = detailsDiv.appendChild(document.createElement("div"));
    div6.classList.add('div-for-reminder-btn');
    let rmvBtn = div6.appendChild(document.createElement("button"));
    rmvBtn.classList.add('remove-btn');
    rmvBtn.innerHTML = 'Delete reminder';
    rmvBtn.onclick = function() {
        removeReminder(id);
        removeCustomReminderAlert();
    }
    let okBtn = div6.appendChild(document.createElement("button"));
    okBtn.classList.add('ok-reminder-btn');
    okBtn.innerHTML = 'Got it!';
    okBtn.onclick = removeCustomReminderAlert;
    document.querySelector('#alert-reminder-container').addEventListener('click', removeCustomReminderAlert);
    document.querySelector('#details-reminder-content').addEventListener('click', e => e.stopPropagation());
}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("alert-container"));
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.removeAttribute('style');
    currentDateForBlur.removeAttribute('style');
}

function removeCustomReminderAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("alert-reminder-container"));
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.removeAttribute('style');
    currentDateForBlur.removeAttribute('style');
}

function modalWarningBoxEnters(event) {
    //let warningBox = document.querySelector('.warningBox-btn');
    let warningBox = event.target
    warningBox.innerHTML = '';
    warningBox.style.transition = '0.2s ease-in';
    warningBox.classList.toggle("past-reminders-container");//changes heigth and width inits transition
    for (let reminder of pastRemindersList){
        let displayedReminder = document.createElement("p");
        displayedReminder.classList.add("warning-reminder-text");
        warningBox.appendChild(displayedReminder);
        displayedReminder.appendChild(document.createTextNode(reminder.eventTitle + ': ' + reminder.reminderDate));
        displayedReminder.id = reminder.id;
        displayedReminder.addEventListener('click', modalForWarningBoxReminders);
    }
    warningBox.removeEventListener('click', modalWarningBoxEnters);
    warningBox.addEventListener('focusout', modalWarningBoxLeaves);
}

function modalWarningBoxLeaves() {
    let warningBox = document.querySelector('.warningBox-btn');
    warningBox.style.transition = 'none';
    warningBox.removeEventListener('focusout', modalWarningBoxLeaves);
    warningBox.classList.toggle("past-reminders-container");//changes heigth and width inits transition
    loadPastRemindersWarningCounter();
    warningBox.addEventListener('click', modalWarningBoxEnters);

}

function modalForWarningBoxReminders(event){
    let displayedReminder = pastRemindersList.filter(reminder => reminder.id === event.target.id)[0];
    modalForReminders(displayedReminder.eventTitle, displayedReminder.initialDate, displayedReminder.id);
}