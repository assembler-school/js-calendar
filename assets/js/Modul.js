/***********************************************/
//---------------GLOBAL VARIABLES---------------/
/**********************************************/

//Title box Input
let inputTitleKey = document.getElementById("titleBox")
//Initial Calendar Input
let inputDateValue = document.getElementById("initialCal")
//End Calendar Input & checkbox
let inputDateEndValue = document.getElementById("endCal")
let endDate = document.getElementById("endCal");
let checkboxEnd = document.getElementById("checkboxEnd")
//Time Selector Input
let inputTimedValue = document.getElementById("timeSelector")
//Reminder Input
let inputReminderValue = document.getElementById("reminderSelect")
//Event type Input
let inputEventTypeValue = document.getElementById("eventSelect")
//Reminder Inputs
let reminderCheckBox = document.getElementById("reminderCheckBox");
let reminderTextArea = document.getElementById("reminderSelect");
//Remind me interval variables
let fiveMin = document.getElementById('fiveMin');
let tenMin = document.getElementById('tenMin');
let fiveTenMin = document.getElementById('fiveTenMin');
let threeTeneMin = document.getElementById('threeTenMin');
let oneHour = document.getElementById('oneHour');
//TextArea Input
let inputDescriptionValue = document.getElementById("textAreaDescription");
//Create Button
let buttonSubmit = document.getElementById("createBtn");
// Event Output
let eventOutput = document.querySelector(".event__display");
//Pesco la fecha seleccionada en el calendario de Einar
let fechaSeleccionada = document.querySelector(".fechaSeleccionada");
// Pesco el div donde se guardaran los eventos
let events = document.querySelector(".events");

