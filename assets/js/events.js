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

        if (this.allEvent.fechaInicio.split("T").length > 1) {
            var horaevento = this.allEvent.fechaInicio.split("T")
            horaevento = horaevento[1]
            var content = horaevento + ' ' + '<span>' + this.allEvent.eventTitle + '</span>'
            if (this.allEvent.eventType == 'Meeting') {
                father.appendChild(inDay(content, id, 'miniEvents inday', 'meeting'))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(inDay(content, id, 'miniEvents inday', 'personal'))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(inDay(content, id, 'miniEvents inday', 'study'))
        } else {
            if (this.allEvent.eventType == 'Meeting') {
                father.appendChild(newElement({
                    tag: 'div',
                    id: id,
                    clas: ['miniEvents', 'meeting'],
                    content: this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(newElement({
                    tag: 'div',
                    id: id,
                    clas: ['miniEvents', 'personal'],
                    content: horaevento + "  " + this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(newElement({
                    tag: 'div',
                    id: id,
                    clas: ['miniEvents', 'study'],
                    content: horaevento + "  " + this.allEvent.eventTitle
                }))
        }
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

function startSetTimeOut() {
    setTimeout(() => {
        checkEvents();
        startSetInterval();
    }, 100);
}

function startSetInterval() {
    setInterval(() => {
        checkEvents();
    }, 10000);
}

function checkEvents() {
    if (localStorage['Meeting']) {
        let typeStorage = JSON.parse(['Meeting']);
        /*         localStorage[eventType] = (JSON.stringify(typeStorage))
         */
    } else if (!localStorage['Meeting']) {
        let typeStorage = []
        /*         localStorage[eventType] = (JSON.stringify(typeStorage))
         */
    }
}

function allLocalStorage(X = []) {
    let typeStorage
    for (const a of X) {
        if (typeStorage == undefined) {
            typeStorage = JSON.parse(localStorage[a]);
        } else {
            console.log(typeStorage);
            let typeStorage2 = typeStorage;
            let typeStorage3 = JSON.parse(localStorage[a]);
            typeStorage = typeStorage3.concat(typeStorage2);
        }
    }
    return typeStorage
}

function getEventById(id) {
    var X = ['Meeting', 'Personal', 'Study']
    let typeStorage = allLocalStorage(X);

    return typeStorage.find(element => element.eventId == id)
}

console.log(getEventById(3));

////PRUEBAS

let fatherPruebas = document.getElementById('fatherPruebas')
let eventoPruebas = new calendarEvent('titulo', '18-11-2021', '', 'No se repite', '', '', 'Meeting');
let eventoPruebas1 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Personal');
let eventoPruebas2 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Study');
let btnPruebas = document.getElementById('pruebas');

btnPruebas.addEventListener('click', function () {
    eventoPruebas.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas1.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas2.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    var eventsClick=document.getElementsByClassName("miniEvents")
    console.log(eventsClick);
    for (const evn of eventsClick) {
        evn.addEventListener("click",function(evn){
            console.log(evn.srcElement.id)
            
            modal.style.display = "block";
        })
    }
}
)
