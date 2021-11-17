//TODO create events and save on Local Storage

function eventData(title, startDate, endDate = 0, reminder = 0,  description = '', eventType ) {
    return {
        title: title,
        startDate : startDate,
        endDate : endDate,
        reminder : reminder,
        description: description,
        eventType : eventType
    }
}

function loadEventBook(){
    if(localStorage.getItem('eventBook') == null){
        return [];
    }
    return JSON.parse(localStorage.getItem('eventBook'))
}


let eventBook
let arrayData=[]
function createEvent() {
    const formClass = document.getElementsByClassName('formInputs')
    console.log(formClass)
    for (num in formClass){
        arrayData.push(formClass[num].value)
        console.log(formClass[num].value)
    }
    let obj
    if( arrayData.length > 6){
        obj= eventData(arrayData[0], arrayData[1], arrayData[2], arrayData[3], arrayData[4], arrayData[5])
    } else{
        obj= eventData(arrayData[0], arrayData[1], arrayData[1] , arrayData[3], arrayData[4], arrayData[2])
    }
    console.log(eventBook)

    eventBook.push(obj)
    arrayData=[]

    localStorage.setItem('eventBook', JSON.stringify(eventBook))
}