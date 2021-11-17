window.onload = init;

var dayDiv = document.querySelector("#month-container")
var dayNameContainer = document.getElementById("day-name")
var dayNameContainerH1 = document.getElementById("day-name-h1")
var monthNameContainerH1 = document.getElementById("month-name-h1")
var yearNameContainerH1 = document.getElementById("year-name-h1")

var hourDiv = document.querySelector("#day-container")

var eventHistoricArray = [];
var monthDayArray = [];
const dayNameArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const dayNameObj = {
    Monday : 0,
    Tuesday:1,
    Wednesday:2,
    Thursday:3,
    Friday:4,
    Saturday:5,
    Sunday:6,
}

const monthNameArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const monthNameObj = {
    January:31,
    February:28,
    March:31,
    April:30,
    May:31,
    June:30,
    July:31,
    August:31,
    September:30,
    October:31,
    November:30,
    Decembe:31,
}


var today = new Date ();
var todayNumDay = today.getDate();//15
const todayMonth = today.getMonth();//11
var todayMonthName = monthNameArr[todayMonth];//november
var todayYear = today.getFullYear();//2021

var selectedDay = todayNumDay;
var selectedMonth = todayMonth;
var selectedYear = todayYear;

function init(){
    loadStorage();
    refreshContainers();
    createMonthDays();
}

function refreshContainers(){
    dayNameContainerH1.textContent = dayNameArr[today.getDay()] + todayNumDay;
    monthNameContainerH1.textContent = monthNameArr[selectedMonth];
    yearNameContainerH1.textContent = selectedYear;
}

var selectedMonthDays = new Date(selectedYear,selectedMonth+1,0).getDate();

var firstDayMonth = new Date(selectedYear,selectedMonth,1).getDay();
var firstDayWeekMonthName = dayNameArr[firstDayMonth]
var lastDayMonth = new Date(selectedYear,selectedMonth+1,0).getDay();

function createMonthDays(){
    deleteMonthDays();
    createDay(selectedMonthDays);
    createHoursFun(selectedDay);
    addEventsListeners();
}
function createDaysHours(){
    createHoursFun(selectedDay)
}
function createDay(num){
    var countday = 1;
    let countweek = firstDayMonth;
    let firstWeek = firstDayMonth;
    let lastWeek = lastDayMonth;
    while(firstWeek > 1){
        var dayEmpty = document.createElement("div");
        dayEmpty.setAttribute("id","day-container-empty" + firstWeek);
        dayEmpty.classList.add("day-container-empty")
        dayDiv.appendChild(dayEmpty)
        firstWeek--;
    }
    while (countday <= num) {
        var day = document.createElement("div");
        day.setAttribute("id","day-container-" + countday);
        day.classList.add("day-container")
        if(countday == todayNumDay && todayMonth==selectedMonth && todayYear==selectedYear){
            day.classList.add("today-special-day")
        }
        dayDiv.appendChild(day)
        var dayInner = document.createElement("div");
        dayInner.setAttribute("id","day-container-inner" + countday);
        dayInner.classList.add("day-container-inner")
        dayInner.textContent = dayNameArr[countweek]+countday;
        day.appendChild(dayInner);
        // createDayContent(selectedYear,selectedMonth,countday,"",dayNameArr[countweek],"");
        assignEvent(countday,day);
        //dayTitle.textContent = monthDayArray[countday - 1].events;
        countday++
        if(countweek>=6){
            countweek=0;
        }else{
            countweek++;
        }
    }
    while(lastWeek <= 6){
        var dayEmptyLast = document.createElement("div");
        dayEmptyLast.setAttribute("id","day-container-empty"+lastWeek);
        dayEmptyLast.classList.add("day-container-empty");
        dayDiv.appendChild(dayEmptyLast);
        lastWeek++;
    }
    countday=1;
}
function deleteMonthDays(){
    while (dayDiv.firstChild) {
        dayDiv.removeChild(dayDiv.lastChild)
    }
}

function displayEventsPerDay(day,i){
    
        let createDivEvent = document.createElement("div");
        createDivEvent.setAttribute("id","event-container-" + i);
        createDivEvent.classList.add("event-container");
        createDivEvent.textContent = historicEvents[i].title;
        createDivEvent.addEventListener("click",function() { modalEvent(i)})
        day.appendChild(createDivEvent);
}
function consoleLog(){
    console.log("hola")
}

var i;
function assignEvent(countday,day){
    i = 0
    while(i < (historicEvents.length)){
        if(historicEvents[i].day == (countday) && historicEvents[i].month == selectedMonth && historicEvents[i].year == selectedYear){
            // monthDayArray[countday - 1].events = filterEventFun(countday);
            displayEventsPerDay(day,i)
        }
        i++;
    }
}


function createHoursFun(){
    var countHours = 1 ;
    while (countHours <= 24) {
        var hour = document.createElement("div")
        hour.setAttribute("id","hour-container-"+countHours)
        hour.classList.add("hour-container")
        hour.textContent = countHours
        hourDiv.appendChild(hour)
        countHours++
    }
}
function addEventsListeners(){
    var daisMonth = document.querySelectorAll("#month-container")
    var daisMonth2 = document.getElementsByClassName("day-container")

    daisMonth.forEach(sel =>{
        sel.addEventListener("click",(e)=>{
            for (x=1; x<daisMonth2.length+1; x++){
                document.getElementById("day-container-"+x).classList.remove("e-selected-day");
                if (e.target.matches(".day-container")) {
                    dayNameContainerH1.textContent=e.target.innerText;
                }
            }
            if (e.target.matches(".day-container")) {
                e.target.classList.add("e-selected-day")
                //selectedDay = e.target
            }
        })
    });
}
function loadStorage(){
    if (localStorage.getItem("historic") !== null) {
        historicEvents = JSON.parse(localStorage.getItem("historic"));
    }
}


// let eventContainer = document.querySelectorAll(".event-container")
// console.log(eventContainer)

// eventContainer.forEach(even =>{
//     even.addEventListener("click", (a) => {
//         if (a.target.matches(".event-container")) {
//             console.log("hola")
//         }
//     })
// })

// let dayEventFiltered;
// function filterEventFun(day){
//     dayEventFiltered = historicEvents.filter(event => {
//         return event.day === day && event.month === selectedMonth && event.year == selectedYear
//         //return event.day === day
//     })
//     return dayEventFiltered;
// }

// function createDayContent(year = null, month = "default", day = null, hour="hour", weekDay="weekDay", events="") {
//     dayEvent = {
//         year: year,
//         month: month,
//         day: day,
//         hour:hour,
//         weekDay:weekDay,
//         events:events,
//     };
//     dayMonthHistoricFun(dayEvent);
// }
// function dayMonthHistoricFun(event){
//     monthDayArray.push(event)
//     // monthDayArray[15].dayEvent.events.push("tontolaba");
// }
// function createDayEvent(year = null, month = "default", day = null,hour = "default", weekDay="weekDay", title = "default", initialDate = "default", endDateCheck = false, endDate= "default", remindCheck = false, remindTime = "default", description = "default",eventTipe = "default") {
//     dayEvent = {
//     year: year,
//     month: month,
//     day: day,
//     hour:hour,
//     weekDay:weekDay,
//     title: title,
//     initialDate: initialDate,
//     endDateCheck: endDateCheck,
//     endDate: endDate,
//     remindCheck: remindCheck,
//     remindTime: remindTime,
//     description: description,
//     eventTipe: eventTipe,
//     };
//     eventHistoricFun(dayEvent);
// }
// function eventHistoricFun(event){
//     eventHistoricArray.push(event)
// }

