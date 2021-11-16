const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContentor= document.getElementsByClassName('modal-content')
var modalContent= modalContentor[0]
//TODO Display modal Start
function modalStart() {
    cleanModal()

    // modalContent[0].appendChild(newH2('Welcome'))
    // modalContent[0].appendChild(newP('Insert Your User Name'))
    // modalContent[0].appendChild(newInput())
    // modalContent[0].appendChild(newButton('rules', 'rules()'))
    // modalContent[0].appendChild(newButton('START', 'start()'))
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
    while (modalContent[0].firstChild) {
        modalContent[0].removeChild(modalContent[0].lastChild);
    }
}

//TODO clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}



