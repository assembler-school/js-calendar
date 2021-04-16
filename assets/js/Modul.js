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

let localStorageEvents = [];
// let localStorageEvents = localStorage.getItem(inputDateValue.value) ? JSON.parse(localStorage.getItem(inputDateValue.value)) : [];
// const calendar = document.querySelector('.calendar');

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("openButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Set current date on Caledar
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#initialCal").value = today;
document.getElementById("endCal").value = today;

// Set current time when calender open
let todayTime = new Date();
let timeNow = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();
document.getElementById("timeSelector").value = timeNow;


/**********************************************/
//--------------- Functions --------------------
/**********************************************/

// Close form
function closeForm() {
    document.getElementById("myModal").style.display = "none";
    inputTitleKey.value = '';
    inputDescriptionValue.value = "";
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
    let picked_Day = JSON.parse(localStorage.getItem(inputDateValue.value));
    console.log(picked_Day);
    //if (inputDateValue && p){}
    if(picked_Day == null){

      picked_Day = [];

    }
    picked_Day.push({
      setDay: inputDateValue.value,
      title: inputTitleKey.value,
      end_date: endDate.value,
      time: inputTimedValue.value,
      reminder: inputReminderValue.value,
      event_type: inputEventTypeValue.value,
      Description: inputDescriptionValue.value

    });
    localStorage.setItem(inputDateValue.value, JSON.stringify(picked_Day));
    //location.reload();
}

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
  fechaSeleccionada.innerHTML = "Eventos para la fecha: "+selectedDay;
  renderPickedEvents();
  return selectedDay;
}


//Funcion IMPORTANTE!! que renderiza y elimina los eventos del día seleccionado
function renderTodayEvent(){

  let today__event = JSON.parse(localStorage.getItem(today));

  if (today__event == null){
    console.log("HOY no hay nada wey");
    //console.log(today__event)
  }else{
    let myArray = Object.entries(today__event);
    let comparedDay = myArray[0][1].setDay;
    //console.log(comparedDay)
    //console.log(today)

    if(comparedDay == today){
      myArray.forEach((element)=>{
        let section = document.createElement("section");
        section.setAttribute("class", "event__display");
        section.setAttribute("id", `${element[1].setDay}`);
        section.insertAdjacentHTML("afterbegin",`<div><h1>${element[1].title}</h1><div>${element[1].event_type}</div></div><div>${element[1].time}</div><div>${element[1].reminder}</div><div>${element[1].end_date}</div><div>${element[1].Description}</div>`);
        events.appendChild(section);
      });
    }
  }
}
renderTodayEvent();

function renderPickedEvents() {
  let selectedDay = event.target.id;
  //console.log(selectedDay);
  //lo traemos del local storage y al mismo tiempo lo reconvertimos en un objeto
  let renderSection = JSON.parse(localStorage.getItem(selectedDay));

  if (renderSection == null) {
    let event_displays = document.querySelectorAll(".event__display");
    event_displays.forEach((e)=>{
      e.remove(this);
    })
    console.log("aqui no hay nada wey");
  //Si al seleccionar un dia, hay objetos dentro, me las imprime y elimina los que no sean iguales a su id
  } else {
    //con esto, convertimos el objeto en un array para posteriormente iterar en el
    let myArray = Object.entries(renderSection);
    let comparedDay = myArray[0][1].setDay;
    //console.log(comparedDay);
    //console.log(myArray[1][1]);

    if(comparedDay == selectedDay){
      /*na vez covertido el objeto en array, tenemos que iterar por cada uno de sus posiciones, nunca sabremos cuantos eventos tenemos guardados ese dia, por lo tanto crearemos secciones por cada evento que encuentre y meteremos dentro lo que queramos*/
      myArray.forEach((element) => {
          let section = document.createElement("section");
          section.setAttribute("class", "event__display");
          section.setAttribute("id", `${element[1].setDay}`);
          /*quí es donde metemos exactamente lo que queremos del array y ponemos posicion [1] ya que es allá donde se encuentran los datos que necesitamos y al mismo tiempo llamamos al parametro que queremos de dentro del objeto inicial*/
          section.insertAdjacentHTML("afterbegin",`<div><h1>${element[1].title}</h1><div>${element[1].event_type}</div></div><div>${element[1].time}</div><div>${element[1].reminder}</div><div>${element[1].end_date}</div><div>${element[1].Description}</div>`);
          events.appendChild(section);
          // console.info(">>>>Titulo de mi evento: " + element[1].title);
          // console.info("Final de fecha: " + element[1].end_date);
          // console.info("La hora programada: " + element[1].time);
          // console.info("Opción del reminder: " + element[1].reminder);
          // console.info("Tipo de evento: " + element[1].event_type);
      });

      //debo conseguir pescar el ID del section en especifico y hacer un condicional que me elimine todos los que NO son iguales
      let event_display = document.querySelectorAll(".event__display");
      //console.log(event_display);
      // El objeto de arriba ,e devuelve un Nodelist y con lo de abajo lo convierto en Array para Iterar por cada uno de los elementos en el Array
      let x = Array.from(event_display);
      //console.log(x);
      x.forEach((e)=>{
        //Selecciono los que No sean igual al Dia seleccionado
        if (e.id != selectedDay){
          //console.log(e);
          //Lo elimino, chau
          e.remove(this);
        }
      });
    }
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