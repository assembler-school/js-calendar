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


function startSetTimeOut() {
    setTimeout(() => {

        findFather();
    }, 100);
}

setInterval(function(){
    recuerdame(getEventById(23))
},1000)


function allLocalStorage(X = []) {
    let typeStorage
    for (const a of X) {
        if(!localStorage[a]){

        }
        else{
        if (typeStorage == undefined) {
            typeStorage = JSON.parse(localStorage[a]);
        } else {
            let typeStorage2 = typeStorage;
            let typeStorage3 = JSON.parse(localStorage[a]);
            typeStorage = typeStorage3.concat(typeStorage2);
        }}
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
                creaTag(element,index)
            }
        });
    }




function creaTag(element,index){
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
        } else if (element.eventType == 'Study')
            boxEventsCal[index].appendChild(newElement({
                tag: 'div',
                id: element.eventId,
                clas: ['miniEvents', 'study'],
                content: horaevento + "  " + element.eventTitle
            }))
}}


    var eventsClick = document.getElementsByClassName("miniEvents")
    console.log(eventsClick);
    for (const evn of eventsClick) {
        evn.addEventListener("click", function (evn) {
            console.log(evn.srcElement);
            var obj = getEventById(evn.srcElement.id)
            console.log(obj)
            titleModalInfo.innerHTML = obj.eventTitle
            dateModalInfo.innerHTML = obj.fechaInicio
            repetModalInfo.innerHTML = obj.repeat;
            cicletype.classList.add((obj.eventType).toLowerCase())
            typeeventmodal.innerHTML = obj.eventType
            ideventmodal.innerHTML = obj.eventId
            modal.style.display = "block";
        })
    }
}


function recuerdame(evn){
    if(evn.remember !== "undefined"){
        var actualDate=new Date()
        var dateEvent= new Date(evn.fechaInicio)
        if(dateEvent.getFullYear() == actualDate.getFullYear()){
            if(dateEvent.getMonth() == actualDate.getMonth()){
                if(dateEvent.getDate() == actualDate.getDate()){
                    var minAntes=evn.remember.split(" ")[0]
                    var min=(dateEvent.getMinutes()-parseInt(minAntes))
                    dateEvent.setMinutes(min)
                    console.log(dateEvent.getMinutes())
                    console.log(actualDate.getMinutes())
                    if(dateEvent.getHours() == actualDate.getHours()){
                        if(dateEvent.getMinutes() == actualDate.getMinutes()){
                            alert("en"+minAntes+"minutos tienes un evento:"+evn.eventTitle)
                        }
                    }
                }
            }
        }
    }
}
