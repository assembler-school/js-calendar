function displayHour() {
    hourUpdate = setInterval(() => {
        var time = new Date();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var seconds = time.getSeconds();
    }, 1000);
}

