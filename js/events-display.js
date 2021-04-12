calendar = {
    "2021/12/05" : {
        'nombreEvento1':{
          'endDate': '18/09/2021 12:31:22',
          'reminder': '18/09/2021 11:31:22',
          'description': 'asdasdasd',
          'eventType': 'meeting'
        },
        'nombreEvento2222':{
            'endDate': '18/09/2021 12:31:22',
            'reminder': '18/09/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },
    },
    "2021/12/07" : {
        'nombreEvento33333':{
            'endDate': '18/09/2021 12:31:22',
            'reminder': '18/09/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },
  
    }
}

localStorage.setItem("calendar", JSON.stringify(calendar) );

//console.log(JSON.stringify(calendar));

//let displayedDay = document.getElementById("2021/12/05");
for (date in calendar){
    for (eventName in calendar[date]){
        //console.log(date + ' has ' + eventName);
        displayEventInMonth(date,eventName);
    }
}

//dateID = "2021/12/05"
//var eventTitle = "comrmucho";

function displayEventInMonth(dateID,eventTitle){
    let displayedEvent = document.createElement("P");
    let eventTitleTextNode = document.createTextNode(eventTitle);
    displayedEvent.appendChild(eventTitleTextNode);
    displayedEvent.className = "event-text";
    document.getElementById(dateID).appendChild(displayedEvent);
}




//localStorage.setItem("estructura", JSON.stringify(estructura) );
