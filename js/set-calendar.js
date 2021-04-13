

//Get first day of year
function firstOfJanuary(year){
  return new Date(year,'0','1');
};

//Get first day of month
var firstWeekDay = new Date(year,month).getDay();

//Get number of days in month
function getMonthDays(year,month){
  return new Date(year,month, 0).getDate();
};



function populateCalendar(){
  let date = 1;
  var months = document.querySelectorAll('.month');
  console.log(months);
  months.forEach((month) => {
    for (let i = 0; i < 6; i++) {
      // creates a table row
      // let row = document.createElement("tr");
      let row = document.createElement('div');
      row.setAttribute('class','week');

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstWeekDay) {
          let cell = document.createElement('div');
          cell.setAttribute('class','days');
          cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        else if (date > getMonthDays(year, month)) {
          break;
        }

        else {
          let cell = document.createElement('div');
          cell.setAttribute('class','days');
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }


      }
      month.appendChild(row); // appending each row into calendar body.
    }
  });
};