let localStorageEvents = localStorage.getItem(inputDateValue.value) ? JSON.parse(localStorage.getItem(inputDateValue.value)) : [];
const calendar = document.querySelector('.calendar');

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("openButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Set current date on Caledar
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#initialCal").value = today;

/**********************************************/
//--------------- Functions --------------------
/**********************************************/

// Close form
function closeForm() {
    document.getElementById("myModal").style.display = "none";
    inputTitleKey.value = '';
    inputTitleKey.classList.remove('error')
}

// Show calendar when checkbox checked
function displayEnd () {
  if(checkboxEnd.checked == true) {
      endDate.style.display = "block"
  } else {
    endDate.style.display = "none"
  }
} // End Function


// Show Remind me select when checked
function reminderShowSelectBox() {
    if (reminderCheckBox.checked == true) {
        reminderTextArea.style.display = "flex"
    } else {
        reminderTextArea.style.display = "none"
    }
} // End function
//This function saved the event in the local Stroage
function saveEvent() {
    if (inputTitleKey.value) {
        inputTitleKey.classList.remove('error');

        localStorageEvents.push({
            title: inputTitleKey.value,
            end_date: endDate.value,
            time: inputTimedValue.value,
            reminder: inputReminderValue.value,
            event_type: inputEventTypeValue.value,
            Description: inputDescriptionValue.value

        });
        localStorage.setItem(inputDateValue.value, JSON.stringify(localStorageEvents));
    } else {
        inputTitleKey.classList.add('error');
    }
}
// Hace falta repasar
// function reLoad (){
//   if(inputDateValue.value === inputDateValue.value ) {
//     saveEvent()
//   } else {
//     location.reload
//   }
// }

//Reminder Functions 
//Set interval of diferents options


/*************************************************/
//--------------Modal Functions-------------------/
/************************************************/
// When the user clicks the button, open the modal
openButton.onclick = function() {
    modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/* *********************************/
//---------- BUTTON FUNCTIONS ------/
/**********************************/
//funcion que envia el formulario y ademas nos crea el objeto
// Saves event at the event output
buttonSubmit.onclick = function () {

  const supuestafecha = new Event(`${inputTitleKey.value}`,`${inputDateValue.value}`,`${inputDateEndValue.value}`,`${inputTimedValue.value}`,`${inputReminderValue.value}`,`${inputEventTypeValue.value}`,`${inputDescriptionValue.value}`);
  //console.log(supuestafecha);

  saveEvent()
  closeForm();

};

/* *********************************
---------- EVENT FUNCTIONS --------
********************************* */
//Aquí he creado una clase cosntructora de ventos donde se tendrían que almacenar todos su valores y posteriormente convertirlos en JSONS
class Event {
    constructor(titulo, dateValue, dateEndValue, timedValue, reminderValue, eventType, descriptionValue) {
        this.titulo = titulo;
        this.dateValue = dateValue;
        this.dateEndValue = dateEndValue;
        this.timedValue = timedValue;
        this.reminderValue = reminderValue;
        this.eventType = eventType;
        this.descriptionValue = descriptionValue;
    }
}

//Esta es una funcion que iría dentro del prototipo de objetos, solo que no se ha usado para nada
Event.prototype.sentJSON = function() {

    // let miJSON = JSON.stringify(supuestafecha);
    // console.log(miJSON);

}

let days = document.querySelectorAll(".days div");
days = Array.from(days);
//console.log(days);

days.forEach(function(divs) {

    divs.addEventListener("click", getID);

});

function getID(event){

  selectedDay = event.target.id;
  fechaSeleccionada.innerHTML = "la fecha seleccionada: "+selectedDay;
  renderEvents();
  return selectedDay;

}

//Funcion IMPORTANTE!! que renderiza y elimina los eventos del día seleccionado
function renderToday(){

  let today__event =JSON.parse(localStorage.getItem(today));

  if (today__event != null){
    let myArray = Object.entries(today__event);
    myArray.forEach((element)=>{

      let section = document.createElement("section");
      section.setAttribute("class", "event__display");
      section.insertAdjacentHTML("afterbegin",`<h1>${element[1].title}<div></h1><div>${element[1].event_type}</div></div><div>${element[1].time}</div><div>${element[1].end_date}</div><div>${element[1].Description}</div>`);
      events.appendChild(section);
    });
    //console.log(today__event)
  }else{
    console.log("HOY no hay nada wey");
  }
}
renderToday();

function renderEvents() {
  var selectedDay = event.target.id;
  //lo traemos del local storage y al mismo tiempo lo reconvertimos en un objeto
  let renderSection = JSON.parse(localStorage.getItem(selectedDay));
  console.log(renderSection);

  //Si al seleccionar un dia, No hay objetos dentro, me dice que no hay nada, de lo contrario, si encuentra cosas, me las imprime
  if (renderSection != null) {
    //con esto, convertimos el objeto en un array para posteriormente iterar en el
    let myArray = Object.entries(renderSection);
    //console.log(myArray[1][1]);

    //una vez covertido el objeto en array, tenemos que iterar por cada uno de sus posiciones, nunca sabremos cuantos eventos tenemos guardados ese dia, por lo tanto crearemos secciones por cada evento que encuentre.
    myArray.forEach((element) => {

        let section = document.createElement("section");
        section.setAttribute("class", "event__display");
        //aquí es donde metemos exactamente lo que queremos del array y ponemos posicion [1] ya que es allá donde se encuentran los datos que necesitamos y al mismo tiempo llamamos al parametro que queremos de dentro del objeto inicial.
        section.insertAdjacentHTML("afterbegin",`<h1>${element[1].title}<div></h1><div>${element[1].event_type}</div></div><div>${element[1].time}</div><div>${element[1].end_date}</div><div>${element[1].Description}</div>`);
        events.appendChild(section);
        // console.info(">>>>Titulo de mi evento: " + element[1].title);
        // console.info("Final de fecha: " + element[1].end_date);
        // console.info("La hora programada: " + element[1].time);
        // console.info("Opción del reminder: " + element[1].reminder);
        // console.info("Tipo de evento: " + element[1].event_type);
    });
    //Von el else que viene a continuación, eliminamos todos los eventos de la lista, si es que no hay eventos.
  } else {
    let event_displays = document.querySelectorAll(".event__display");
    event_displays.forEach((e) => {
        e.remove(this);
    })
    console.info("en el día seleccionado, no hay nada");
  }
}

/* *********************************
---------- DARK MODE -----------------
********************************* */
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

toggleSwitch.addEventListener("change", changeTheme);

function changeTheme() {
    if (toggleSwitch.checked) {
        document.documentElement.setAttribute("mode-changes", "light");
    } else {
        document.documentElement.setAttribute("mode-changes", "dark");
    }
}
