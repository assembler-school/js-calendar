var htmlContent = '';
var FebNumberOfDays = '';
var counter = 1;

var dateNow = new Date();
console.log(dateNow);
var month = dateNow.getMonth();
var day = dateNow.getDate();
var year = dateNow.getFullYear();
var nextMonth = month + 1;

function displayCalendar() {
    dateNow.setDate(1)
    calendario=document.getElementById("calendar")
    calendario.innerHTML=null
    // var prevMonth = month -1;

    //Determing if February (28,or 29)
    if (month == 1) {
        if ((year % 100 != 0 && year % 4 == 0) || year % 400 == 0) {
            FebNumberOfDays = 29;
        } else {
            FebNumberOfDays = 28;
        }
    }

    // names of months and week days.
    var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday'
    ];
    var dayPerMonth = [
        '31',
        '' + FebNumberOfDays + '',
        '31',
        '30',
        '31',
        '30',
        '31',
        '31',
        '30',
        '31',
        '30',
        '31'
    ];

    // days in previous month and next one , and day of week.
    var nextDate = new Date(nextMonth + ' 1 ,' + year);
    var weekdays = nextDate.getDay();
    var weekdays2 = weekdays;
    var numOfDays = dayPerMonth[month];

    // this leave a white space for days of pervious month.
    while (weekdays > 0) {
        htmlContent += "<li class='monthPre'></li  >";
        weekdays--;
    }

    // loop to build the calendar body.
    while (counter <= numOfDays) {
        // When to start new line.
        if (weekdays2 > 6) {
            weekdays2 = 0;
            htmlContent += '</ul><ul> ';
        }

        // if counter is current day.
        // highlight current day using the CSS defined in header.
        if (counter == day) {
            htmlContent += "<li class='dayNow gridCalendar'  onMouseOver='this.style.background=\"#FFFF00\"; this.style.color=\"#FFFFFF\"' " +
            "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>" + counter + "</li>";
        } else {
            htmlContent += "<li class='monthNow gridCalendar' onMouseOver='this.style.background=\"#FFFF00\"'" +
                " onMouseOut='this.style.background=\"#FFFFFF\"'>" + counter + "</li>";
                
            }

        weekdays2++;
        counter++;
    }

    // building the calendar html body.
    var calendarBody = '<div><input type="button" value="button Test" onclick="openModal()" class="desaparecer"></div>';
    calendarBody += "<div class='calendar'> <div class='monthNow' id='calendarP'><button class='btn btn-primary ' id='firstModal'>ADD EVENT</button> <span> <i class='fas fa-chevron-left' id='leftMonth'> </i>" + monthNames[month] + ' ' + year + " <i class='fas fa-chevron-right' id='rightMonth'></i></span>  <div id='calendarprueba'></div></div>";
    // calendarBody += "<button class='modal-btn id='openModal'>ADD EVENT</button>";
    calendarBody += "<ul class='dayNames'>  <li>Sun</li>  <li>Mon</li> <li>Tues</li>" +
        "<li>Wed</li> <li>Thurs</li> <li>Fri</li> <li>Sat</li> </ul>";
    calendarBody += "<ul>";
    calendarBody += htmlContent;
    calendarBody += "</ul></div>";

    //todo The Modal
    // calendarBody += '<div id="myModal" class="modal"><div class="modal-content"><span id="close">&times;</span></div></div>'
    document.getElementById("calendar").innerHTML = calendarBody;

    // set the content of div .
    document.getElementById('calendar').innerHTML = calendarBody;
    //Date num
    
    const monthNow= document.querySelectorAll(".gridCalendar")
    monthNow.forEach(num=> {
        num.addEventListener("click", ()=>{
            numero= num.textContent
            fecha= ` ${numero} ${monthNames[month]} ${year}`
            console.log(numero)
        })
    });
    //first modal
    const firstModal=document.getElementById("firstModal")
    firstModal.addEventListener("click", openModal )
    //NEXT MONTH
    const rightMonth=document.getElementById("rightMonth")
    rightMonth.addEventListener("click", sumMonth)
    //Previous Month
    const leftMonth=document.getElementById("leftMonth")
    leftMonth.addEventListener("click", restMonth)
}
function sumMonth(){
    calendario.innerHTML=null
    htmlContent = '';
    FebNumberOfDays = '';
    counter = 1;
    console.log(dateNow.getMonth())
    month = dateNow.setMonth(dateNow.getMonth() + 1)
    day = dateNow.getDate();
    month = dateNow.getMonth();
     day = dateNow.getDate();
     year = dateNow.getFullYear();
     nextMonth = month + 1;
    console.log(dateNow.getMonth())
displayCalendar()
console.log(dateNow.setMonth(dateNow.getMonth() + 1))
}
function restMonth(){
    calendario.innerHTML=null
    htmlContent = '';
    FebNumberOfDays = '';
    counter = 1;
    console.log(dateNow.getMonth())
    month = dateNow.setMonth(dateNow.getMonth() - 1)
    day = dateNow.getDate();
    month = dateNow.getMonth();
     day = dateNow.getDate();
     year = dateNow.getFullYear();
     nextMonth = month + 1;
displayCalendar()

}

