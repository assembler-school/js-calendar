function beginModal(){
    content=" <div ><form class='eventForm modal-content '><div><label for='title'>Title</label> <input type='text' class='formInputs' name='title' id='title' placeholder='My Event' required> </div>"

    content += " <div><label for='begindate'> Initial date</label><input type='date' name='begindate' class='formInputs' id='begindateId' required></div> "

    content+=" <div id='checkboxEndDate'><label for='endDateCheck'>End Date </label><input type='checkbox' name='End Date' class='formInputs' id='endDateCheck'> </div>"

    content+=" <div class='hideform'>"

    content+="</div><div> <button class='btn btn-primary btn-lg' id='cancel'> Cancel </button> <button class='btn btn-primary btn-lg' id='create'> Create </button> </div></form> </div>"

    modalContent.innerHTML= content

    //TODO Dom modal
    endDateCheck= document.getElementById('endDateCheck')
    hideForm= document.getElementsByClassName('hideform')
    cancelButton= document.getElementById('cancel')
    createButton= document.getElementById('create')

    //TODO event Listener
    endDateCheck.addEventListener('click', displayForm)
    cancelButton.addEventListener('click', closeModal)
    createButton.addEventListener('click', createEvent)
}
