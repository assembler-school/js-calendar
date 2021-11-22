const eventCreator = document.getElementById("buttonaddevent");
eventCreator.addEventListener("click", createNewEvent);

var errors = document.getElementById("error")


function createNewEvent(i){
    var eventDiv = document.createElement("div")
    eventDiv.setAttribute("id", "Mymodal");
    eventDiv.className = "modal";
    document.body.appendChild(eventDiv);
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    eventDiv.appendChild(modalContent);

    const html = `<span class="close" id="closeModal">&times;</span>
    <h2 class = "newEventTitle">New Event</h2>
    <div class="gridForm">
        <label for="eventName" id = "labelName">event name: </label>
        <input type="text" name="eventName" id="eventName" placeholder = "name...">
        <label for="initDate" id = "labelDate" >Initial date: </label>
        <input type="datetime-local" name="initDate" id="initDate">
        <input type="checkbox" name="endDate?" id = "checkEnd">
        <label for="endDate?" id ="labelEndDate">End date</label>
        <label for="endDate" id ="labelEndDate2">End date: </label>
        <input type="datetime-local" name="endDate" id= "endaDate">
        <input type="checkbox" name="reminder" value="reminder" id="checkReminder">
        <label for="reminder" id= "labelCheckRem">Remind me when this event expires:</label>
        <label for="select" id = "labelSelect">Time:</label>
        <select name="select" id = "reminder">
            <option value="5">5 min</option>
            <option value="10" selected>10 min</option>
            <option value="60">1 hour</option>
            <option value="24">1 day</option>
        </select>
        <label for="textarea" id = "labelText">Description:</label>
        <textarea name="textarea" rows="5" cols="40" placeholder="Add some info..." id = "description"></textarea>
        <label for="eventType" id ="labelEvent">Event type:</label>
        <select name="eventType" id="eventType">
            <option value="---">---</option>
            <option value="meeting">meeting</option>
            <option value="sport">sport</option>
            <option value="leisure">leisure</option>
        </select>
    </div>
    <div class="createButtons">
        <button id="cancelEvent">Cancel</button>
        <button id="createEvent">Create</button>
    </div>
    <div id="error"></div>`
    
    modalContent.innerHTML = html;

    document.getElementById("cancelEvent").addEventListener("click", closeModal);
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("createEvent").addEventListener("click", function() {createEvent(i)});
}

function closeModal(){
    var eventDiv = document.getElementById("Mymodal");
    eventDiv.remove();
    flag = false;
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
let flag = false;

function eventValidation(){
    var valueTitle = false;
    var valueInitDate = false;
    var valueReminder = false;
    var valueEndDate= false;
    if(/[a-zA-Z\d]{1,15}$/.test(document.getElementById("eventName").value)){
        valueTitle = true;
    }
    if(document.getElementById("initDate").value){
        valueInitDate = true;
    }
    if(document.getElementById("checkReminder").checked){
        if (document.getElementById("reminder").value) {
            valueReminder = true;
        }
    }else{
        valueReminder = true;
    }
    if(document.getElementById("checkEnd").checked){
        if(document.getElementById("endaDate").value){
            valueEndDate= true;
        }
    }else{
        valueEndDate= true;
    }
    if (valueTitle == true &&  valueInitDate == true && valueReminder == true && valueEndDate == true ) {
        var valueTitle = false;
        var valueInitDate = false;
        var valueReminder = false;
        var valueEndDate= false;
        return true;
    }
}


function createEvent(i){
    if(eventValidation()==true){
        if (flag == true){
            console.log(flag);
            removeEvents(i);
        }
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
        createYearMonthDays(selectedYear);
        eventDiv.remove();
        flag = false;
    }else{
        errors.textContent = "Write a name"
    }
}

function bigEvents(fecha1, fecha2){
    let dif = fecha2;
    
    while(dif> fecha1){
        console.log(dif);
        createEvent2(dif);
        dif = new Date(dif - (1*24*60*60*1000));
    }
}

