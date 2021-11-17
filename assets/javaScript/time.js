
function displayHour() {
    hourUpdate = setInterval(() => {
        time = new Date();
        hour = time.getHours();
        minute = time.getMinutes();
        seconds = time.getSeconds();

        houtMin= `${hour}: ${minute}: ${seconds}`
        fisrsRow= document.getElementsById('idcalendar')
        fisrsRow.innerText = houtMin

    }, 1000);
}


