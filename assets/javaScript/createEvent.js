//TODO create events and save on Local Storage

function eventData() {
    return {
        title: title,
        startDate : startDate,
        endDate : endDate,
        reminder : reminder,
        description: description,
        eventType : eventType
    }
}


function createEvent() {
    const formClass = document.getElementsByClassName('formInputs')
    for (num in formClass){
        console.log(formClass[num].value)
        
    }
}