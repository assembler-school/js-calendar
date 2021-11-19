
function alertFunction(){
    // var alertProcess;
    if (historicEvents == "" || historicEvents == []){
        return;
    }
    else{
        var alertProcess = setInterval(chekReminder10, 1000);
        return alertProcess;
    }
}

function chekReminder10(){
    if (historicEvents == "" || historicEvents == []){
        return;
    }
    l = 0;
    actual = new Date();
    let alertDiv = document.getElementById("alertDiv")
    while (l < historicEvents.length){
        if((historicEvents[l].remindTime * 60) == (Math.round(((new Date(historicEvents[l].initialDate) - actual)/1000)))){
            alertDiv.innerHTML = historicEvents[l].remindTime + " minutes for: " + historicEvents[l].title;
            l++;
        }
        else {
            l++;
        }

    }
}