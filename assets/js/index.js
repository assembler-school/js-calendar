//Cogemos la fecha de hoy
const date = new Date();

function renderCalendar() {

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
  const firstDayIndex = date.getDay();
  console.log(firstDayIndex, "firstdayindex");

  /* Nuevamente, con el getDay() está recogiendo el ultimo día del mes 31/28/ lo que sea y está avergiuando que dia de los 7 días a la semana caerá*/
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  console.log(lastDayIndex, "lastDayIndex");

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
  document.querySelector(".date p").innerHTML = date.toDateString().substr(11,4);;

  /* Para saber cuantos dias mostrar en el calendario, esta cogiendo el ÑastDay Index y le resta los 7 días de la semana y así le queda la resta para en el futuro, con un bucle crear especificamente dichos DIVS */
  const nextDays = 7 - lastDayIndex;
  console.log(nextDays, "nextDays");

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
    days += `<div class = "prev-date" id="${prevLastDay - y+1}-${o}-${actual_year}">${prevLastDay - x+1}</div>`;
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
        days += `<div class="today no-event-day" id="${y}-${o}-${actual_year}">${i}</div>`;
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
//Detecta el boton PREV y setea el mes en -1 y vuelve a renderizar el calendario
var btnPrev = document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

//Detecta el boton NEXT y setea el mes en +1 y vuelve a renderizar el calendario
var btnNext = document.querySelector(".next").addEventListener("click", () => {
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

//Detecta todos los divs del calendario con la clase no-event-day y ejecuta las funciones pertinentes mediante los listeners pertinentes.
day = document.querySelectorAll('.no-event-day');
for (let d = 0; d < day.length; d++) {
    //day.item(d).addEventListener("click", showEventOfDayHere);
    day.item(d).addEventListener("click", bringDataFromLocalStorageToMainCalendar);
    day.item(d).addEventListener("click", showEventOfDayHere);

}

//Interactuamos con los datos de Local Storage - Application
function bringDataFromLocalStorageToMainCalendar(ev) {
    //Esta variable selecciona lo clicado al llamar al event listener y lo posiciona como target
    var clickedDivId = event.target.id;
    console.info("Esta es la ID del dia seleccionado " + clickedDivId)
        //Cogemos los datos STORAGE del div clicado y lo parseamos
    var datafromLocalStorage = JSON.parse(localStorage.getItem(clickedDivId));
    console.info("Esta es la informacion extraida y parseada del ID dia clicado >>> " + datafromLocalStorage)
    console.info(Object.values(datafromLocalStorage))
    console.info("Este mensaje solo aparece si el objeto anterior ha sido extraido correctamente")
    if (datafromLocalStorage !== null) {
        console.info('INNN F()')
            //Si detro del array datafromLocalStorage existe meeting, study o meeting, crear una variable x is true
        meetingIsTrue = datafromLocalStorage.includes('meeting');
        console.log("Meeting is " + meetingIsTrue)
        studyIsTrue = datafromLocalStorage.includes('study');
        console.log("Study is " + studyIsTrue)
        personalIsTrue = datafromLocalStorage.includes('personal');
        console.log("Personal is " + personalIsTrue)
    } else if ((datafromLocalStorage == null)) {
        //swal('No tienes ningun evento este dia ^^');
        console.info('La informacion es nula, no tienes ningun evento el dia seleccionado en el calendario')
            //alert('datafromLocalStorage es NULO');
    } else {
        //console.warn('La insersión de tipo de evento desde el formulario no ha llegado correctamente');
    }
}
//END F()bringDataFromLocalStorageToMainCalendar
//Devlopgit

function showEventOfDayHere(ev) {

    var meetingIsTrue = false
    var studyIsTrue = false
    var personalIsTrue = false

    var clickedDiv = event.target;

    if (meetingIsTrue == true) {
        console.info(meetingIsTrue + ' MEETING IS TRUE')
        var clickedDiv = event.target;

        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="meetingList">M</ul></div>');
        //event.stopPropagation();

    } else if (studyIsTrue == true) {
        console.info(studyIsTrue + ' STUDY IS TRUE');
        var clickedDiv = event.target;

        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="studyList">S</ul></div>');
        //event.stopPropagation();

    } else if (personalIsTrue == true) {
        console.info(personalIsTrue + ' PERSONAL IS TRUE')
        var clickedDiv = event.target;

        clickedDiv.insertAdjacentHTML('beforeend', '<div class="event-inserted"><ul class="personalList">P</ul></div>');
        //event.stopPropagation();

    } else {
        console.info('showEventOfDayHere - revisa su funcionalidad')
            // swal('No llega ningun dato aqui')
    }

}

stopEvent = true;
//Guardar array de json con multiples fechas
//pad stat
//DE lado
//padStart()
function load() {
    elem = document.getElementById("all-days");
    elem.addEventListener("click", stopEvent, false);
}
