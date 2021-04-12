let formLS = document.querySelector("form");

let createBtn = document.getElementById("m-createBtn");

createBtn.addEventListener('click', createEvent);

function createEvent() {
    let titleF = document.getElementById("title").value;
        iniDateF = document.getElementById("initialDate").value;
        enDateF = document.getElementById("endDate").value;
        reminderF = document.getElementById("time").value;
        descriptionF = document.getElementById("description").value;
        eventTF = document.getElementById("event-type").value;

    console.log(titleF,iniDateF,enDateF,reminderF,descriptionF,eventTF);
}
createEvent();