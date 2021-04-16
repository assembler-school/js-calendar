function updateDate () {
    const actualTime = new Date();
    const miliSecsToEndDay = (60*60*24*1000)-(actualTime.getHours()*60*60*1000 + actualTime.getMinutes()*60*1000 + actualTime.getSeconds()*1000 + actualTime.getMilliseconds());
    checkTodayReminders();
    renderCalendar("");
    window.setTimeout(updateDate,miliSecsToEndDay);
    setCurrentDate ();
}
updateDate();