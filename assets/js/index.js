/***********************************************/
//---------------GLOBAL VARIABLES---------------/
/**********************************************/
//Cogemos la fecha de hoy
const date = new Date();
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
let timeNow = todayTime.getHours() + ":" + todayTime.getMinutes();
document.getElementById("timeSelector").value = timeNow;

//Set so you cannot select a past date


/**********************************************/
//--------------- Functions --------------------
/**********************************************/

const renderCalendar = () => {

  date.setDate(1);

  //Pesco la fecha actual
   const exactlyToday = new Date().toISOString().substr(8,2);
   console.log(exactlyToday, "La fecha actual wey");

  //coge el numero exacto del mes actual
  const actual_month = date.toISOString().substr(5,2);
  console.log(actual_month, "el mes actual wey");

  //coge el numero exacto del año
  const actual_year = new Date().toISOString().substr(0,4);
  console.log(actual_year, "año actual");

  //Recoge el DIV con la clase .days
  const monthDays = document.querySelector(".days")

  /*recoge la fecha actual de la variable (date), le recoge el mes SIGUIENTE al actual y se lo pone a dia 0. Al ponerselo a dia cero, lo que hace es que te coge el ultimo dia del mes pasado. Es decir, el dia 31 de cada mes, por lo tanto lo que obtenemos es el ultimo dia del mes ACTUAL*/
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  console.log(lastDay, "lastDay");

  /* Te recoge el ultimo día del mes pasado al Actual, por lo tanto, sera el ultimo dia del mes pasado */
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  console.log(prevLastDay, "prevLastDay");

  /* El metodo getDay() lo que te dice es en que dia de la semana cae ese día. Si una semana tiene 7 dias, del uno al 7, en que posición caerá?*/
  const firstDayIndex = date.getDay() - 1;
  console.log(firstDayIndex, "firstdayindex");

  /* Nuevamente, con el getDay() está recogiendo el ultimo día del mes 31/28/ lo que sea y está avergiuando que dia de los 7 días a la semana caerá*/
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  console.log(lastDayIndex, "lastDayIndex");

  /* Para saber cuantos dias mostrar en el calendario, esta cogiendo el lastDay Index y le resta los 7 días de la semana y así le queda la resta para en el futuro, con un bucle crear especificamente dichos DIVS */
  let nextDays = 7 - lastDayIndex;
  //En el mes de agosto el firstDayIndex cae a -1 y eso nos hace mal en el calendario, de ahí la función de abajo, Por eso al last Index le restamos uno, para que el next days empeice en 0 siempre
  if(firstDayIndex == -1){nextDays = 7 - lastDayIndex - 1;}
  console.log(nextDays, "nextDays");

  //Siempre se aumenta 1, puesto que la variable empieza a contar desde 0
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  //Mes actual
  //date.getMonth(), nos trae el mes en el que estamos ahora mismo y en esta linea sdemás la inserta en el h2
  document.querySelector(".date h2").innerHTML = months[date.getMonth()];

  //Recoge el día actual de la variable date y la inserta en el P
  document.querySelector(".date p").innerHTML = date.toDateString().substr(11,4);

  /* Esta es una variable vacia con la que vamos a almacenar todos los dias con bucles y mostrarlos */
  let days = "";

  /* Bucle que crea los dias anteriores al numero obtenido con el firstDayIndex y les añade la clase prev-date*/
  for (let x = firstDayIndex; x > 0; x--) {
    // Convierto el dia en un numero de un digito a dos digitos
    let i = x.toString();
    let y = i.padStart(2, "0");
    // Convierto el mes en un numero de un digito a dos digitos
    let h = parseInt(actual_month - 1);
    let m = h.toString();
    let o = m.padStart(2, "0");
    days += `<div class = "prev-date" id=${actual_year}-${o}-${prevLastDay - y+1}>${prevLastDay - x + 1}</div>`;
  }

 /* Bucle para crear todos los Divs que necesitamos para el día del mes */
  for (let i = 1; i <= lastDay; i++) {
    let x = i.toString();
    let y = x.padStart(2, "0");
    let h = parseInt(actual_month);
    let j = h.toString();
    let o = j.padStart(2, "0");
      /* Este if es solo un comparador que te compara el valor de la variable (date) con la fecha actual de un nuevo objeto Date y si coincide, le aplica la clase TODAY */
      if (i === new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
        // Convierto el mes en un numero de un digito a dos digitos
        let h = parseInt(actual_month);
        let x = h.toString();
        let o = x.padStart(2, "0");
        days += `<div class="today no-event-day" id="${actual_year}-${o}-${y}">${i}</div>`;
      } else {
        /*De lo contrario, te coge el numero almacenado en la variable lastDay y te va restando y crrando los Divs necesarios */
        // Convierto el mes en un numero de un digito a dos digitos
        let h = parseInt(actual_month);
        let x = h.toString();
        let o = x.padStart(2, "0");
        days += `<div class="no-event-day" id="${actual_year}-${o}-${y}">${i}</div>`;
      }
      monthDays.innerHTML = days;
  }

  /* Con la variable nexDays, te está creando tantos DIVS como el nextdays tenga de dias restamtes de semana */
  for (let j = 1; j <= nextDays; j++) {
    // Convierto el dia en un numero de un digito a dos digitos
    let i = j.toString();
    let y = i.padStart(2, "0");
    // Convierto el mes en un numero de un digito a dos digitos
    let h = parseInt(actual_month) + 1;
    let x = h.toString();
    let o = x.padStart(2, "0");
    days += `<div class = "next-date" id="${actual_year}-${o}-${y}">${j}</div>`;
    monthDays.innerHTML = days;
  }

}

