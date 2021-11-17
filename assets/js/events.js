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
            console.log('+1 in Id');
            let typeStorage = JSON.parse(localStorage[eventType]);
            typeStorage.push(this.allEvent)
            localStorage[eventType] = (JSON.stringify(typeStorage))
        } else if (!localStorage[eventType]) {
            console.log('Starting Id');
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
    findEvent(father, date2 = null, id) {
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
                this.createTagEvent(father, id);
            });;
        }
    }
    createTagEvent(father, id) {
        
        if(this.allEvent.fechaInicio.split("T").length>1){
            var horaevento=this.allEvent.fechaInicio.split("T")
            horaevento=horaevento[1]
        }
        else{console.log("hola")
            // horaevento=this.allEvent.fechaInicio.split("-")
            //     horaevento=horaevento[0]
            }
        if (this.allEvent.eventType == 'Meeting') {
            // console.log("hola")
            father.appendChild(eventDay(this.allEvent.eventTitle,id,'miniEvents allday', 'meeting'))
        } else if (this.allEvent.eventType == 'Personal') {
            father.appendChild(newElement({
                tag: 'div',
                id: id,
                clas: ['miniEvents', 'personal'],
                content:horaevento+"  "+ this.allEvent.eventTitle
            }))
        } else if (this.allEvent.eventType == 'Study')
            father.appendChild(newElement({
                tag: 'div',
                id: id,
                clas: ['miniEvents', 'study'],
                content: horaevento+"  "+ this.allEvent.eventTitle
            }))
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

let fatherPruebas = document.getElementById('fatherPruebas')
let eventoPruebas = new calendarEvent('titulo', '18-11-2021', '', 'No se repite', '', '', 'Meeting');
let eventoPruebas1 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Personal');
let eventoPruebas2 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Study');
let btnPruebas = document.getElementById('pruebas');

btnPruebas.addEventListener('click', function () {
    eventoPruebas.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas1.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas2.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
})