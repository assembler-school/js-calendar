import { element, readArray } from "../variables.js";

class ShowInfoModal{

    #structure = [//modal
                   element("div", null, "modal", "tabindex", "-1"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                            element("span"),
                            [
                                element("img", null, null, "src", "../assets/imgs/pencil.png")
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

        //add event to calendar
        modal.style.left = x + "px";
        modal.style.top = y + "px";
    }
}

export default ShowInfoModal;