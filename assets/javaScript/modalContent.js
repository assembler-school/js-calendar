const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContentor = document.getElementsByClassName('modal-content')
var modalContent = modalContentor[0]
//TODO Display modal Start
function modalStart() {
    beginModal()
    openModal()
}

//TODO modal open
function openModal() {
    modal.style.display = "block";
}

//TODO modal close
function closeModal() {
    modal.style.display = "none";
    cleanModal()
}

//TODO clean modal
function cleanModal() {
    while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.lastChild);
    }
}

//TODO clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayForm() {
    (endDateCheck.checked == true) ? hideForm[0].style.display = 'block' : hideForm[0].style.display = 'none';
    ;
}