//Esta funcion renderiza el calendario por primera vez
renderCalendar();
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
    location.reload();
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

  saveEvent();
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

  let selectedDay = event.target.id;
  fechaSeleccionada.innerHTML = "Eventos para la fecha: "+selectedDay;
  renderPickedEvents();
  return selectedDay;
}

//Funcion IMPORTANTE!! que renderiza y elimina los eventos del día seleccionado
function renderTodayEvent(){

  let today__event = JSON.parse(localStorage.getItem(today));

  if (today__event == null){
    let no_events_pickeds = document.querySelector(".no_events_pickeds");
    no_events_pickeds.style.display = "flex";
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
        section.insertAdjacentHTML("afterbegin",`<div class = "event_type_div"><h1>${element[1].title}</h1><div class ="${element[1].event_type}">${element[1].event_type}</div></div><div>Hora de inicio del evento:<br>${element[1].time}</div><div>Avisar: ${element[1].reminder}</div><div>Termina el día: ${element[1].end_date}</div><div class = "description_div">Descripción:<br>${element[1].Description}</div>`);
        events.appendChild(section);
      });
    }
    let no_events_pickeds = document.querySelector(".no_events_pickeds");
    no_events_pickeds.style.display = "none";
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
    let no_events_pickeds = document.querySelector(".no_events_pickeds");
    no_events_pickeds.style.display = "flex";
  //Si al seleccionar un dia, hay objetos dentro, me las imprime y elimina los que no sean iguales a su id
  } else {
    //con esto, convertimos el objeto en un array para posteriormente iterar en el
    let myArray = Object.entries(renderSection);
    let comparedDay = myArray[0][1].setDay;
    // console.log(comparedDay);
    //console.log(myArray[1][1]);
    let no_events_pickeds = document.querySelector(".no_events_pickeds");
    no_events_pickeds.style.display = "none";

    if(comparedDay == selectedDay){
      /*na vez covertido el objeto en array, tenemos que iterar por cada uno de sus posiciones, nunca sabremos cuantos eventos tenemos guardados ese dia, por lo tanto crearemos secciones por cada evento que encuentre y meteremos dentro lo que queramos*/
      myArray.forEach((element) => {
          let section = document.createElement("section");
          section.setAttribute("class", "event__display");
          section.setAttribute("id", `${element[1].setDay}`);
          /*quí es donde metemos exactamente lo que queremos del array y ponemos posicion [1] ya que es allá donde se encuentran los datos que necesitamos y al mismo tiempo llamamos al parametro que queremos de dentro del objeto inicial*/
          section.insertAdjacentHTML("afterbegin",`<div class = "event_type_div"><h1>${element[1].title}</h1><div class ="${element[1].event_type}">${element[1].event_type}</div></div><div>Hora de inicio del evento:<br>${element[1].time}</div><div>Avisar: ${element[1].reminder}</div><div>Termina el día: ${element[1].end_date}</div><div class = "description_div">Descripción:<br>${element[1].Description}</div>`);
          events.appendChild(section);
          // console.info(">>>>Titulo de mi evento: " + element[1].title);
          // console.info("Final de fecha: " + element[1].end_date);
          // console.info("La hora programada: " + element[1].time);
          // console.info("Opción del reminder: " + element[1].reminder);
          // console.info("Tipo de evento: " + element[1].event_type);
      });

      //debo conseguir pescar el ID del section en especifico y hacer un condicional que me elimine todos los que NO son iguales
      let event_display = document.querySelectorAll(".event__display");
      console.log(event_display);
      // El objeto de arriba ,e devuelve un Nodelist y con lo de abajo lo convierto en Array para Iterar por cada uno de los elementos en el Array
      let x = Array.from(event_display);
      console.log(x);
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

/*************************************************************/
//--------------Einar function on calendar-------------------/
/***********************************************************/

//HOY
//ls
today = document.getElementsByClassName("today");
//console.log(today)
//today = today.addEventListener("click", showEventOfDayHere);

//Detecta todos los divs del calendario con la clase no-event-day y ejecuta las funciones pertinentes mediante los listeners pertinentes.
day = document.querySelectorAll('.no-event-day');
for (let d = 0; d < day.length; d++) {
    //day.item(d).addEventListener("LOAD", showEventOfDayHere);
    day.item(d).addEventListener("click", bringDataFromLocalStorageToMainCalendar);
}

//Interactuamos con los datos de Local Storage - Application
function bringDataFromLocalStorageToMainCalendar(ev) {
    //Esta variable selecciona lo clicado al llamar al event listener y lo posiciona como target
    var clickedDivId = event.target.id;
    var clickedDiv = event.target;
    //console.info("Esta es la ID del dia seleccionado " + clickedDivId)

    //Cogemos los datos STORAGE del div clicado y lo parseamos
    var datafromLocalStorage = JSON.parse(localStorage.getItem(clickedDivId));
    //console.info("INFO extraida y parseada del dia clicado >>> " + datafromLocalStorage)

    //Returns ARR
    var MydatafromLocalStorage = Object.entries(datafromLocalStorage);

    //ALL Object's
    //console.log(MydatafromLocalStorage)

    //Turn ARR into var 's

    MydatafromLocalStorage.forEach(data => {
        var myTitle = data[1].title
        var myEndDate = data[1].end_date
        var myTime = data[1].time
        var myReminder = data[1].reminder
        var myEventType = data[1].event_type
        var myDescription = data[1].description
        // console.log(myTitle)
        // console.log(myEndDate)
        // console.log(myTime)
        // console.log(myReminder)
        console.log(myEventType)
        // console.log(myDescription)

    });
    //integrar correctamente los datos del foreach al IF() siguiente

    //Si existe evento - boolean

    if (myEventType == "meeting") {
        swal("Soy un meeting");
        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="meetingList">M</ul></div>');
        //event.stopPropagation();
    } else if (myEventType == "Study") {
        swal("Soy un study");
        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="studyList">S</ul></div>');

    } else if (myEventType == "Personal") {
        swal("Soy un personal");
        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="personalList">P</ul></div>');

    } else {
        console.warn('La insersión de tipo de evento desde el formulario no ha llegado correctamente');
        //break;
    }
}

stopEvent = true;
function load() {
    elem = document.getElementById("all-days");
    elem.addEventListener("click", stopEvent, false);
}

//Detecta el boton PREV y setea el mes en -1 y vuelve a renderizar el calendario
var btnPrev = document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
  let days = document.querySelectorAll(".days div");
  days = Array.from(days);
  //console.log(days);

  days.forEach(function(divs) {

    divs.addEventListener("click", getID);

  });
});

//Detecta el boton NEXT y setea el mes en +1 y vuelve a renderizar el calendario
var btnNext = document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  let days = document.querySelectorAll(".days div");
  days = Array.from(days);
  //console.log(days);

  days.forEach(function(divs) {

      divs.addEventListener("click", getID);

  });
});

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





