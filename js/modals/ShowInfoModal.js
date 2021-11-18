import { element, readArray } from "../variables.js";

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
                                    element("span", null, null, null, null, "Title")
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
                                        element("span", null, null, null, null, "Date"),
                                        element("span", null, null, null, null, "Time")
                                    ],
                                    element("span", null, null, null, null, "-"),
                                    element("div", null, "event-time"),
                                    [
                                        element("span", null, null, null, null, "EndDate"),
                                        element("span", null, null, null, null, "EndTime")
                                    ]
                                ]
                            ]
                        ]
                ];

    constructor(x, y){
        readArray(this.#structure);
        
        const modal = document.querySelector(".modal");

        //close event
        const close = document.getElementById("close-modal");
        close.addEventListener("click", function(){
            modal.parentNode.removeChild(modal.previousElementSibling);
            modal.parentNode.removeChild(modal);
        });


        //modal listener
        this.focus();
        modal.addEventListener("focusout", function(e){
            modal.parentNode.removeChild(modal.previousElementSibling);
            modal.parentNode.removeChild(modal);
        });


        modal.addEventListener("keyup",(e)=>{
            if(e.key == "Escape"){
                modal.parentNode.removeChild(modal.previousElementSibling);
                modal.parentNode.removeChild(modal);
            }
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