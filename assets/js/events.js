class calendarEvent {
    constructor(eventTitle, fechaInicio, fechaFin, repeat, remember, description, eventType) {
        this.setIDToStorage();
        this.allEvent = {
            eventTitle: eventTitle,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            repeat: repeat,
            remember: remember,
            description: description,
            eventType: eventType,
            eventId: localStorage.id
        }
        this.setToLocalStorage(this.allEvent.eventType);
    }
    setToLocalStorage(eventType) {
        if (localStorage[eventType]) {
            console.log('a');
            let typeStorage = JSON.parse(localStorage.eventType);
            typeStorage.push(this.allEvent)
            localStorage[eventType] = (JSON.stringify(typeStorage))
        } else if (!localStorage[eventType]) {
            console.log('b');
            let typeStorage = []
            typeStorage.push(this.allEvent);
            localStorage[eventType] = (JSON.stringify(typeStorage))
        }
    }
    setIDToStorage() {
        if (!localStorage.id) {
            localStorage.id = '0';
            console.log('a');
        }
        console.log(localStorage.id);
        localStorage.id = parseInt(localStorage.id) + 1
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
        father.appendChild(newElement('div', '', 'miniEvents', this.allEvent.eventTitle))
    }
    eraseEvent() {
        let typeStorage = JSON.parse(localStorage.eventType);
        typeStorage.forEach(element => {
            if (this.allEvent == element) {
                console.log('a');
            }
        });
    }
}