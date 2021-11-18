function modalEvent(i){
    var eventDiv = document.createElement("div")
    eventDiv.setAttribute("id", "MymodalEvent");
    eventDiv.className = "modal";
    document.body.appendChild(eventDiv);
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content-event";
    eventDiv.appendChild(modalContent);
    const htmlModal= `<span class="close" id="closeModalEvent">&times;</span>
    <div id = "modalEventContainer">
        <h2>Event:</h2>
        <div id = "titleDiv"></div>
        <h2>Initial date:</h2>
        <div id = "initDateDiv"></div>
        <h2>End date:</h2>
        <div id = "endDateDiv"></div>
        <h2>Description</h2>
        <div id = "descriptionDiv"></div>
        <h2>Type event:</h2>
        <div id = "typeDiv"></div>
        <button id = "removeEvent">Remove</button>
        <button id = "editEvent">Edit</button>
    </div>`;
    modalContent.innerHTML= htmlModal;
    var titlediv = document.getElementById("titleDiv");
    titlediv.textContent = historicEvents[i].title;
    var initDateDiv = document.getElementById("initDateDiv");
    initDateDiv.textContent = historicEvents[i].initialDate;
    var endDateDiv = document.getElementById("endDateDiv");
    endDateDiv.textContent = historicEvents[i].endaDate;
    var descriptionDiv = document.getElementById("descriptionDiv");
    descriptionDiv.textContent = historicEvents[i].description;
    var typeDiv = document.getElementById("typeDiv");
    typeDiv.textContent = historicEvents[i].eventTipe;
    console.log(historicEvents);

    document.getElementById("removeEvent").addEventListener("click", function() {removeEvents1(i)});
    document.getElementById("closeModalEvent").addEventListener("click", closeModalEvent);
    document.getElementById("editEvent").addEventListener("click", function(){editEvents(i)})
}
function removeEvents1(i){
    removeEvents(i);
    closeModalEvent();
}

function editEvents(i){
    flag = true;
    closeModalEvent();
    console.log(flag);
    createNewEvent(i);
    editForm(i);
    createMonthDays();
}

function editForm(i){
    document.getElementById("eventName").value = historicEvents[i].title;
    document.getElementById("initDate").value = historicEvents[i].initialDate;
    document.getElementById("checkEnd").checked = true;
    document.getElementById("endaDate").value = historicEvents[i].endaDate;
    document.getElementById("description").value = historicEvents[i].description;
    document.getElementById("eventType").value = historicEvents[i].eventTipe;
}

function removeEvents(i){
    let l = 0;
    let elementborrar = historicEvents[i];
    while (l < historicEvents.length){
        if( elementborrar.title == historicEvents[l].title && elementborrar.initialDate == elementborrar.initialDate && elementborrar.endaDate == historicEvents[l].endaDate){
            historicEvents.splice(l, 1);
        }
        else{
            l++;
        }
    }
    console.log(historicEvents);
    localStorage.setItem("historic",JSON.stringify(historicEvents));
    // closeModalEvent();
    createMonthDays();
    flag = false;
}

function closeModalEvent(){
    var eventDiv = document.getElementById("MymodalEvent");
    eventDiv.remove();
}