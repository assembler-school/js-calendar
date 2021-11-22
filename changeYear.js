// import {changeYearDinamic} from "./index.js";

// console.log(actualYear)
var actDate = new Date;
var actYear = actDate.getFullYear();
var actualYear = document.getElementById("actualYear");
var yearToSwich = 0;
var divChangeYear;
var divNewYear;
var DivChangeYearnBtnLeft;
var divNumberYear;
var DivChangeYearnBtnRight;
actualYear.addEventListener("click",changeYearWindow);
var actualYearModal2 = document.getElementById("modal2body");


function changeYearWindow(){
    divChangeYear= document.createElement("div");
    divChangeYear.classList= "containerDivChangeYear";
    actualYearModal2.appendChild(divChangeYear);

    DivChangeYearnBtnLeft= document.createElement("button");
    DivChangeYearnBtnLeft.classList= "DivChangeYearnBtnLeft classicBtn2 classicBtn3";
    DivChangeYearnBtnLeft.innerHTML ='<i class="fas fa-arrow-alt-circle-left"></i>';
    divChangeYear.appendChild(DivChangeYearnBtnLeft);
    DivChangeYearnBtnLeft.addEventListener("click",rest9year);

    divNewYear= document.createElement("div");
    divNewYear.classList= "DivChangeYear";
    divChangeYear.appendChild(divNewYear);

    DivChangeYearnBtnRight= document.createElement("button");
    DivChangeYearnBtnRight.classList= "DivChangeYearnBtnRight classicBtn2";
    DivChangeYearnBtnRight.innerHTML ='<i class="fas fa-arrow-alt-circle-right"></i>';
    divChangeYear.appendChild(DivChangeYearnBtnRight);
    DivChangeYearnBtnRight.addEventListener("click",add9year);

   
        
        // console.log(joder)
 
    addYear();
}

function addYear(){
    actualYear.removeEventListener("click",changeYearWindow);

    for(let i=-4; i<=4; i++){
        divNumberYear= document.createElement("div");
        divNumberYear.classList= "divNumberYear";
        divNumberYear.innerHTML=actYear+i;
        divNewYear.appendChild(divNumberYear);
        }
    var divChangeYearAll =document.querySelectorAll(".divNumberYear")
    divChangeYearAll.addEventListener("click",changeYearTitle)
    console.log("soy pepe")
    // console.log(divChangeYearAll)
}

function add9year(){
    var divNumberYearall = document.querySelectorAll(".divNumberYear");
    var sum=1;
    var year=parseInt(divNumberYearall[8].innerHTML);
    for(let i=0;i<=8;i++){
        divNumberYearall[i].innerHTML =year + sum;
        sum++;
    }
}

function rest9year(){
    var divNumberYearall = document.querySelectorAll(".divNumberYear");
    var rest=1;
    var year=parseInt(divNumberYearall[0].innerHTML);
    for(let i=8;i>=0;i--){
        divNumberYearall[i].innerHTML =year - rest;
        rest++;
    }
}




function changeYearTitle(){
   
}
    
