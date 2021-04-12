//Cogemos la fecha de hoy
const date = new Date();

const renderCalendar = () =>{

    const monthDays = document.querySelector(".days")

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    //Siempre se aumenta 1, puesto que la variable empieza a contar desde 0
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ]

    //Mes actual
    //date.getMonth(), nos trae el mes en el que estamos ahora mismo.
    document.querySelector(".date h2").innerHTML = months[date.getMonth()];

    //Dia actual
    document.querySelector(".date p").innerHTML = date.toDateString();

    let days = "";

    date.setDate(1);
    //Detecta el primer dia del mes y encuentra la resta entre el mismo y 0

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class = "prev-date">${prevLastDay - x+1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }

        monthDays.innerHTML = days;
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class = "next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }

}

var btnPrev = document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

var btnPrev = document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

