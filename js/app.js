//header section

const header = document.getElementsByTagName("header")[0];
const actualMonth=document.getElementById("actual-month");
const backBtn=document.getElementById("back-btn");
const nextBtn=document.getElementById("next-btn");
const actualYear=document.getElementById("year");
const months=["January","February","March","April","May","June"
,"July","August","September","October","November","December"];
//Event listeners
backBtn.addEventListener("click",backMonth);
nextBtn.addEventListener("click",nextMonth);
//variables
let tempMonth,tempYear;
let actualdate=new Date();
//load default month
window.onload=todayDate;

function todayDate(){
    actualMonth.innerText=months[actualdate.getMonth()];
    actualYear.innerText=actualdate.getFullYear();
    tempMonth=months.indexOf(actualMonth.innerText);
    tempYear=actualdate.getFullYear()
}

function backMonth(){
    if(tempMonth>0)tempMonth--;
    else{
        tempMonth=11;
        tempYear--;
        actualYear.innerText=tempYear;
    }
    console.log(tempMonth);
    actualMonth.innerText=months[tempMonth];

}
function nextMonth(){
    if(tempMonth<11)tempMonth++
    else{
        tempMonth=0
        tempYear++;
        actualYear.innerText=tempYear;
    }
    actualMonth.innerText=months[tempMonth];
}