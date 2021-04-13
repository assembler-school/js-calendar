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
        displayEventsInMonth(currentMonthDisplay, eventsCalendar);
        //Calendar view
        calendarView = 'month-view';
        console.log(calendarView);
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
        console.log(calendarView);
    }
});
addNewTemplate("main-content-section", "month-template");

hideModal();
document.getElementById("createEventBtn").addEventListener("click", showModal);
document.getElementById("cancelBtn").addEventListener('click', hideModal);
document.getElementById("saveBtn").addEventListener('click', saveEvent);

document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.showUp")) {
        hideModal();
    }
});

document.getElementById("endDateCheckboxId").addEventListener('click', setCheckboxVisibility);
document.getElementById("reminderCheckboxId").addEventListener('click', setCheckboxVisibility);

function showModalWithDay() {
    //set calendar with selected day
    showModal();
}

function showModal() {
    let modal = document.getElementById("modalDiv");
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.style.filter = 'blur(5px)';
    currentDateForBlur.style.filter = 'blur(5px)';
    modal.classList.add('showUp');
}

function hideModal() {
    let modal = document.getElementById("modalDiv");
    let mainContentForBlur = document.querySelector('#main-content-section');
    let currentDateForBlur = document.querySelector('.currentDate-section');
    mainContentForBlur.removeAttribute('style');
    currentDateForBlur.removeAttribute('style');
    modal.classList.remove('showUp')
}

function saveEvent() {

    // reminder -> currentDate y EndDate
    // endDate > startDate


}

function setCheckboxVisibility(event) {
    let id = event.target.id.replace('Checkbox', '');
    document.getElementById(id).disabled = !event.target.checked;
}