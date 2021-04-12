
// ctes declaration

const modalSection = document.getElementById("modal-section");

const modalOpenButton = document.getElementById("modal-open-button");

const modalCloseButton = document.querySelector(".modal-button.fa-window-close");

const modalCancelButton = document.getElementById("m-cancelBtn");

const modalDivs = document.getElementById("modal-event-div");



// Show de modal event. Open and close it.

    modalOpenButton.onclick = function() {
        modalSection.classList.remove("hidden");
    }

    modalCloseButton.onclick = function() {
        modalSection.classList.add("hidden");
    }

    modalCancelButton.onclick = function() {
        modalSection.classList.add("hidden");
    }

    window.onclick = function(event) {
        if (event.target == modalSection){
            modalSection.classList.add("hidden");
        }
    }
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            modalSection.classList.add("hidden");
        }
    };

    // Display modal event when div has been clicked

for (let div of modalDivs.children) {
    div.addEventListener('click', justFunc);
}
function justFunc(event) {
    modalSection.classList.remove("hidden");
}

// Show or hidden the checkbox info

function showMeTheEndDate(){
    if (document.getElementById("check-box").checked){
        document.getElementById("endDate").removeAttribute("disabled");
    } else{
        document.getElementById("endDate").disabled = true;
    }
}

function showMeTheReminder(){
    if (document.getElementById("check-box-reminder").checked){
        document.getElementById("time").removeAttribute("disabled");
    } else{
        document.getElementById("time").disabled = true;
    }
}

// Match the same day in checkboxes when divs has been clicked

const divsDate = new Date();

const divsActualMonth = divsDate.getMonth() + 1;

const todayDate = divsDate.getDate() + "/" + divsActualMonth + "/" + divsDate.getFullYear();







