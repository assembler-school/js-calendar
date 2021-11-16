class calendarEvent {
    constructor(eventTitle, fechaInicio, fechaFin, repeat, remember, description, eventType) {
        this.allEvent = {
            eventTitle: eventTitle,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            repeat: repeat,
            remember: remember,
            description: description,
            eventType: eventType
        }
        this.setToLocalStorage(this.allEvent.eventType);
    }
    setToLocalStorage(eventType) {
        if (localStorage.eventType) {
            console.log('a');
            let typeStorage = JSON.parse(localStorage.eventType);
            typeStorage.push(this.allEvent)
            localStorage.eventType = (JSON.stringify(typeStorage))
        } else if (!localStorage.eventType) {
            console.log('b');
            let typeStorage = []
            typeStorage.push(this.allEvent);
            localStorage.eventType = (JSON.stringify(typeStorage))
        }
    }
    findEvent(eventType, father, date2 = null) {
        var fatherDay = father.dateset.day;
        let fatherMonth = father.dateset.month;
        let fatherYear = father.dateset.year;
        let product_data = JSON.parse(localStorage.eventType)
        if (date2 == null) {
            var resultProductData = product_data.filter(
                function (a) {
                    let eventDate = a.fechaInicio.getDate();
                    let eventMonth = a.fechaInicio.getMonth();
                    let eventYear = a.fechaInicio.getYear();
                    return eventYear == fatherYear && eventMonth == fatherMonth && eventDate == fatherDay;
                });
            resultProductData.forEach(element => {
                this.createTagEvent(father);
            });;
        }
    }
    createTagEvent(father) {
        father.appendChild(newElement(div, '', 'miniEvents', this.allEvent.eventTitle))
    }
}