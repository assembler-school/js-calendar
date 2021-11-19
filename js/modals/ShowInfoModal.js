import { fetchEvents } from "../app.js";
import { element, readArray, setIsModalOpen, events } from "../variables.js";
import CreateModal from "./CreateModal.js";

class ShowInfoModal{

    #structure = [//modal
                   element("div", null, "modal", "tabindex", "-1"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                                element("span"),
                                [
                                    element("img", "remove-event", null, "src", "../assets/imgs/bin.png")
                                ],
                                element("span"),
                                [
                                    element("img", "edit-event", null, "src", "../assets/imgs/pencil.png")
                                ],
                                element("span"),
                                [
                                    element("img", "close-modal", null, "src", "../assets/imgs/close.png")
                                ]
                        ],
            
                        //body modal
                        element("div"),
                        [
                                //title
                                element("div", null, "submodal input-name"),
                                [
                                    element("span")
                                ],
                                //select date
                                element("div", null, "submodal date"),
                                [
                                    element("span"),
                                    [
                                        element("img", null, null, "src", "../assets/imgs/clock.png")
                                    ],
                                    element("div", null, "event-time"),
                                    [
                                        element("span"),
                                        element("span")
                                    ]
                                ]
                            ]
                        ]
                ];

    constructor(x, y, event){
        readArray(this.#structure);

        const modal = document.querySelector(".modal");

        const titleParent = document.querySelector(".input-name");
        titleParent.firstChild.textContent = event.title;

        const startDate = document.querySelector(".event-time");
        startDate.firstChild.textContent = event.day + " " + event.month + " " + event.year;
        startDate.lastChild.textContent = event.hour;

        if(event.hasEnd){
            const endDate = document.querySelector(".date");
            const endDateStructure = [
                                        element("div", null, "event-time end-day"),
                                        [
                                            element("span"),
                                            element("span")
                                        ]
                                    ];
            
            readArray(endDateStructure);

            const endDateText = document.querySelector(".end-day");
            endDateText.firstChild.textContent = event.endDay + " " + event.endMonth + " " + event.endYear;
            endDateText.lastChild.textContent = event.endHour;

            endDate.appendChild(element("span", null, null, null, null, "-"));
            endDate.appendChild(endDateText);
        }

        //edit event
        const editEvent = document.getElementById("edit-event");
        editEvent.addEventListener("click", function(){
            modal.parentNode.removeChild(modal);
            
            //Titulo / dia de la semana / hora / hasEnd / date end / description / type
            new CreateModal(x, (y + 80) / 2, null, event.day, event.month, event.year, event);
        });


        //remove event
        const removeEvent = document.getElementById("remove-event");
        removeEvent.addEventListener("click", function(){
            events.splice(events.indexOf(event), 1);
            localStorage.setItem("events", JSON.stringify(events));
            fetchEvents();
            setIsModalOpen(false);
            modal.parentNode.removeChild(modal);
        });

        //close event
        const close = document.getElementById("close-modal");
        close.addEventListener("click", function(){
            setIsModalOpen(false);
            modal.parentNode.removeChild(modal);
        });

        modal.addEventListener("keyup",(e)=>{
            if(e.key == "Escape") {
                setIsModalOpen(false);
                modal.parentNode.removeChild(modal);
            }
        });

        //modal listener
        this.focus();
        modal.addEventListener("focusout", function(e){
            if(e.sourceCapabilities === null) return;
            if( e.relatedTarget === modal ||
                e.relatedTarget === modal.childNodes[1].childNodes[0]){} //close-button
            else modal.parentNode.removeChild(modal);
        });
        
        //add event to calendar
        modal.style.left = x + "px";
        modal.style.top = y + "px";
    }

    focus(){
        const modal = document.querySelector(".modal");
        if(modal !== undefined){
            modal.focus();
        }
    }
}

export default ShowInfoModal;