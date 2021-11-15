
function displayHour() {
    hourUpdate = setInterval(() => {
        time = new Date();
        hour = time.getHours();
        minute = time.getMinutes();
        seconds = time.getSeconds();

        houtMin = `${hour}: ${minute}: ${seconds}`;
        console.log(houtMin);
        innerH2.textContent = houtMin;
    }, 1000);
}

displayHour();
