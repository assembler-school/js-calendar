//Cogemos la fecha de hoy
const date = new Date();

//Pesco la fecha actual
var exactlyToday = date.toISOString().substr(8,2);
console.log(exactlyToday, "La fecha actual wey");

//coge el numero exacto del mes actual
var actual_month = date.toISOString().substr(5,2);
console.log(actual_month, "mes actual");

//coge el numero exacto del año
var actual_year = date.toISOString().substr(0,4);
console.log(actual_year, "año actual");

const renderCalendar = () => {

  date.setDate(1);
  //Detecta el primer dia del mes y encuentra la resta entre el mismo y 0

  //Recoge el DIV con la clase .days
  const monthDays = document.querySelector(".days")

  /*recoge la fecha actual de la variable (date), le recoge el mes SIGUIENTE al actual y se lo pone a dia 0. Al ponerselo a dia cero, lo que hace es que te coge el ultimo dia del mes pasado. Es decir, el dia 31 de cada mes, por lo tanto lo que obtenemos es el ultimo dia del mes ACTUAL*/
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  console.log(lastDay, "lastDay");

  /* Te recoge el ultimo día del mes pasado al Actual, por lo tanto, sera el ultimo dia del mes pasado */
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  console.log(prevLastDay, "prevLastDay");

  /* El metodo getDay() lo que te dice es en que dia de la semana cae ese día. Si una semana tiene 7 dias, del uno al 7, en que posición caerá?*/
  const firstDayIndex = date.getDay();
  console.log(firstDayIndex, "firstdayindex");

  /* Nuevamente, con el getDay() está recogiendo el ultimo día del mes 31/28/ lo que sea y está avergiuando que dia de los 7 días a la semana caerá*/
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  console.log(lastDayIndex, "lastDayIndex");

  /* Para saber cuantos dias mostrar en el calendario, esta cogiendo el ÑastDay Index y le resta los 7 días de la semana y así le queda la resta para en el futuro, con un bucle crear especificamente dichos DIVS */
  const nextDays = 7 - lastDayIndex - 1;
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
  document.querySelector(".date p").innerHTML = date.toDateString();

  /* Esta es una variable vacia con la que vamos a almacenar todos los dias con bucles y mostrarlos */
  let days = "";

  /* Bucle que crea los dias anteriores al numero obtenido con el firstDayIndex y les añade la clase prev-date*/
  for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class = "prev-date" id="${prevLastDay - x+1}-${actual_month-1}-${actual_year}">${prevLastDay - x+1}</div>`;
  }

 var myDayArray = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
  /* Bucle para crear todos los Divs que necesitamos para el día del mes */
  for (i = myDayArray[0]; i <= lastDay; i++) {
      /* Este if es solo un comparador que te compara el valor de la variable (date) con la fecha actual de un nuevo objeto Date y si coincide, le aplica la clase TODAY */
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
          days += `<div class="today no-event-day" id="${i}-${actual_month}-${actual_year}">${i}</div>`;
      } else {
          /*De lo contrario, te coge el numero almacenado en la variable lastDay y te va restando y crrando los Divs necesarios */
          days += `<div class="no-event-day" id="${actual_year}-${actual_month}-${i}">${i}</div>`;
      }

      monthDays.innerHTML = days;
  }

  /* Con la variable nexDays, te está creando tantos DIVS como el nextdays tenga de dias restamtes de semana */
  for (let j = 1; j <= nextDays; j++) {
      days += `<div class = "next-date" id="${j}-${actual_month +1}-${actual_year}">${j}</div>`;
      monthDays.innerHTML = days;
  }

}

//Esta funcion renderiza el calendario por primera vez
renderCalendar();

//Detecta el boton PREV y setea el mes en -1 y vuelve a renderizar el calendario
var btnPrev = document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

//Detecta el boton NEXT y setea el mes en +1 y vuelve a renderizar el calendario
var btnPrev = document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});



/*************************************************************/
//--------------Einar function on calendar-------------------/
/***********************************************************/

//HOY
//ls
today = document.getElementsByClassName("today");
//console.log(today)
//today = today.addEventListener("click", showEventOfDayHere);

//Otros dias
day = document.querySelectorAll('.no-event-day');
for (let d = 0; d < day.length; d++) {
    day.item(d).addEventListener("click", showEventOfDayHere);
}

//Falta incluir today
var hereMoreEvents = true;
var meeting = false;
var study = false;
var personal = false;

function showEventOfDayHere(ev) {
    if (meeting == true) {
        event.target.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="meetingList">M</ul></div>');
        event.stopPropagation();
    } else if (study == true) {
        event.target.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="studyList">S</ul></div>');
        event.stopPropagation();
    } else if (personal == true) {
        event.target.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="personalList">P</ul></div>');
        event.stopPropagation();
    } //else if (hereMoreEvents == true) {
    //Unicamente ver todos los eventos de un dia si se clica encima
    // document.body.click = addElement;
    // document.currentDiv.click = addElement;

    // function addElement() {
    //     // crea un nuevo div
    //     // y añade contenido
    //     var newDiv = document.createElement("div");
    //     var newContent = document.createTextNode("Hola!¿Qué tal?");
    //     newDiv.appendChild(newContent); //añade texto al div creado.

    //     // añade el elemento creado y su contenido al DOM
    //     var currentDiv = document.getElementById("div1");
    //     document.body.insertBefore(newDiv, currentDiv);
    //}
    else {
        event.target.style.backgroundColor = "#ffa366";
    }

}

stopEvent = true;

function load() {
    elem = document.getElementById("all-days");
    elem.addEventListener("click", stopEvent, false);
    //var meeting = false;
    //var study = false;
    //var personal = salse;

}









