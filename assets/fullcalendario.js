var calender1 = calender()
var destino = document.getElementById("fullcalender")
destino.innerHTML = calender1;
function calender ()
{

  //var year=document.getElementById('year').value;  //lee año actual
  var year=2021;
  var mont = new Array();
  mont[0] = "January";
  mont[1] = "February";
  mont[2] = "March";
  mont[3] = "April";
  mont[4] = "May";
  mont[5] = "June";
  mont[6] = "July";
  mont[7] = "August";
  mont[8] = "September";
  mont[9] = "October";
  mont[10] = "November";
  mont[11] = "December";
  document.write ("<h1>Calender - Year "+year+"</h1>");
  document.write ("<table border='1'><tr>");
  for(month=0;month<12;month++)
  {
    dt=new Date(year, month, 01); //year-month-date formato

    var first_day=dt.getDay(); //primer dia del mes

    dt.setMonth(month+1,0);

    var last_date=dt.getDate(); //last day present month

    var dte=1; // day variable adjust startint g date

      if(month == 2 || month == 4 || month == 6 || month == 8 || month == 10)
      {
        document.write("</tr><tr>"); //change row after very 4 months
      }

        document.write("<td>");
        document.write("<center><b>" +mont[dt.getMonth()]+ "</b></center>");  // month name bold

        document.write ("<table><tr><td>Su</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>");

        for(i=0;i<=41;i++)
        {
          if((i%7)==0) //week over start
          {
            document.write("</tr><tr>");
          }
          if((i>= first_day) && (dte<= last_date))
          {
            document.write("<td>" + dte +"</td>");
            dte=dte+1;
          }else
          {
            document.write("<td> </td>"); 
          }
        }
        document.write("<tr></table>");
        document.write("</td>");
      }document.write("</tr></table>");
  }