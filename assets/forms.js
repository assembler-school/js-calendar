const eventCreator = document.getElementById("buttonaddevent");
eventCreator.addEventListener("click", createNewEvent);

function createNewEvent(){
    var eventDiv = document.createElement("div")
    eventDiv.setAttribute("id", "Mymodal");
    eventDiv.className = "modal";
    document.body.appendChild(eventDiv);
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    eventDiv.appendChild(modalContent);

    const html = `<span class="close" id="closeModal">&times;</span>
    <div class="gridForm">
        <h2>New Event</h2>
        <label for="eventName">event name: </label>
        <input type="text" name="eventName" id="eventName" placeholder = "name...">
        <label for="initDate">Initial date: </label>
        <input type="datetime-local" name="initDate" id="initDate">
        <input type="checkbox" name="endDate?" id = "checkEnd">
        <label for="endDate?">End date</label>
        <label for="endDate">End date: </label>
        <input type="datetime-local" name="endDate" id= "endaDate">
        <input type="checkbox" name="reminder" value="reminder" id="checkReminder">
        <label for="reminder">Remind me when this event expires:</label>
        <label for="select">Time:</label>
        <select name="select" id = "reminder">
            <option value="5">5 min</option>
            <option value="10" selected>10 min</option>
            <option value="60">1 hour</option>
            <option value="24">1 day</option>
        </select>
        <label for="textarea">Description:</label>
        <textarea name="textarea" rows="5" cols="40" placeholder="Add some info..." id = "description"></textarea>
        <label for="eventType">Event type:</label>
        <select name="eventType" id="eventType">
            <option value="---">---</option>
            <option value="meeting">meeting</option>
            <option value="sport">sport</option>
            <option value="leisure">leisure</option>
        </select>
    </div>
    <button id="cancelEvent">Cancel</button>
    <button id="createEvent">Create</button>`
    modalContent.innerHTML = html;

    document.getElementById("cancelEvent").addEventListener("click", closeModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("createEvent").addEventListener("click", createEvent);
}

function closeModal(){
    var eventDiv = document.getElementById("Mymodal");
    eventDiv.remove();
}
let newDayEvent = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    // endYear: 0,
    // endMonth: 0,
    // endDay: 0,
    // endHour: 0,
    title: "",
    initialDate: {},
    endaDate: {},
    remindTime: "",
    description: "",
    eventTipe: ""
    };

function initNewDayEvent(){
    newDayEvent = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        // endYear: 0,
        // endMonth: 0,
        // endDay: 0,
        // endHour: 0,
        title: "",
        initialDate: {},
        endaDate: {},
        remindTime: "",
        description: "",
        eventTipe: ""
        };
        return newDayEvent;
}

let historicEvents = [];

function createEvent2(fecha){
    initNewDayEvent();
    newDayEvent.year = fecha.getFullYear();
    newDayEvent.month = fecha.getMonth();
    newDayEvent.day = fecha.getDate();
    newDayEvent.hour = fecha.getHours();
    newDayEvent.title = document.getElementById("eventName").value;
    newDayEvent.initialDate = document.getElementById("initDate").value;
    newDayEvent.endaDate = document.getElementById("endaDate").value;
    if (document.getElementById("checkReminder").checked){
        newDayEvent.remindTime = document.getElementById("reminder").value;
    }
    else{
        newDayEvent.remindTime = null;
    }
    newDayEvent.description = document.getElementById("description").value;
    newDayEvent.eventTipe = document.getElementById("eventType").value;
    historicEvents.push(newDayEvent);
    localStorage.setItem("historic",JSON.stringify(historicEvents));
    console.log(newDayEvent.day);
}

function createEvent(){
    initNewDayEvent();
    let fecha = new Date(document.getElementById("initDate").value);
    newDayEvent.year = fecha.getFullYear();
    newDayEvent.month = fecha.getMonth();
    newDayEvent.day = fecha.getDate();
    newDayEvent.hour = fecha.getHours();
    newDayEvent.title = document.getElementById("eventName").value;
    newDayEvent.initialDate = document.getElementById("initDate").value;
    let endFecha = new Date(document.getElementById("endaDate").value);
    if (document.getElementById("checkEnd").checked){
        // newDayEvent.endYear = endFecha.getFullYear();
        // newDayEvent.endMonth = endFecha.getMonth();
        // newDayEvent.endDay = endFecha.getDate();
        // newDayEvent.endHour = endFecha.getHours();
        newDayEvent.endaDate = document.getElementById("endaDate").value;
    }
    else{
        // newDayEvent.endYear = fecha.getFullYear();
        // newDayEvent.endMonth = fecha.getMonth();
        // newDayEvent.endDay = fecha.getDate();
        // newDayEvent.endHour = fecha.getHours() + 1;
        newDayEvent.endaDate = newDayEvent.initialDate;
    }
    if (document.getElementById("checkReminder").checked){
        newDayEvent.remindTime = document.getElementById("reminder").value;
    }
    else{
        newDayEvent.remindTime = null;
    }
    newDayEvent.description = document.getElementById("description").value;
    newDayEvent.eventTipe = document.getElementById("eventType").value;
    historicEvents.push(newDayEvent);
    localStorage.setItem("historic",JSON.stringify(historicEvents));
    console.log(newDayEvent.day);
    if (document.getElementById("checkEnd").checked){
        bigEvents(fecha, endFecha);
    }
    var eventDiv = document.getElementById("Mymodal");
    createMonthDays();
    eventDiv.remove();
}

function bigEvents(fecha1, fecha2){
    let dif = fecha2;
    while(dif > fecha1){
        console.log(dif);
        createEvent2(dif);
        dif = new Date(dif - (1*24*60*60*1000));
    }
}
