function modalEvent(i){
    var eventDiv = document.createElement("div")
    eventDiv.setAttribute("id", "modalEvent");
    eventDiv.className = "modalEvent";
    document.body.appendChild(eventDiv);
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content-event";
    eventDiv.appendChild(modalContent);
    var titlediv = document.createElement("div");
    titlediv.textContent = historicEvents[i].title;
    modalContent.appendChild(titlediv);
}