class CalendarEvent{

    title;
    hour;
    day;
    month;
    year;
    hasEnd;
    endHour
    endDay;
    endMonth;
    endYear;
    hasReminder;
    reminder;
    description;
    type;

    constructor(title, hour, day, month, year, hasEnd, hasReminder, type){
        this.title = title;
        this.hour = hour;
        this.day = day;
        this.day = day;
        this.month = month;
        this.year = year;
        this.hasEnd = hasEnd;
        this.hasReminder = hasReminder;
        this.type = type;
    }

    getEvent(){
        return this;
    }

    setEndHour(value){
        this.endHour = value;
    }

    setEndDay(value){
        this.endDay = value;
    }

    setEndMonth(value){
        this.endMonth = value;
    }

    setEndYear(value){
        this.endYear = value;
    }

    setReminder(value){
        this.reminder = value;
    }

    setDescription(value){
        this.description = value;
    }


}

export default CalendarEvent;