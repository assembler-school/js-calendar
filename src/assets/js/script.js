

// ctes declaration

const createEventBtn = document.getElementById("m-createBtn");
const modalSection = document.getElementById("modal-section");
const modalOpenButton = document.getElementById("modal-open-button");
const modalCloseButton = document.querySelector(".modal-button.fa-window-close");
const modalCancelButton = document.getElementById("m-cancelBtn");
const modalSectionEvent = document.getElementById("modal-event-section");
const modalContent = document.getElementById("modal-content");


function justFunc(event) {
    disabledArrowKeys();
    let divsDate = new Date();
    let divsActualMonth;
    if (event.target.classList.contains('current-month-day')) {
        divsActualMonth = date.getMonth() + 1;
    } else if (event.target.classList.contains('prev-date')) {
        divsActualMonth = date.getMonth();
    } else if (event.target.classList.contains('next-date')) {
        divsActualMonth = date.getMonth() + 2;
    }
    var todayHour = divsDate.getHours();
    var todayMinutes = divsDate.getMinutes();
    var todayDate = event.target.firstChild.textContent;
    if (todayDate < 10)
    todayDate ='0' + todayDate;
    if (todayHour < 10)
    todayHour = "0" + todayHour;
    if (todayMinutes < 10)
    todayMinutes  = "0" + todayMinutes;
    if (divsActualMonth < 10)
    divsActualMonth ='0' + divsActualMonth;
    document.getElementById("initialDate").value =
    `${date.getFullYear()}-${divsActualMonth}-${todayDate}T${todayHour}:${todayMinutes}`;
    modalSection.classList.remove("hidden");
    document.querySelector(".modal-button.fa-window-close").addEventListener("click", closeFirstModal);
    document.getElementById("m-cancelBtn").addEventListener("click", closeFirstModal);
    document.getElementById("m-createBtn").addEventListener("click", closeFirstModal);
    modalSection.addEventListener("click", closeFirstModal);
    modalContent.addEventListener("click", modalStopPropagation);
    document.getElementById("title").focus();
};

function modalStopPropagation(event){
    event.stopPropagation();
}

function addEachListener () {
    for (let div of modalDivs.children) {
        div.addEventListener('click', justFunc);
    }
}

function removeEachListener() {
    for (let div of modalDivs.children) {
        div.removeEventListener('click', justFunc);
    }
}

// Show de modal event. Open and close it.

modalOpenButton.onclick = function() {
    disabledArrowKeys();
    modalSection.classList.remove("hidden");
    var divsDate = new Date();
    var divsActualMonth = divsDate.getMonth() + 1;
    var todayDate = divsDate.getDate()
    var todayYear = divsDate.getFullYear();
    var todayHour = divsDate.getHours();
    var todayMinutes = divsDate.getMinutes();
    document.getElementById("title").focus();

    if (todayDate < 10)
        todayDate ='0' + todayDate;
    if (todayHour < 10)
        todayHour = "0" + todayHour;
    if (todayMinutes < 10)
        todayMinutes  = "0" + todayMinutes;
    if (divsActualMonth < 10)
        divsActualMonth ='0' + divsActualMonth;
    document.getElementById("initialDate").value = `${todayYear}-${divsActualMonth}-${todayDate}T${todayHour}:${todayMinutes}`;
    document.querySelector(".modal-button.fa-window-close").addEventListener("click", closeFirstModal);
    document.getElementById("m-cancelBtn").addEventListener("click", closeFirstModal);
    document.getElementById("m-createBtn").addEventListener("click", closeFirstModal);
    modalSection.addEventListener("click", closeFirstModal);
    modalContent.addEventListener("click", modalStopPropagation);
    document.getElementById("title").focus();
}
/*
modalCloseButton.onclick = function() {
    modalSection.classList.add("hidden");
    document.getElementById("form").reset();
    enableArrowKeys();
}
*/
function closeFirstModal(){
    document.querySelector(".modal-button.fa-window-close").removeEventListener("click", closeFirstModal);
    document.getElementById("m-cancelBtn").removeEventListener("click", closeFirstModal);
    document.getElementById("m-createBtn").removeEventListener("click", closeFirstModal);
    modalSection.removeEventListener("click", closeFirstModal);
    modalContent.removeEventListener("click", modalStopPropagation);
    modalSection.classList.add("hidden");
    document.getElementById("form").reset();
    enableArrowKeys();
    if (!document.getElementById("EndDateModal").classList.contains("modal-inputDisabled")){
        document.getElementById("EndDateModal").classList.add("modal-inputDisabled");
    }
    if (!document.getElementById("modal-input-time").classList.contains("modal-inputDisabled")){
        document.getElementById("modal-input-time").classList.add("modal-inputDisabled");
    }
    document.getElementById("m-createBtn").disabled = true;
    createButton.style.opacity = 0.5;
}

window.addEventListener("keyup", closeEscOut);

function closeEscOut(event){
    const escNow = event.keyCode || event.which;
    if (escNow == 27){
        closeFirstModal();
    }
}

// Show or hidden the checkbox info

function showMeTheEndDate(){
    if (document.getElementById("check-box-end-date").checked){
        document.getElementById('EndDateModal').classList.remove('modal-inputDisabled');
        document.getElementById("endDate").value = document.getElementById("initialDate").value;
    } else{
        document.getElementById('EndDateModal').classList.add('modal-inputDisabled');
        document.getElementById("endDate").classList.remove("incorrect");
    }
}

function showMeTheReminder(){
    if (document.getElementById("check-box-reminder").checked){
        document.getElementById("modal-input-time").classList.remove('modal-inputDisabled');
    } else{
        document.getElementById("modal-input-time").classList.add('modal-inputDisabled');
    }
}








