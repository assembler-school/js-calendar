function createYear(){
    var monthDaysArr=[];
    var firstDayMonthYear = new Date(selectedYear,selectedMonth,1).getDay();

}



function createDayYear(num){
    var countday = 1;
    let countweek = firstDayMonthYear;
    let firstWeek = firstDayMonthYear;
    let lastWeek = firstDayMonthYear;
    while(firstWeek > 1){
        var dayEmpty = document.createElement("div");
        dayEmpty.setAttribute("id","day-container-empty" + firstWeek);
        dayEmpty.classList.add("day-container-empty")
        dayDiv.appendChild(dayEmpty)
        firstWeek--;
        console.log(firstWeek)
    }
    while (countday <= num) {
        var day = document.createElement("div");
        day.setAttribute("id","day-container-" + countday);
        day.classList.add("day-container")
        if(countday == todayNumDay && todayMonth==selectedMonth && todayYear==selectedYear){
            day.classList.add("today-special-day")
        }
        
        dayDiv.appendChild(day)
        var dayInner = document.createElement("div");
        dayInner.setAttribute("id","day-container-inner" + countday);
        dayInner.classList.add("day-container-inner")
        dayInner.textContent = dayNameArr[countweek]+countday;
        day.appendChild(dayInner)
        createDayContent(todayYear,todayMonth,countday,"",dayNameArr[countweek],"");
        countday++
        if(countweek>=6){
            countweek=0;
        }else{
            countweek++;
        }
    }
    while(lastWeek < 5){
        var dayEmptyLast = document.createElement("div");
        dayEmptyLast.setAttribute("id","day-container-empty"+lastWeek);
        dayEmptyLast.classList.add("day-container-empty")
        dayDiv.appendChild(dayEmptyLast)
        lastWeek++;
    }
    countday=1;
}