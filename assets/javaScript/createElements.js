function beginModal(){
    content = "<span class='close'>&times;</span>"
    content +=" <div ><form class='eventForm modal-content '><div><label for='title'>Title</label> <input type='text' class='formInputs' name='title' id='title' placeholder='My Event' required> </div>"

    content += "<div><label for='begindate'> Initial date</label><input type='date' name='begindate' class='formInputs' id='begindateId' required></div> "

    content += "<div id='checkboxEndDate'><label for='endDateCheck'>End Date </label><input type='checkbox' name='End Date' class='formInputs' id='endDateCheck'> </div>"

    content += "<div class='hideform'>"

    content += "</div><div> <button class='btn btn-primary btn-lg' id='delete'> Delete Event </button> <button class='btn btn-primary btn-lg' id='create'> Create Event </button> </div></form> </div>"

    modalContent.innerHTML= content

    //TODO Dom modal
    const endDateCheck= document.getElementById('endDateCheck')
    hideForm= document.getElementsByClassName('hideform')
    const deleteButton= document.getElementById('delete')
    const createButton= document.getElementById('create')
    const span = document.getElementsByClassName("close")[0];

    //TODO event Listener
    endDateCheck.addEventListener('click', displayForm)
    deleteButton.addEventListener('click', closeModal)
    createButton.addEventListener('click', createEvent)
    span.addEventListener('click', closeModal)
}
