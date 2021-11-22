import * as storage from "./storage.js";

var arrayFuture;
var arrayPast = storage.getPast();

const mainContainer = document.getElementById("containerDays");
const mainContainerFragment = document.createDocumentFragment();
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
export var actDate = new Date();
var actualMonth = document.getElementById("actualMonth");
var actualYear = document.getElementById("actualYear");
const divTasks = document.getElementById("divTasks");
previousButton.addEventListener("click", previousMonth);
nextButton.addEventListener("click", nextMonth);
var dayDiv;
var quotes =  ["Si te duelen las rodillas, va a llover","Hoy es un día perfecto para ser Libra","Sueñas sin miedos, vive sin límites, hoy Tauro te dará la razón","Deja de esperar que el amor llame a tu puerta, hoy es el día","Saturno y Júpiter están alineados, Leo encontrará lo que buscaba","Exprésate sin temor, hoy Sagitario te escuchará","Hoy Escorpio tiene planes increíbles, ten cuidado","Cuando Aries te daña, es porque te quiere"]
// Cambia texto header mes+año
function updateMonth() {
  actualMonth.innerHTML = actDate.toLocaleString("en-us", {
    month: "long",
  });
  actualYear.innerHTML = actDate.toLocaleString("en-us", {
    year: "numeric",
  });
}


function changeYearDinamic(yearToChange)
{
  actDate.setFullYear(yearToChange,actDate.getMonth());
  changeMonth(actDate);
}
//funciones para botones anterior y siguiente mes
function previousMonth() {
  actDate.setMonth(actDate.getMonth() - 1);
  changeMonth(actDate);
}

function nextMonth() {
  actDate.setMonth(actDate.getMonth() + 1);
  changeMonth(actDate);
}

// Pinta el mes en los divs
export function changeMonth(dia) {
  console.log("Prueba Ibai");
  removeDaysDiv();
  updateMonth();
  arrayFuture = storage.getFuture();
  var startDay = dia.getDay();
  var actMonth = dia.getMonth();
  var actYear = dia.getFullYear();
  var fecha2 = new Date(actYear, actMonth + 1, 0).getDate();
  var startDay = new Date(actYear, actMonth, 1).getDay();
  if (startDay === 0) {
    startDay = 7;
  }
  console.log(startDay);
  for (let i = -startDay + 2; i <= fecha2; i++) {
    dayDiv = document.createElement("div");
    dayDiv.classList = "days";
    var numberDiv = document.createElement("div");
    numberDiv.innerText = new Date(actYear, actMonth, i).getDate();
    dayDiv.setAttribute("data-day", i);
    dayDiv.appendChild(numberDiv);
    if (i <= 0) {
      dayDiv.style.color = "beige";
    }
    if (
      i == actDate.getDate() &&
      actDate.getMonth() == new Date().getMonth() &&
      actDate.getFullYear() == new Date().getFullYear()
    ) {
      dayDiv.classList.add("Today");
    }
    printEvent(new Date(actYear, actMonth, i));
    mainContainerFragment.appendChild(dayDiv);
    dayDiv.addEventListener("click", showTasks);
  }

  //   printEvent(new Date(actYear, actMonth, i));
  //   mainContainerFragment.appendChild(dayDiv);
  //   dayDiv.addEventListener("click", showTasks);
  // }
  mainContainer.appendChild(mainContainerFragment);
}

// Elimina los daton anteriores de los divs
function removeDaysDiv() {
  while (mainContainer.children.length > 7) {
    //remove event listener from maincontainder.lastchild
    mainContainer.removeChild(mainContainer.lastChild);
  }
}

changeMonth(actDate);

// imprimir evento en calendario
//tener en cuenta la array futuro, eventos de un día
function printEvent(fecha) {
  //if fecha calendario= fecha evento=> print
  var contadorEvento = 0;
  arrayFuture.forEach((element) => {
    var fechaEvento = new Date(element.dateInitial);
    fechaEvento.setHours(0, 0, 0, 0); //pone la hora a 0
    var fechaFinEvento = new Date(element.dateFin);
    fechaEvento.setHours(0, 0, 0, 0); //pone la hora a 0
    if (
      betweenDates(
        fechaEvento.getTime(),
        fechaFinEvento.getTime(),
        fecha.getTime()
      )
    ) {
      contadorEvento += 1;
      if (contadorEvento < 3) {
        var taskInCalendar = document.createElement("p");
        taskInCalendar.innerHTML = element.title;
        dayDiv.appendChild(taskInCalendar);
      }
    }
    // if(fechaEvento.getTime()<fecha.getTime()){
    //   if(fechaFinEvento.getTime()>=fecha.getTime()){
    //     contadorEvento++;
    //     if(contadorEvento<3){
    //       var taskInCalendar = document.createElement("p");
    //       taskInCalendar.innerHTML = element.title;
    //       dayDiv.appendChild(taskInCalendar);
    //       }
    //     }
    //   }
  });

  if (contadorEvento > 2) {
    var masEventos = document.createElement("p");
    masEventos.innerHTML = contadorEvento - 2 + " más";
    dayDiv.appendChild(masEventos);
  }
}

function showTasks(event) {
  //vaciamos el div
  divTasks.innerHTML = "";
  var accordion = document.createElement("div");
  accordion.className = "accordion";
  accordion.setAttribute("id", "accordionExample");
  console.log(event.currentTarget.getAttribute("data-day"));
  const fechaDia = new Date(
    actDate.getFullYear(),
    actDate.getMonth(),
    event.currentTarget.getAttribute("data-day")
  );
  var count = 0;
  arrayFuture.forEach((element) => {
    var fechaEvento = new Date(element.dateInitial);
    fechaEvento.setHours(0, 0, 0, 0); //pone la hora a 0
    var fechaFinEvento = new Date(element.dateFin);
    fechaFinEvento.setHours(0, 0, 0, 0); //pone la hora a 0
    if (
      betweenDates(
        fechaEvento.getTime(),
        fechaFinEvento.getTime(),
        fechaDia.getTime()
      )
    ) {
      var accordionItem = document.createElement("div");
      //console.log(accordionItem);
      accordionItem.className = "accordion-item";
      accordionItem.innerHTML =
        `<h2 class="accordion-header" id="heading${count}">` +
        `<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">` +
        element.title +
        "</button>" +
        "</h2>" +
        `<div id="collapse${count}" class="accordion-collapse collapse show" aria-labelledby="heading${count}" data-bs-parent="#accordionExample">` +
        '<div class="accordion-body">' +
        "Descripcion" +
        '<i id="icon' +
        count +
        '"class="fas fa-trash"></i>' +
        "</div>" +
        "</div>";
      accordion.appendChild(accordionItem);
      console.log(accordionItem.children[1].children[0].children[0]);
      //var prueba = .getElementById("icon" + count);
      //console.log(prueba);
      accordionItem.children[1].children[0].children[0].onclick = function () {
        deleteEvent(element.id);
      };
      count++;
    }
  });
  divTasks.appendChild(accordion);
}

function betweenDates(initialDate, finalDate, date) {
  if ((initialDate <= date && finalDate >= date) || initialDate == date) {
    return true;
  }
  return false;
}

function deleteEvent(id) {
  var i = arrayFuture.findIndex((task) => task.id == id);
  arrayFuture.splice(i, 1);
  storage.setFuture(arrayFuture);
  changeMonth(actDate);
}

export function getRandomQuote(){
  var randomNumber =  getRandom(quotes.length);
  var quote = quotes[randomNumber];
  divTasks.innerHTML = quote;
}

function getRandom(max) {
  return Math.floor((Math.random() * max ));
}