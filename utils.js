function arrayRemove(arr, id) {
  return arr.filter(function (event) {
    return event.id != id;
  });
}
function getEmptyDaysInMonth(year, month, day, lang) {
  const date = getDateTimeFullParams(year, month, day);
  const dateStr = date.toLocaleDateString(lang, {
    weekday: "long",
  });
  return weekDays.indexOf(dateStr);
}
function changeStyles(action, element, nav) {
  if (action === 'on') {
    document.getElementById(nav).style.opacity = '1';
    document.getElementById(nav).style.height = 'auto';
    document.getElementById(nav).style.lineHeight = 'inherit';
    document.getElementById(nav).style.overflow = 'visible';
  } else {
    element.style.opacity = '0';
    element.style.height = '0';
    element.style.lineHeight = '0';
    element.style.overflow = 'hidden';
  }
}
function setVisibility(action, element) {
  element.style.visibility = action;
}
function getStringLocaleDate(date, lang) {
  // lunes, 2 de enero de 2023 depends on USER LANG / helper to display it in DOM
  return Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(date);
}

function getDateTime(date, hour, minute, second) {
  // Tue Jan 03 2023 09:30:00
  return new Date(`${date}T${hour.toString().length === 1 ? "0" + hour : hour}:${minute === 00 ? "00" : minute}:${second === 00 ? "00" : second}`);
}
function getDateWithoutTime(date) {
  // Tue Jan 03 2023
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/New_York' }).formatToParts(date);
}
function getDateTimeFullParams(year, month, day, minute, hour, second) {
  // Tue Jan 03 2023 09:30:00     or    Tue Jan 03 2023 / Helper with diferent parameters
  let initDate;
  if (hour && minute && second) {
    initDate = new Date(year, month, day, minute, hour, second);
  } else initDate = new Date(year, month, day);
  return new Date(initDate.getTime() + Math.abs(initDate.getTimezoneOffset() * 60000));
}
function getDateWithTimezoneProblems(date) {
  // Wed Jan 04 2023 00:00:00  -> 1 hour more / helper in timezone problems
  return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
}
function getDateWithMoreHours(date, hours) {
  return new Date(date.setHours(date.getHours() + hours));
}
function getDateTimeUTCFullParams(day, month, year, hour, minute, second) {
  if (hour && minute && second) return new Date(Date.UTC(year, month, day, hour, minute, second));
  else return new Date(Date.UTC(year, month, day));
}
function getDateTimeUTC(date, hour, minute, second) {
  if (hour && minute && second) return new Date(Date.UTC(date, hour, minute, second));
  else return new Date(Date.UTC(date));
}
function getDateToISOString(date) {
  return new Date(date).toISOString().split('T')[0];
}

function saveStorage(key, el) {
  localStorage.setItem(key, JSON.stringify(el));
}
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function reloadReminders(event) {
  myEvents.push(event);
}

