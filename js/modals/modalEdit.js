import { createBackground } from "../app.js"
export default function createModalToEdit(e){
    createBackground();
    const eventStartDate=e.target.querySelector(".event-data").innerText;
    console.log(eventStartDate);
    console.log(e.target.attributes["0"].nodeValue);
    const dayEventPicked=e.target.parentNode.parentNode.firstChild.attributes[1].nodeValue;
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
        console.log("clicked");
        //LLEVA OTRA VEZ AL CREATE MODAL
    });
    icon[1].addEventListener("click",()=>{
        console.log("delete event");
        e.target.parentNode.removeChild(e.target);
        closeModalToEdit();
    });
    icon[2].addEventListener("click",closeModalToEdit,{once:true});

    
    //Spawn title
    const spanTitle=document.createElement("span");
    spanTitle.classList.add("itemEditModal");
        spanTitle.id="eventTitle";
        spanTitle.innerHTML=/*aqui vale el title*/"<h2>"+e.target.innerText+"</h2>"+
        /*fecha inicio*/"<p>"+eventStartDate;
    divItems.appendChild(spanTitle);
    //Spawn alert
    const spanAlert=document.createElement("span");
        spanAlert.classList=("itemEditModal");
        spanAlert.id="item-alert"
        spanAlert.innerHTML="<img src='assets/imgs/bell-solid.svg'><p>"+"30 minutos antes"+"</p>";
    divItems.appendChild(spanAlert);
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
        console.log("paso");
        closeModalToEdit();
    };
    
}