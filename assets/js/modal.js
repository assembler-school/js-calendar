//Identificación de elementos

var btnCrear = document.getElementById('crear_minicalendar');
var mainModal = document.getElementById('modal_crear');
var closeModal = document.getElementById('nav_modal');
var eventTitleInput = document.querySelector('.input_modal>input');
var btnSave = document.getElementById('save-modal');



//Apertura modal principal Eventos

btnCrear.onclick = function () {
    mainModal.style.display = "block";
}

closeModal.onclick = function () {
    mainModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == mainModal) {
        mainModal.style.display = "none";
    }
}

//Validación

btnSave.addEventListener("click", comprovacionFinal);
eventTitleInput.addEventListener("mouseup", comprovaciones);
eventTitleInput.addEventListener("keyup", comprovaciones);

function comprovaciones(event) {
    let profile_cont_input = event.srcElement.value;
    if (profile_cont_input.length > 3) {
        event.srcElement.style.color = "var(--azul)";
        event.srcElement.style.backgroundColor = "#ffffff";
    } else {
        event.srcElement.style.backgroundColor = "#F8D8DD";
    }
}

function comprovacionFinal() {
    let allInputs = document.querySelectorAll('.');

    switch (key) {
        case value:

            break;

        default:
            break;
    }}



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

//poner selection recordatorio
recordatorio_modal.addEventListener("click",recordatorio_modal_time)

function recordatorio_modal_time(){
    if(recordatorio_modal.checked==true){
        selctdiv_modal.appendChild(crearlistamin())
    }
    else if(recordatorio_modal.checked==false){
        var a=document.getElementById("selectrecord")
        selctdiv_modal.removeChild(a)
    }

}


function crearlistamin(){
    var selectrecordatorio=document.createElement("select")
    selectrecordatorio.classList="repit_modal"
    selectrecordatorio.id="selectrecord"
    const timerecordatorio=[5,10,15,30,60]
    for (const time of timerecordatorio) {
        var option_modal=document.createElement("option")
        option_modal.innerHTML=time+" minutes"
        console.log(option_modal)

        selectrecordatorio.appendChild(option_modal)
    }
    return selectrecordatorio
}