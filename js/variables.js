export const body = document.querySelector(".body");
export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function element(type, elemId, elemClass, otherAtt, valueAtt, textContent){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    if(otherAtt != null) element.setAttribute(otherAtt, valueAtt);
    if(textContent != null) element.textContent = textContent;
    return element;
}


export function readArray(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else if(parent !== null) body.appendChild(array[i]);
    }
}

function readInsideArray(array, parent){
    for(let i = 0; i < array.length; i++){
        if(Array.isArray(array[i])) readInsideArray(array[i], array[i-1]);
        else parent.appendChild(array[i]);
    }
}