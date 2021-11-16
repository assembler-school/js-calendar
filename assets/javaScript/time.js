function displayHour() {
    hourUpdate = setInterval(() => {
        time = new Date();
        hour = time.getHours();
        minute = time.getMinutes();
        seconds = time.getSeconds();

        houtMin= `${hour}: ${minute}: ${seconds}`
        var fisrsRow= document.querySelector("#calendarprueba")
        fisrsRow.textContent=houtMin
    }, 1000);
}
displayHour()
