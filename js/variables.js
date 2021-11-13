export function element(type, elemId, elemClass, textContent, src){
    const element = document.createElement(type);
    if(elemId != null) element.setAttribute("id", elemId);
    if(elemClass != null) element.setAttribute("class", elemClass);
    if(textContent != null) element.textContent = textContent;
    if(src != null) element.src = src;
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