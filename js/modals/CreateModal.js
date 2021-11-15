import { element, readArray } from "../variables.js";

class CreateModal{

    #structure = [
                   //modal
                   element("div", null, "modal", "tabindex", "-1"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                            element("span"),
                            [
                                element("img", null, null, "src", "../assets/imgs/menu.png")
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
                                element("input", "title"),
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
                                    element("span", null, null,  null, null, "Sábado, 13 de noviembre"),
                                    element("span", null, null,  null, null, "12:00 - 1:00")
                                ],
                                element("span"),
                                [
                                    element("img", null, null, "src", "../assets/imgs/calendar.png")
                                ]
                            ],
                            //description
                            element("div", null, "submodal description"),
                            [
                                element("span"),
                                [
                                    element("img", null, "flipX", "src", "../assets/imgs/description.png")
                                ],
                                element("p", null, "description-p", null, null, "Add a description"),
                            ],
                            //save
                            element("div", null, "submodal save"),
                            [
                                element("button", null, "save-button", null, null, "Save")
                            ]
                        ]
                       ]
                ];

    constructor(){
        readArray(this.#structure);
        
        const modal = document.querySelector(".modal");
        
        const title = document.getElementById("title");
        title.setAttribute("placeholder", "Add a title");
        
        const close = document.getElementById("close-modal");
        close.addEventListener("click", function(){
            modal.parentNode.removeChild(modal);
        });
        
        const description = document.querySelector(".description-p");
        description.addEventListener("click", function(){
            description.parentNode.appendChild(element("textarea", null, "description-textarea"));
            description.parentNode.removeChild(description);
        });

        this.focus();
        modal.addEventListener("focusout", function(e){
            if(e.sourceCapabilities === null) return;
            if( e.relatedTarget === modal ||
                e.relatedTarget === modal.childNodes[1].childNodes[0].childNodes[0] ||
                e.relatedTarget === modal.childNodes[1].childNodes[2].childNodes[1] ||
                e.relatedTarget === modal.childNodes[1].childNodes[3].childNodes[0]){} 
            else modal.parentNode.removeChild(modal);
        });
        
    }

    focus(){
        const modal = document.querySelector(".modal");
        if(modal !== undefined){
            modal.focus();
        }
    }

}

export default CreateModal;