export default function createModalToEdit(e){
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
    //event listeners for icons

    const icon1=document.getElementsByClassName("iconEditModal")[0];
    icon1.addEventListener("click",()=>{
        console.log("clicked");
        //LLEVA OTRA VEZ AL CREATE MODAL
    })
    //Spawn title
    const spanTitle=document.createElement("span");
    spanTitle.classList.add("itemEditModal");
        spanTitle.id="eventTitle";
        spanTitle.innerHTML=/*aqui vale el title*/"<h2>"+"Evento"+"</h2>"+
        /*fecha inicio*/"<p>"+"16 noviembre 2021"+"-"+
        /*Fecha fin*/"16 noviembre 2021"+"</p>";
    divItems.appendChild(spanTitle);
    //Spawn alert
    const spanAlert=document.createElement("span");
        spanAlert.classList=("itemEditModal");
        spanAlert.id="item-alert"
        spanAlert.innerHTML="<img src='assets/imgs/bell-solid.svg'><p>"+"30 minutos antes"+"</p>";
    divItems.appendChild(spanAlert);
}