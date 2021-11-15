export const body = document.querySelector(".body");
//test const - delete
export const test = document.getElementById("test");

export function element(type, elemId, elemClass, otherAtt, valueAtt, textContent){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    if(otherAtt != null) element.setAttribute(otherAtt, valueAtt);
    if(textContent != null) element.textContent = textContent;
    return element;
}


export function readArray(array){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else body.appendChild(array[i]);
    }
}

function readInsideArray(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else parent.appendChild(array[i]);
    }
}