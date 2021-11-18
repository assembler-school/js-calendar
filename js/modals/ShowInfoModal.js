import { element, readArray, setIsModalOpen } from "../variables.js";

class ShowInfoModal{

    #structure = [//modal
                   element("div", null, "modal", "tabindex", "-1"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                            element("div", null, "modal-top show-modal"),
                                [
                                    element("span"),
                                    [
                                        element("img", null, null, "src", "../assets/imgs/pencil.png")
                                    ],
                                    element("span"),
                                    [
                                        element("img", null, null, "src", "../assets/imgs/bin.png")
                                    ]
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