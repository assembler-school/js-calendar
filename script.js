window.onload = init;

var dayDiv = document.querySelector("#month-container");
var monthDiv = document.querySelector("#year-container");
var dayNameContainer = document.getElementById("day-name");
var dayNameContainerH1 = document.getElementById("day-name-h1");
var monthNameContainerH1 = document.getElementById("month-name-h1");
var yearNameContainerH1 = document.getElementById("year-name-h1");

var nextMonth = document.querySelector("#cssnextmonth");
var previousMonth = document.querySelector("#csspreviousmonth");
var nextYear = document.querySelector("#leftchange");
var previousYear = document.querySelector("#rightchange");

var actualMonth = document.querySelector("#actualmonth")
var actualYear = document.querySelector("#year-text")

var nextMonthH = document.querySelector("#nextmonth");
var previousMonthH = document.querySelector("#previousmonth");

nextMonth.addEventListener("click", changeYear);
previousMonth.addEventListener("click", changeYear);
nextYear.addEventListener("click", changeYear);
previousYear.addEventListener("click", changeYear);

var hourDiv = document.querySelector("#day-container");

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
    createYearMonthDays(selectedYear,selectedMonth)
    refreshContainers();
    //createMonthDays();
}
function refreshContainers(){
    dayNameContainerH1.textContent = dayNameArr[today.getDay()] + selectedDay;
    actualMonth.textContent = monthNameArr[selectedMonth];
    if (selectedMonth > 10){
        nextMonthH.textContent = monthNameArr[selectedMonth-11];
    }else{
    nextMonthH.textContent = monthNameArr[selectedMonth+1];
    }
    if (selectedMonth < 1){
        previousMonthH.textContent = monthNameArr[selectedMonth+11];
    }else{
        previousMonthH.textContent = monthNameArr[selectedMonth-1];
    }
    
    actualYear.textContent = selectedYear;
}
function changeYear(event){
    switch (event.target.id) {
        case "nextmonth":
            selectedMonth++;
            if (selectedMonth > 11){
                selectedMonth = 0;
                selectedYear++;
            }else{
            }
            console.log(selectedMonth)
            createYearMonthDays(selectedYear)
            refreshContainers()
            break;
        case "previousmonth":
            selectedMonth--;
            if (selectedMonth < 0){
                selectedMonth = 11;
                selectedYear--;
            }
            console.log(selectedMonth)
            createYearMonthDays(selectedYear)
            refreshContainers()
            break;
        case "rightchange":
            selectedYear++;
            createYearMonthDays(selectedYear,selectedMonth)
            refreshContainers()
            break;
        case "leftchange":
            selectedYear--;
            createYearMonthDays(selectedYear,selectedMonth)
            refreshContainers()
            break;
        default:
            break;
    }
}
function createMonthDays(year,month){
    deleteMonthDays();
    createDay(year,month);
    createHoursFun(selectedDay);
    addEventsListeners();
}
function createDay(year,month){
    var num = new Date(year,month+1,0).getDate();
    var firstDayMonth = new Date(year,month,1).getDay();
    var lastDayMonth = new Date(year,month+1,0).getDay();
    var countday = 1;
    let countweek = firstDayMonth;
    let firstWeek = firstDayMonth;
    let lastWeek = lastDayMonth;
    if(firstWeek==0){
        firstWeek=7;
    }
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
        if(countday == todayNumDay && todayMonth==month && todayYear==year){
            day.classList.add("today-special-day")
        }
        dayDiv.appendChild(day)
        var dayInner = document.createElement("div");
        dayInner.setAttribute("id","day-container-inner" + countday);
        dayInner.classList.add("day-container-inner")
        dayInner.textContent = countday;
        day.appendChild(dayInner);
        assignEvent(countday,day);

        generateGridButton(dayInner,countday);
        countday++
        if(countweek>=6){
            countweek=0;
        }else{
            countweek++;
        }
    }
    if(lastWeek == 0){
        lastWeek = 7;
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
var i;
function assignEvent(countday,day){
    i = 0
    while(i < (historicEvents.length)){
        if(historicEvents[i].day == (countday) && historicEvents[i].month == selectedMonth && historicEvents[i].year == selectedYear){
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
        console.log(sel)
        sel.addEventListener("click",(e)=>{
            for (x=1; x<daisMonth2.length+1; x++){
                console.log(daisMonth2)
                document.getElementById("day-container-"+x).classList.remove("e-selected-day");
                if (e.target.matches(".day-container")) {
                    //dayNameContainerH1.textContent=e.target.innerText;
                }
            }
            if (e.target.matches(".day-container")) {
                e.target.classList.add("e-selected-day")
                //selectedDay = e.target
            }
        })
    });
}
function addEventsListenersYear(){
    //var daisMonthYear = document.querySelectorAll(".month-container-year")
    var daisMonthYear = document.querySelectorAll("#year-container")
    var daisMonthYear2 = document.getElementsByClassName("day-container-year")

    daisMonthYear.forEach(sel =>{
        console.log(sel)
        sel.addEventListener("click",(e)=>{
            m = new RegExp('\d');
            for (x=1; x<daisMonthYear2.length+1; x++){
                //console.log(daisMonthYear2)
                console.log(document.getElementById("day-container-year-" + m + "-" + x))
                document.getElementById("day-container-year-"+ m + "-" + x).classList.remove("e-selected-day-year");
                if (e.target.matches(".day-container-year")) {
                    //dayNameContainerH1.textContent=e.target.innerText;
                }
            }
            //if (e.target.matches(".day-container-year")) {
                e.target.classList.add("e-selected-day-year")
                console.log(e.target)
                //selectedDay = e.target
            //}
        })
    });
}
function loadStorage(){
    if (localStorage.getItem("historic") !== null) {
        historicEvents = JSON.parse(localStorage.getItem("historic"));
    }
}
function generateGridButton(e,countday) {
    let buttonDate;
    let buttonSpecific = document.createElement("button");
    buttonSpecific.setAttribute("class","buttonspecific");
    buttonSpecific.setAttribute("value",countday);
    buttonSpecific.textContent="+";
    //let buttonDate = new Date(selectedYear,selectedMonth,buttonSpecific.value,"T00:00");
    if(buttonSpecific.value<10){
        buttonDate = selectedYear+"-"+(selectedMonth+1)+"-0"+buttonSpecific.value+"T23:59";
    }else{
        buttonDate = selectedYear+"-"+(selectedMonth+1)+"-"+buttonSpecific.value+"T23:59";
    }
    buttonSpecific.addEventListener("click",function (){insertDataElement(buttonDate)});
    e.appendChild(buttonSpecific);
}
function insertDataElement(a){
    console.log(a);
    console.log(a)
    createNewEvent();
    document.getElementById("initDate").value = a;
}
function createYearMonthDays(year){//
    deleteYearMonthDays();//
    let m = 0;//crear 12 meses
    while(m < 12){
        let selectedYearMonthDays = new Date(year,m+1,0).getDate();
        createDaysYear(year,selectedYearMonthDays,m);
        m++;
    }
    createMonthDays(selectedYear,selectedMonth)//dejar para crear meses
    addEventsListenersYear();
}
function deleteYearMonthDays(){//
    while (monthDiv.firstChild) {
        monthDiv.removeChild(monthDiv.lastChild)
    }
}
function createDaysYear(year,num,m){
    var firstDayMonthY = new Date(year,m,1).getDay();//0-7
    var lastDayMonthY = new Date(year,m+1,0).getDay();//0-7
    var countday = 1;
    let countweek = firstDayMonthY;
    let firstWeek = firstDayMonthY;
    let lastWeek = lastDayMonthY;
    var monthEmpty = document.createElement("div");
    monthEmpty.setAttribute("id","month-container-year-" + m)
    monthEmpty.classList.add("month-container-year")
    monthDiv.appendChild(monthEmpty)
    if(firstWeek==0){
        firstWeek=7;
    }
    while(firstWeek > 1){
        var dayEmpty = document.createElement("div");
        dayEmpty.setAttribute("id","day-container-year-empty-" + m + "-" + firstWeek);
        dayEmpty.classList.add("day-container-year-empty")
        monthEmpty.appendChild(dayEmpty)
        firstWeek--;
    }
    while (countday <= num) {
        var day = document.createElement("div");
        day.setAttribute("id","day-container-year-" +m+"-"+ countday);
        day.classList.add("day-container-year")
        if(countday == todayNumDay && todayMonth == m && todayYear == year){
            day.classList.add("today-special-year-day")
        }
        monthEmpty.appendChild(day)
        var dayInner = document.createElement("div");
        dayInner.setAttribute("id","day-container-year-inner-" + m + "-" + countday);
        dayInner.classList.add("day-container-year-inner")
        dayInner.textContent = countday;
        day.appendChild(dayInner);
        assignEventYear(countday,day,m);  
        countday++
        if(countweek>=6){
            countweek=0;
        }else{
            countweek++;
        }
    }
    if(lastWeek == 0){
        lastWeek = 7;
    }
    while(lastWeek <= 6){
        var dayEmptyLast = document.createElement("div");
        dayEmptyLast.setAttribute("id","day-container-year-empty" + m + "-" + lastWeek);
        dayEmptyLast.classList.add("day-container-year-empty");
        monthEmpty.appendChild(dayEmptyLast);
        lastWeek++;
    }
    countday=1;
}
function assignEventYear(countday,day,m){
    i = 0
    while(i < (historicEvents.length)){
        if(historicEvents[i].day == (countday) && historicEvents[i].month == m && historicEvents[i].year == selectedYear){
            displayEventsPerDayYear(day,i,m)
        }
        i++;
    }
}
function displayEventsPerDayYear(day,i,m){
    let createDivEvent = document.createElement("div");
    createDivEvent.setAttribute("id","event-container-year" + i);
    createDivEvent.classList.add("event-container-year");
    if(historicEvents[i].eventTipe === "---"){
        day.classList.add("default")
    }
    if(historicEvents[i].eventTipe === "sport"){
        day.classList.add("sports")
    }
    if(historicEvents[i].eventTipe === "meeting"){
        day.classList.add("meeting")
    }
    if(historicEvents[i].eventTipe === "leisure"){
        day.classList.add("leisure")
    }
    createDivEvent.addEventListener("click",function() { modalEvent(i)})
    day.appendChild(createDivEvent);
}
