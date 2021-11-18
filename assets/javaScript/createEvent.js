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
//TODO convert to object
function convertToObj(arrayName){
    let obj
    if( arrayName.length > 6){
        obj= eventData(arrayName[0], arrayName[1], arrayName[2], arrayName[3], arrayName[4], arrayName[5])
    } else{
        obj= eventData(arrayName[0], arrayName[1], arrayName[1] , arrayName[3], arrayName[4], arrayName[2])
    }
    return obj
}

let eventBook

function createEvent() {
    let arrayData=[]
    const formClass = document.getElementsByClassName('formInputs')
    for (num in formClass){
        arrayData.push(formClass[num].value)
        //console.log(formClass[num].value)
    }
   
    //console.log(eventBook)

    eventBook.push(convertToObj(arrayData))

    localStorage.setItem('eventBook', JSON.stringify(eventBook))
    closeModal()
}

function deleteEvent(){
    const formClass = document.getElementsByClassName('formInputs')
    arrayDel=[]
    strDel=''
    for (num in formClass){
        arrayDel.push(formClass[num].value)
    }

    obj = convertToObj(arrayDel)
    strDel = obj.title + obj.startDate + obj.endDate + obj.reminder + obj.description + obj.eventType;
 
    removeEvent(strDel)

 }

 function removeEvent(eventToRemove){
    eventBook = eventBook.filter(event => {
        return !(event.title + event.startDate + event.endDate + event.reminder + event.description + event.eventType == eventToRemove)
    })

    localStorage.setItem('eventBook', JSON.stringify(eventBook))
    eventBook =  loadEventBook()
}

    // eventBook.push(obj)
    // arrayData=[]
    // localStorage.setItem('eventBook', JSON.stringify(eventBook))
    // closeModal()
   
  
function getDataFromCalendar () {
    console.log(eventBook)
   eventBook.forEach((e) => {
console.log(eventBook)
    
    title = e.title;
    console.log(title)
    startDate = e.startDate
    console.log(startDate)
   
    
       
    }) 
}


   // crear otra funcion donde dev criar um div e ponder este div con este titotlo y esta data. e ponder este dive dentro del dia del calendario 

 

