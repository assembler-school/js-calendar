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
console.log(typeof(today))
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
console.log(selectedMonthDays)

var firstDayMonth = new Date(selectedYear,selectedMonth,1).getDay();
var firstDayWeekMonthName = dayNameArr[firstDayMonth]

console.log(firstDayMonth)
console.log(firstDayWeekMonthName)



function createMonthDays(){
    createDay(selectedMonthDays);
    createHoursFun(selectedDay)
    addEventsListeners()
}
function createDaysHours(){
    createHoursFun(selectedDay)
}
function createDay(num){
    var countday = 1;
    let countweek = firstDayMonth;
    let firstWeek = firstDayMonth;
    let lastWeek = firstDayMonth;
    while(firstWeek > 1){
        var dayEmpty = document.createElement("div");
        dayEmpty.setAttribute("id","day-container-empty" + firstWeek);
        dayEmpty.classList.add("day-container-empty")
        dayDiv.appendChild(dayEmpty)
        firstWeek--;
        console.log(firstWeek)
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
        var dayTitle = document.createElement("div");
        dayTitle.setAttribute("id","day-container-title" + countday);
        dayTitle.classList.add("eventTitle")
        day.appendChild(dayTitle);
        var i = 0;
        createDayContent(selectedYear,selectedMonth,countday,"",dayNameArr[countweek],"");
        while(i < (historicEvents.length)){
            if(historicEvents[i].day == (countday)){
                monthDayArray[countday - 1].events += historicEvents[i].title;
                console.log("entree")
            }
            i++;
        }
        dayTitle.textContent = monthDayArray[countday - 1].events;
        countday++
        if(countweek>=6){
            countweek=0;
        }else{
            countweek++;
        }
    }
    while(lastWeek < 5){
        var dayEmptyLast = document.createElement("div");
        dayEmptyLast.setAttribute("id","day-container-empty"+lastWeek);
        dayEmptyLast.classList.add("day-container-empty")
        dayDiv.appendChild(dayEmptyLast)
        lastWeek++;
    }
    countday=1;
}
function createDayContent(year = null, month = "default", day = null, hour="hour", weekDay="weekDay", events="") {
    dayEvent = {
        year: year,
        month: month,
        day: day,
        hour:hour,
        weekDay:weekDay,
        events:events,
    };
    dayMonthHistoricFun(dayEvent);
}
function dayMonthHistoricFun(event){
    monthDayArray.push(event)
    // monthDayArray[15].dayEvent.events.push("tontolaba");
}
console.log(monthDayArray)
function createDayEvent(year = null, month = "default", day = null,hour = "default", weekDay="weekDay", title = "default", initialDate = "default", endDateCheck = false, endDate= "default", remindCheck = false, remindTime = "default", description = "default",eventTipe = "default") {
    dayEvent = {
    year: year,
    month: month,
    day: day,
    hour:hour,
    weekDay:weekDay,
    title: title,
    initialDate: initialDate,
    endDateCheck: endDateCheck,
    endDate: endDate,
    remindCheck: remindCheck,
    remindTime: remindTime,
    description: description,
    eventTipe: eventTipe,
    };
    eventHistoricFun(dayEvent);
}
function eventHistoricFun(event){
    eventHistoricArray.push(event)
}
console.log(eventHistoricArray)

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
            console.log(e)
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



