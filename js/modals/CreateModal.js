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
                                element("img", null, "button-hover", null, "../assets/imgs/menu.png")
                            ],
                            element("span", null, "right"),
                            [
                                element("img", null, "button-hover", null, "../assets/imgs/close.png")
                            ]
                        ],
                        //body modal
                        element("div"),
                        [
                            //title
                            element("div", null, "submodal"),
                            [
                                element("input"),
                            ],
                            //select day/time
                            element("div", null, "submodal"),
                            [
                                element("span"),
                                [
                                    element("img", null, null, null, "../assets/imgs/clock.png")
                                ],
                                element("div"),
                                //next line only if we cant do previus step of select day in div
                                element("span"),
                                [
                                    element("img", null, null, null, "../assets/imgs/calendar.png")
                                ]
                            ],
                            //description
                            element("div", null, "submodal"),
                            [
                                element("span"),
                                [
                                    element("img", null, "flipX", null, "../assets/imgs/description.png")
                                ],
                                element("textarea"),
                            ],
                            //save
                            element("div", null, "submodal"),
                            [
                                element("button", null, null, "Save")
                            ]
                        ]
                       ]
                ];

    constructor(){
        readArray(this.#structure);
    }

    //this method is not neccesary
    getStructure(){
        return this.#structure;
    }

}

export default CreateModal;