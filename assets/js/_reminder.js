

export function prueba() {
     const eventData = localStorage.getItem("events");
     console.log(eventData);
     let eventsReminder = eventData.filter(ev => ev.reminder !== "");
     console.log(eventsReminder);
};
prueba();
