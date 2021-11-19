import { createBackground, fetchEvents } from "../app.js"
import { weekdays } from "../variables.js";
export default function createModalToEdit(e){
    
    createBackground();
    const getID=e.target.attributes[0].nodeValue; //getID from event clicked
    const arrayEvents=JSON.parse(localStorage.getItem("events")); //parse arrayEvents
    const eventSelected=arrayEvents.find(event=>event.eventID==getID); //Find event
    const eventStartDate=eventSelected.day+","+eventSelected.startDate; //date of
    const eventEndDate=eventSelected.endDay+","+eventSelected.endDay+"/"+eventSelected.endMonth+"/"+eventSelected.endYear;
  console.log(eventSelected.dayWeek);
    //const dayEventPicked=e.target.parentNode.parentNode.firstChild.attributes[1].nodeValue;
    //body declaration
    const body=document.getElementsByClassName("body")[0];
    //icons
    const arrayPhotos=[
        "pencil.svg",
        "trash.svg",
        "close.png"
    ]
    //elements declaration
    const divParent=document.createElement("div")
        divParent.id="modal-edit-container";

    const divIcons=document.createElement("div")
        divIcons.id="icons";

    const divItems=document.createElement("div")
        divItems.id="items";

    //where to spawn
    console.log(e.clientX);
    //X position (depends where you clicked)
    if(e.clientX<500)divParent.style.left=e.clientX+"px";
    else{
        divParent.style.left=(e.clientX-500)+"px";
    }
    //Y position
    divParent.style.top=e.clientY+"px";
    //spawn elements
    
    body.appendChild(divParent);
    divParent.appendChild(divIcons);
    divParent.appendChild(divItems);
    
    //spawn icons
    for (let i = 0; i < arrayPhotos.length; i++) {
        const element = document.createElement("img");
        element.classList.add("iconEditModal");
        element.src="assets/imgs/"+arrayPhotos[i];
        divIcons.appendChild(element);
    }
    //event listener for focus out window
    window.addEventListener("click",removeModalClickOut);
    //event listeners for icons
    const icon=document.getElementsByClassName("iconEditModal");
    icon[0].addEventListener("click",()=>{
        //LLEVA OTRA VEZ AL CREATE MODAL
    },{once:true});
    //DELETE EVENT
    icon[1].addEventListener("click",()=>{
        arrayEvents.splice(arrayEvents.indexOf(eventSelected),1);
        localStorage.setItem("events",JSON.stringify(arrayEvents));
        e.target.parentNode.removeChild(e.target);
        closeModalToEdit();
    },{once:true});
    icon[2].addEventListener("click",closeModalToEdit,{once:true});

    
    //Spawn title
    const spanTitle=document.createElement("span");
    spanTitle.classList.add("itemEditModal");
    spanTitle.id="item-title";
    spanTitle.innerHTML=/*aqui vale el title*/"<h2>"+eventSelected.title+"</h2>"
    if(!eventSelected.hasEnd){
        /*fecha inicio*/spanTitle.innerHTML+="<p>"+eventStartDate+"</p>";
    }
       else{
           spanTitle.innerHTML+="<p>"+eventStartDate+"-"+eventEndDate+"</p>";}
    divItems.appendChild(spanTitle);
    //spawn description
    if(eventSelected.description!=undefined){
        const spanDescription=document.createElement("span");
        spanDescription.classList.add("itemEditModal");
        spanDescription.id="item-description";
        spanDescription.innerHTML=`<img src="assets/imgs/description.png" alt="description">${eventSelected.description}`
        divItems.appendChild(spanDescription);
    }
    //Spawn alert
    if(eventSelected.hasReminder){
        const spanAlert=document.createElement("span");
            spanAlert.classList=("itemEditModal");
            spanAlert.id="item-alert"
            spanAlert.innerHTML="<img src='assets/imgs/bell-solid.svg'><p>"+eventSelected.reminder+"</p>";
            divItems.appendChild(spanAlert);
        }
}

function closeModalToEdit(){
    const modal = document.getElementById("modal-edit-container");
    modal.parentNode.removeChild(modal.previousElementSibling);
    modal.parentNode.removeChild(modal);
    window.removeEventListener("click",removeModalClickOut);
}
function removeModalClickOut(e){
    const modalBackground=document.getElementsByClassName("modalBackground")[0];
    if(e.target==modalBackground){
        closeModalToEdit();
    };
    
}