import CalendarEvent from "../Event/CalendarEvent.js";
import { element, events, readArray, setIsModalOpen } from "../variables.js";
import { fetchEvents } from "../app.js"
let contID = 0;

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
                            //form
                            element("form", "main-form"),
                            [
                                //title
                                element("div", null, "submodal input-name"),
                                [
                                    element("input", "title", null, "maxlength", "60")
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
                                    ],
                                    element("span"),
                                    [
                                        element("input", "input-date", null, "type", "datetime-local")
                                    ]
                                ],
                                //checkbox date end
                                element("div", null, "submodal checkbox-date-end"),
                                [
                                    element("input", "date-checkbox", "checkbox", "type", "checkbox"),
                                    element("span", null, null, null, null, "End date")
                                ],
                                //checkbox reminder
                                element("div", null, "submodal checkbox-reminder"),
                                [
                                    element("input", "reminder-checkbox", "checkbox", "type", "checkbox"),
                                    element("span", null, null, null, null, "Reminder")
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
                                //type of event
                                element("div", null, "submodal type-event"),
                                [
                                    element("span", null, null, null, null, "Type of event:"),
                                    element("select", null, "select-type-event"),
                                        [
                                            element("option", null, null, "value", "1","Meeting"),
                                            element("option", null, null, "value", "2","Personal"),
                                            element("option", null, null, "value", "3","Study"),
                                            element("option", null, null, "value", "4","Other")
                                        ]
                                ],
                                //save
                                element("div", null, "submodal buttons"),
                                [
                                    element("button", "cancel-button", "button", null, null, "Cancel"),
                                    element("button", "save-button", "button", null, null, "Save")
                                ]
                            ]
                        ]
                       ]
                ];

    constructor(x, y, dayWeek, day, month, dataDate, editEvent){
        readArray(this.#structure);
        
        const modal = document.querySelector(".modal");
        const form = document.getElementById("main-form");

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
        
        //title input
        const title = document.getElementById("title");
        title.setAttribute("type", "text");
        title.required = true;
        if(editEvent) title.value = editEvent.title;
        else title.setAttribute("placeholder", "Add a title");
        
        //event-time
        const eventTime = document.querySelector(".event-time");
        if(editEvent) {
            eventTime.childNodes[0].textContent = editEvent.weekday + ", " + editEvent.day + " " + editEvent.month + " " + editEvent.year;
            eventTime.childNodes[1].textContent = editEvent.hour;
        }
        else {
            const time = new Date();
            eventTime.childNodes[0].textContent = dayWeek + ", " + day + " " + month;
            eventTime.childNodes[1].textContent = time.getHours() + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
        }

        const inputDate = document.getElementById("input-date");
        const today = new Date().toISOString().split(".")[0].split(":");
        inputDate.setAttribute("min", today[0] + ":" + today[1]);
        inputDate.addEventListener("change", function(){
            const shortDate = inputDate.value.split("T");
            const longDate = String(new Date(shortDate[0]).toLocaleString("en-GB", {weekday: "long", year: "numeric", month: "long", day: "numeric"})).split(" ");
            eventTime.childNodes[0].textContent = longDate[0] + " " + longDate[1] + " " + longDate[2] + " " + longDate[3];
            eventTime.childNodes[1].textContent = shortDate[1];
            const nextDate = document.querySelector(".next-date");
            if(nextDate){
                const nextHour = new Date();
                nextDate.childNodes[0].textContent = eventTime.childNodes[0].textContent;
                nextHour.setHours(eventTime.childNodes[1].textContent.split(":")[0]);
                nextDate.childNodes[1].textContent = (nextHour.getHours()+1) + ":" + eventTime.childNodes[1].textContent.split(":")[1];
                console.log("dentro");
            }
        });

        //date checkbox structure + add/remove
        const dateCheckbox = document.getElementById("date-checkbox");
        const dateEndStructure = [
                                    element("div", null, "submodal date date-end"),
                                        [
                                            element("span"),
                                            [
                                                element("img", null, null, "src", "../assets/imgs/clock.png")
                                            ],
                                            element("div", null, "event-time next-date"),
                                            [
                                                element("span"),
                                                element("span")
                                            ],
                                            element("span"),
                                            [
                                            element("input", "input-date-end", null, "type", "datetime-local")
                                            ]
                                        ]
                                ];

        if(editEvent && editEvent.hasEnd){
           dateCheckbox.checked = editEvent.hasEnd;
           checkedEndDate(dateCheckbox, dateEndStructure, eventTime, editEvent);
        }

        dateCheckbox.addEventListener("change", function(){
            checkedEndDate(dateCheckbox, dateEndStructure, eventTime, editEvent);
        });

        function checkedEndDate(dateCheckbox, dateEndStructure, eventTime, editEvent){
            const checkboxDateEnd = document.querySelector(".checkbox-date-end");
            readArray(dateEndStructure, null);
            if(dateCheckbox.checked === true){
                checkboxDateEnd.parentNode.insertBefore(dateEndStructure[0], checkboxDateEnd.nextSibling);
                const nextDate = document.querySelector(".next-date");
                if(editEvent && editEvent.hasEnd) {
                    nextDate.childNodes[0].textContent = editEvent.endWeekday + ", " + editEvent.endDay + " " + editEvent.endMonth + " " + editEvent.endYear;
                    nextDate.childNodes[1].textContent = editEvent.endHour;
                } else {
                    const nextHour = new Date();
                    nextDate.childNodes[0].textContent = eventTime.childNodes[0].textContent;
                    nextHour.setHours(eventTime.childNodes[1].textContent.split(":")[0]);
                    nextDate.childNodes[1].textContent = (nextHour.getHours()+1) + ":" + eventTime.childNodes[1].textContent.split(":")[1];
                }
                
                const inputEndDay = document.getElementById("input-date-end");
                const minDate = new Date(eventTime.childNodes[0].textContent).toLocaleString("default").split(" ")[0].split("/");
                inputEndDay.setAttribute("min", minDate[2] + "-" + minDate[1] + "-" + minDate[0] + "T" + eventTime.childNodes[1].textContent);
                inputEndDay.addEventListener("change", function(){
                    const shortDate = inputEndDay.value.split("T");
                    const longDate = String(new Date(shortDate[0]).toLocaleString("en-GB", {weekday: "long", year: "numeric", month: "long", day: "numeric"})).split(" ");
                    nextDate.childNodes[0].textContent = longDate[0] + " " + longDate[1] + " " + longDate[2] + " " + longDate[3];
                    nextDate.childNodes[1].textContent = shortDate[1];
                });
            } else {
                const dateEnd = document.querySelector(".date-end");
                if(editEvent) dateEnd.parentNode.removeChild(dateEnd);
                else dateEnd.parentNode.removeChild(dateEnd);
            }
        }

        const reminderCheckbox = document.getElementById("reminder-checkbox");
        const reminderStructure =  [
                                    element("select", null, "select-reminder"),
                                    [
                                        element("option", null, null, "value", "1","5 minutes"),
                                        element("option", null, null, "value", "2","10 minutes"),
                                        element("option", null, null, "value", "3","15 minutes"),
                                        element("option", null, null, "value", "4","30 minutes"),
                                        element("option", null, null, "value", "5","1 hour"),
                                    ]
                                ];
        //reminder add/remove select
        const checkboxReminder = document.querySelector(".checkbox-reminder");
        if(editEvent && editEvent.hasReminder){
            reminderCheckbox.checked = true;
            readArray(reminderStructure, null);
            for(let i = 0; i < reminderStructure[1].length; i++){
                if(reminderStructure[1][i].textContent == editEvent.reminder) reminderStructure[0].value = i+1;
            }
            checkboxReminder.appendChild(reminderStructure[0]);
        }

        reminderCheckbox.addEventListener("change", function(){
            if(reminderCheckbox.checked === true){
                readArray(reminderStructure, null);
                checkboxReminder.appendChild(reminderStructure[0]);
            } else {
                const selectReminder = document.querySelector(".select-reminder");
                selectReminder.parentNode.removeChild(selectReminder);
            }
        });

        //description change p to textarea
        const description = document.querySelector(".description-p");
        if(editEvent && editEvent.description !== undefined){
            const textArea = element("textarea", null, "description-textarea", null, null, editEvent.description);
            textArea.setAttribute("maxlength", "500");
            textArea.setAttribute("rows", "2");
            description.parentNode.appendChild(textArea);
            description.parentNode.removeChild(description);
        }
        description.addEventListener("click", function(){
            const textArea = element("textarea", null, "description-textarea", "placeholder", "Write here...");
            textArea.setAttribute("maxlength", "500");
            textArea.setAttribute("rows", "2");
            description.parentNode.appendChild(textArea);
            description.parentNode.removeChild(description);
        });

        //cancel button
        const cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", function(){
            form.noValidate = true;
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                setIsModalOpen(false);
                modal.parentNode.removeChild(modal);
            });
        });

        //save button
        const saveButton = document.getElementById("save-button");
        saveButton.addEventListener("click", function(){

            //check is valid
            const time = document.querySelector(".event-time").childNodes[1].textContent;
            const date = document.querySelector(".event-time").childNodes[0].textContent.split(",");
            const dateCheckbox = document.getElementById("date-checkbox").checked;
            const reminderCheckbox = document.getElementById("reminder-checkbox").checked;
            const textArea = document.querySelector(".description-textarea");
            const type = document.querySelector(".select-type-event");

            const event = new CalendarEvent(title.value, time, date[0], date[1].split(" ")[1], date[1].split(" ")[2], date[1].split(" ")[3], 
                                    dateCheckbox, reminderCheckbox, type.options[type.selectedIndex].text, dataDate);
            if(dateCheckbox){
                const endTime = document.querySelector(".next-date").childNodes[1].textContent;
                const endDate = document.querySelector(".next-date").childNodes[0].textContent.split(",");
                event.setEndHour(endTime);
                event.setEndWeekDay(endDate[0]);
                event.setEndDay(endDate[1].split(" ")[1]);
                event.setEndMonth(endDate[1].split(" ")[2]);
                event.setEndYear(endDate[1].split(" ")[3]);
            }
            if(reminderCheckbox){
                const selectReminder = document.querySelector(".select-reminder");
                event.setReminder(selectReminder.options[selectReminder.selectedIndex].text);
            }

            if(textArea) event.setDescription(textArea.value);
            else event.setDescription(undefined);

            form.addEventListener('submit', function (e) {
                if(!event.hasTitle()) return;
                //new event
                e.preventDefault();

                if(editEvent){
                    events.forEach(event => {
                        if(event === editEvent) events.splice(events.indexOf(event), 1);
                    });
                    events.splice(events.indexOf(event), 1);
                    event.setStartDate(event.day+"/"+(new Date().getMonth(event.month)+1)+"/"+event.year);//change startDate if you edit or change at last time.
                    event.setID(editEvent.eventID);
                } else {
                    contID = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : contID;
                    contID++;
                    event.setID(contID);
                    event.setStartDate(event.day+"/"+(new Date().getMonth(event.month)+1)+"/"+event.year);
                }
                const stringifyEvent = JSON.stringify(event.getEvent());
                //pushing new event to all events array
                events.push(JSON.parse(stringifyEvent));
                localStorage.setItem("events", JSON.stringify(events));
                localStorage.setItem("id",JSON.stringify(contID));
                fetchEvents();
                setIsModalOpen(false);
                modal.parentNode.removeChild(modal);
                return;
            });

        });

        //modal listener
        this.focus();
        modal.addEventListener("focusout", function(e){
            if(e.sourceCapabilities === null || e.relatedTarget === saveButton) return;
            if( e.relatedTarget === modal ||
                e.relatedTarget === modal.childNodes[1].childNodes[0] || //close-button
                e.relatedTarget === modal.childNodes[1].childNodes[0][0] || //input
                e.relatedTarget === modal.childNodes[1].childNodes[0][1] || //date
                e.relatedTarget === modal.childNodes[1].childNodes[0][2] || //date-checkbox
                e.relatedTarget === modal.childNodes[1].childNodes[0][3] || //reminder-checkbox
                e.relatedTarget === modal.childNodes[1].childNodes[0][4] || //select-reminder
                e.relatedTarget === modal.childNodes[1].childNodes[0][5] || //textarea
                e.relatedTarget === modal.childNodes[1].childNodes[0][6] || //select-type
                e.relatedTarget === modal.childNodes[1].childNodes[0][7]){} //save-button
            else modal.parentNode.removeChild(modal);
        });
        
            /*-------

                checkbox with end date
                    check doc to more info

                checkbox reminder
                    use SetInterval every 10sec
            */
        
        //add event to calendar
        modal.style.left = x + "px";
        modal.style.top = y + "px";
    }

    focus(){
        const modal = document.querySelector(".modal");
        if(modal !== undefined) modal.focus();
    }

}

export default CreateModal;