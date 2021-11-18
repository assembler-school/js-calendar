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
    createTagEvent(father) {
        if (this.allEvent.fechaInicio.split("T").length > 1) {
            var horaevento = this.allEvent.fechaInicio.split("T")
            horaevento = horaevento[1]
            var content = horaevento + ' ' + '<span>' + this.allEvent.eventTitle + '</span>'
            if (this.allEvent.eventType == 'Meeting') {
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'meeting'))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'personal'))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(inDay(content, this.allEvent.eventId, 'miniEvents inday', 'study'))
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
            };
        });
    }
}

function startSetTimeOut() {
    setTimeout(() => {
        findFather();
    }, 100);
}


function allLocalStorage(X = []) {
    let typeStorage
    for (const a of X) {
        if (typeStorage == undefined) {
            typeStorage = JSON.parse(localStorage[a]);
        } else {
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

function findEvent(father, date2 = null) {
    var fatherDay = father.firstChild.dataset.day;
    let fatherMonth = father.firstChild.dataset.month;
    let fatherYear = father.firstChild.dataset.year;
    let product_data = allLocalStorage(['Meeting', 'Personal', 'Study']);
    if (date2 == null) {
        var resultProductData = product_data.filter(
            function (a) {
                var b = new Date(a.fechaInicio);
                let eventDate = b.getDate();
                let eventMonth = b.getMonth();
                let eventYear = b.getFullYear();
                return eventYear == fatherYear && eventMonth == fatherMonth && eventDate == fatherDay;
            });
    };
    return resultProductData;
}

function findFather(x) {
    for (let index = 0; index < boxEventsCal.length; index++) {
        let realChilds = findEvent(boxEventsCal[index]);
        realChilds.forEach(element => {
            if (x !== null) {
                if (element.eventId == x) {
                    return
                }
            }
            if (element.fechaInicio.split("T").length > 1) {
                var horaevento = element.fechaInicio.split("T")
                horaevento = horaevento[1]
                var content = horaevento + ' ' + '<span>' + element.eventTitle + '</span>'
                if (element.eventType == 'Meeting') {
                    boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'meeting'))
                } else if (element.eventType == 'Personal') {
                    boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'personal'))
                } else if (element.eventType == 'Study')
                    boxEventsCal[index].appendChild(inDay(content, element.eventId, 'miniEvents inday', 'study'))
            } else {
                if (element.eventType == 'Meeting') {
                    boxEventsCal[index].appendChild(newElement({
                        tag: 'div',
                        id: element.eventId,
                        clas: ['miniEvents', 'meeting'],
                        content: element.eventTitle
                    }))
                } else if (element.eventType == 'Personal') {
                    boxEventsCal[index].appendChild(newElement({
                        tag: 'div',
                        id: element.eventId,
                        clas: ['miniEvents', 'personal'],
                        content: horaevento + "  " + element.eventTitle
                    }))
                } else if (elementt.eventType == 'Study')
                    boxEventsCal[index].appendChild(newElement({
                        tag: 'div',
                        id: element.eventId,
                        clas: ['miniEvents', 'study'],
                        content: horaevento + "  " + element.eventTitle
                    }))
            };
        });
    }
}


////PRUEBAS

/* let fatherPruebas = document.getElementById('fatherPruebas')
 */
/* let eventoPruebas = new calendarEvent('titulo', '18-11-2021', '', 'No se repite', '', '', 'Meeting');
let eventoPruebas1 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Personal');
let eventoPruebas2 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Study'); */
/* let btnPruebas = document.getElementById('pruebas');

btnPruebas.addEventListener('click', function () {
    eventoPruebas.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas1.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    eventoPruebas2.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
    var eventsClick = document.getElementsByClassName("miniEvents")
    console.log(eventsClick);
    for (const evn of eventsClick) {
        evn.addEventListener("click", function (evn) {
            console.log(evn.srcElement.id)
            modal.style.display = "block";
        })
    }
}) */