
// ctes declaration

const modalSection = document.getElementById("modal-section");

const modalOpenButton = document.getElementById("modal-open-button");

const modalCloseButton = document.getElementById("modal-close-button");

//const modalCancelButton = document.getElementById("");

const modalDivs = document.getElementById("modal-event-div");



// Show de modal event. Open and close it.

    modalOpenButton.onclick = function() {
        modalSection.style.display = "block";
    }

    modalCloseButton.onclick = function() {
        modalSection.style.display = "none";
    }

   /* modalCancelButton.onclick = function() {
        modalSection.style.display = "none";
    } */

    window.onclick = function(event) {
        if (event.target == modalSection){
            modalSection.style.display = "none"; 
        }
    }  

    // Display modal event when div has been clicked

for (let div of modalDivs.children) {
    div.addEventListener('click', justFunc);
}
    
 function justFunc(event) {
     modalSection.style.display = "block";
 }
    

// Show or hidden the checkbox info

function showMeTheEndDate(){
    if (document.getElementById("check-box").checked){
        document.getElementById("end-date").removeAttribute("disabled");
    } else{
        document.getElementById("end-date").disabled = true;
    }
}

function showMeTheReminder(){
    if (document.getElementById("check-box-reminder").checked){
        document.getElementById("select-time-reminder").removeAttribute("disabled");
    } else{
        document.getElementById("select-time-reminder").disabled = true;
    }
}

// Match the same day in checkboxes when divs has been clicked

const divsDate = new Date();

const divsActualMonth = divsDate.getMonth() + 1;

const todayDate = divsDate.getDate() + "/" + divsActualMonth + "/" + divsDate.getFullYear();







