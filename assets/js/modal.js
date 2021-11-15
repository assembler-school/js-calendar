//Identificación de elementos

var btnCrear = document.getElementById('crear_minicalendar');
var mainModal = document.getElementById('modal_crear');
var closeModal = document.getElementById('nav_modal');



//Apertura modal principal Eventos

// When the user clicks on the button, open the modal
btnCrear.onclick = function () {
    mainModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
    mainModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == mainModal) {
        mainModal.style.display = "none";
    }
}

//poner otro input date
checkboxDate.addEventListener("click",ponerdata)

function ponerdata(){
    var divdate_modal=document.createElement("div")
    var spandate=document.createElement("span")
    var inputdate_modal=document.createElement("input")
    inputdate_modal.type="Date"
    inputdate_modal.classList="date_modal"
    spandate.classList="date-picker"
    divdate_modal.id="div2"

    if(checkboxDate.checked==true){
        fecha_modal.appendChild(divdate_modal)
        divdate_modal.appendChild(spandate)
        spandate.appendChild(inputdate_modal)
        typedatatimelocal.type="Date"
    }
    else if(checkboxDate.checked==false){
        var a=document.getElementById("div2")
        fecha_modal.removeChild(a)
        typedatatimelocal.type="datetime-local"
    }
}