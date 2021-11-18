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
        }
        localStorage.id = parseInt(localStorage.id) + 1
    }
    findEvent(father, date2 = null) {
        var fatherDay = father.firstChild.dateset.day;
        let fatherMonth = father.firstChild.dateset.month;
        let fatherYear = father.firstChild.dateset.year;
        let product_data = JSON.parse(localStorage.eventType)
        if (date2 == null) {
            var resultProductData = product_data.filter(
                function (a) {
                    let eventDate = a.fechaInicio.getDate();
                    let eventMonth = a.fechaInicio.getMonth();
                    let eventYear = a.fechaInicio.getYear();
                    return eventYear == fatherYear && eventMonth == fatherMonth && eventDate == fatherDay;
                });
        };
        return resultProductData;
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
                    id: this.allEvent.eventId,
                    clas: ['miniEvents', 'meeting'],
                    content: this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Personal') {
                father.appendChild(newElement({
                    tag: 'div',
                    id: this.allEvent.eventId,
                    clas: ['miniEvents', 'personal'],
                    content: horaevento + "  " + this.allEvent.eventTitle
                }))
            } else if (this.allEvent.eventType == 'Study')
                father.appendChild(newElement({
                    tag: 'div',
                    id: this.allEvent.eventId,
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

let fatherPruebas = document.getElementById('fatherPruebas')
let eventoPruebas = new calendarEvent('llamar a pepe', '18-11-2021', '19-11-2021', 'Laborables', '5 minutes', 'llamar a pepe para devolverle el casco de la moto', 'Meeting');
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
            console.log(evn.srcElement);
            var obj=getEventById(evn.srcElement.id)
            console.log(obj)
            titleModalInfo.innerHTML=obj.eventTitle
            dateModalInfo.innerHTML=obj.fechaInicio
            repetModalInfo.innerHTML=obj.repeat;
            cicletype.classList.add((obj.eventType).toLowerCase())
            typeeventmodal.innerHTML=obj.eventType
            ideventmodal.innerHTML=obj.eventId
            modal.style.display = "block";
        })
    }
}
)


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

// function findFather() {
//     console.log(boxEventsCal);
//     for (let index = 0; index < boxEventsCal.length; index++) {
//         console.log(boxEventsCal[index]);
//         console.log(findEvent(boxEventsCal[index]))
//         var allChildren = boxEventsCal[index].firstChild.dataset
//         if (boxEventsCal[index].children.length > 2 && boxEventsCal[index].firstChild.dataset.year == a && boxEventsCal[index].firstChild.dataset.month == a && boxEventsCal[index].firstChild.dataset.day == a) {
//             createTagEvent(boxEventsCal[index], );
//         }
//         allChildren.forEach(element => {})
//         console.log(allChildren);
//         /*         for (const iterator of boxEventsCal[index].children) {
//                     iterator
//                 }; */
//     }
// }
// setTimeout(() => {
//     console.log(findFather());
// }, 100);

////PRUEBAS

// let fatherPruebas = document.getElementById('fatherPruebas')
// let eventoPruebas = new calendarEvent('titulo', '18-11-2021', '', 'No se repite', '', '', 'Meeting');
// let eventoPruebas1 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Personal');
// let eventoPruebas2 = new calendarEvent('titulo', '18-11-2021T11:25', '', 'No se repite', '', '', 'Study');
// let btnPruebas = document.getElementById('pruebas');

// btnPruebas.addEventListener('click', function () {
//     eventoPruebas.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
//     eventoPruebas1.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
//     eventoPruebas2.createTagEvent(fatherPruebas, eventoPruebas.allEvent.eventId);
//     var eventsClick = document.getElementsByClassName("miniEvents")
//     console.log(eventsClick);
//     for (const evn of eventsClick) {
//         evn.addEventListener("click", function (evn) {
//             console.log(evn.srcElement.id)
//             modal.style.display = "block";
//         })
//     }
// })
