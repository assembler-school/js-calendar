

// ctes declaration

const createEventBtn = document.getElementById("m-createBtn");

const modalSection = document.getElementById("modal-section");

const modalOpenButton = document.getElementById("modal-open-button");

const modalCloseButton = document.querySelector(".modal-button.fa-window-close");

const modalCancelButton = document.getElementById("m-cancelBtn");

const modalSectionEvent = document.getElementById("modal-event-section");

const modalContent = document.getElementById("modal-content");


function justFunc(event) {
    modalSection.classList.remove("hidden");
    var divsDate = new Date();
    var divsActualMonth = date.getMonth() + 1;
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
    
    document.querySelector(".modal-button.fa-window-close").addEventListener("click", closeFirstModal);
    document.getElementById("m-cancelBtn").addEventListener("click", closeFirstModal);
    document.getElementById("m-createBtn").addEventListener("click", closeFirstModal);
    modalSection.addEventListener("click", closeFirstModal);
    modalContent.addEventListener("click", modalStopPropagation);
};

function modalStopPropagation(event){
    event.stopPropagation();
}

function addEachListener (event) {
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
    modalSection.classList.remove("hidden");
    var divsDate = new Date();
    var divsActualMonth = divsDate.getMonth() + 1;
    var todayDate = divsDate.getDate()
    var todayYear = divsDate.getFullYear();
    var todayHour = divsDate.getHours();
    var todayMinutes = divsDate.getMinutes();

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
}


function closeFirstModal(){
    document.querySelector(".modal-button.fa-window-close").removeEventListener("click", closeFirstModal);
    document.getElementById("m-cancelBtn").removeEventListener("click", closeFirstModal);
    document.getElementById("m-createBtn").removeEventListener("click", closeFirstModal);
    modalSection.removeEventListener("click", closeFirstModal);
    modalContent.removeEventListener("click", modalStopPropagation);
    modalSection.classList.add("hidden");
    document.getElementById("form").reset();
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
        document.getElementById("endDate").removeAttribute("disabled");
    } else{
        document.getElementById("endDate").disabled = true;
        document.getElementById("endDate").classList.remove("incorrect");
    }
}

function showMeTheReminder(){
    if (document.getElementById("check-box-reminder").checked){
        document.getElementById("time").removeAttribute("disabled");
    } else{
        document.getElementById("time").disabled = true;
    }
}








