//! Objects
var eventsByDate = {};
var eventsById = [];
var remindersByDate = [];
var remindersById = [];
var eventIndex = 0;
let calendarEvent = class {
    constructor (title,startDate,endDate, reminder, description, eventType, id) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reminder = reminder;
        this.description = description;
        this.eventType = eventType;
        this.id = id;
    }
    /* get idNum () {
        return this.id;
    } */
}


let formLS = document.querySelector("form");

let createBtn = document.getElementById("m-createBtn");

createBtn.addEventListener('click', createEvent);

function createEvent() {
    /* getModalData (titleF, iniDateF. enDateF, reminderF, descriptionF, eventTF); */
    titleF = document.getElementById("title").value;
    iniDateF = document.getElementById("initialDate").value;
    const enDateF = document.getElementById("endDate").value;
    const reminderF = document.getElementById("time").value;
    const descriptionF = document.getElementById("description").value;
    const eventTF = document.getElementById("event-type").value;
    //*converting date to Date object
    let formattedIniDate = new Date(iniDateF);
    const startDate = formattedIniDate.getDate();
    const startYear = formattedIniDate.getFullYear();
    const startMonth = formattedIniDate.getMonth();






    //* Saving in eventsById
    let newEvent = new calendarEvent(titleF, iniDateF, enDateF, reminderF, descriptionF, eventTF,eventIndex);
    eventsById.push(newEvent);

    //* Saving in eventsByDate
    if (!eventsByDate["" + startYear + "-" + startMonth + "-" + startDate]) {
        eventsByDate["" + startYear + "-" + startMonth + "-" + startDate] = [];
    }
    eventsByDate["" + startYear + "-" + startMonth + "-" + startDate].push(eventIndex);



    localStorage.setItem("eventsById", JSON.stringify(eventsById));
    localStorage.setItem("eventsByDate", JSON.stringify(eventsByDate));
    //console.log(titleF,iniDateF,enDateF,reminderF,descriptionF,eventTF);
    eventIndex += 1;
}
/* createEvent(); */
/* function getModalData (titleF, iniDateF, enDateF, reminderF, descriptionF, eventTF) {
    



} */

