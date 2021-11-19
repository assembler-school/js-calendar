export var checkReminder=setInterval(function(){
    const dateAlready=new date();
    setTimeout(function(){
        if(dateAlready.getMinutes()){
            alert(title.value + " will start")
        }
    })
    if(dateAlready.getHours()>eventSelected.hour){}
},10000)
const remindTime=new Date();
            const minutesToNumber=parseInt(time.split(":")[1],10)
            const remindToNumber=parseInt(event.reminder.split(" ")[0],10);
            if(reminderCheckbox){
                console.log(minutesToNumber-remindToNumber);
                const timeToAlert=minutesToNumber-remindToNumber;
                remindTime.setMinutes(timeToAlert);
                remindTime.setHours(time.split(":")[0]);
                remindTime.getDate(date[0])
                console.log(date[0]);
            }