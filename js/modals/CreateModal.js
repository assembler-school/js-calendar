import { element, readArray } from "../variables.js";

class CreateModal {

    #structure = [
                   //modal
                   element("div", null, "modal"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                            element("span"),
                            [
                                element("img", null, null, null, "../assets/imgs/menu.png")
                            ],
                            element("span"),
                            [
                                element("img", null, null, null, "../assets/imgs/close.png")
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
                                    element("img", null, null, null, "../assets/imgs/clock.png")
                                ],
                                element("div", null, "event-time"),
                                [
                                    element("span", null, null, "Sábado, 13 de noviembre"),
                                    element("span", null, null, "12:00 - 1:00")
                                ],
                                element("span"),
                                [
                                    element("img", null, null, null, "../assets/imgs/calendar.png")
                                ]
                            ],
                            //description
                            element("div", null, "submodal description"),
                            [
                                element("span"),
                                [
                                    element("img", null, "flipX", null, "../assets/imgs/description.png")
                                ],
                                element("p", null, "description-p", "Add a description"),
                            ],
                            //save
                            element("div", null, "submodal save"),
                            [
                                element("button", null, "save-button", "Save")
                            ]
                        ]
                       ]
                ];

    constructor(){
        readArray(this.#structure);
        const title = document.getElementById("title");
        title.setAttribute("placeholder", "Add a title");


        //calculate invoker and position
        


    }

    //this method is not neccesary
    getStructure(){
        return this.#structure;
    }

}

export default CreateModal;