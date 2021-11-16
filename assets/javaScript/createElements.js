function beginModal(){
    content=" <div ><form class='eventForm modal-content'><div><label for='title'>Title</label> <input type='text' name='title' id='title' placeholder='My Event' required> </div>"

    content += " <div><label for='begindate'> Initial date</label><input type='date' name='begindate' id='begindateId' required></div> "

    content+=" <div id='checkboxEndDate'><label for='endDateCheck'>End Date </label><input type='checkbox' name='End Date' id='endDateCheck'> </div>"

    content+=" <div class='hideform' ><div><label for='endDate'>End Date</label><input type='date' name='End Date ' id='endDate'> </div>"

    content+="<div id='checkboxRemind'><label for='reminder'> Remind me when event Start</label><input type='checkbox' name='reminder' id='reminder'> </div>"

    content+="<div> <label for='remindTimer'> Time reminder </label> <select name='remindTimer' id='remindTimer'> <option value='5'> 5 Minutes</option> <option value='10'> 10 Minutes</option> <option value='15'> 15 Minutes</option> <option value='30'> 30 Minutes</option> <option value='60'> 1 hour</option> </select>  </div>"

    content+="<div><label for='description'>Description</label> <textarea name='description' id='description' cols='20' rows='5'></textarea></div>"

    content+="<div> <label for='typeEvent'> Event Type</label><select name='eventType' id='eventType'><option value='personal'> Personal</option><option value='Meeting'> Meeting</option><option value='Study'> Study</option> <option value='other'> Other</option></select> </div> </div>"

    content+="<div> <button class='btn btn-primary btn-lg' id='cancel'> Cancel </button> <button class='btn btn-primary btn-lg' id='create'> Create </button> </div></form> </div>"

    modalContent.innerHTML= content

    //TODO Dom modal
    endDateCheck= document.getElementById('endDateCheck')
    hideForm= document.getElementsByClassName('hideform')
    cancelButton= document.getElementById('cancel')
    createButton= document.getElementById('create')

    //TODO event Listener
    endDateCheck.addEventListener('click', displayForm)
    cancelButton.addEventListener('click', closeModal)
    //createButton.addEventListener('click', createEvent)
}