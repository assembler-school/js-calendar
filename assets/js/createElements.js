function newElement({
    tag,
    id,
    clas,
    content
}) {
    var newElement = document.createElement(tag);
    newElement.textContent = content;

    if (id != '') newElement.id = id;
    
    if (clas.length !== 0) {
        for (let index = 0; index < clas.length; index++)
            newElement.classList.add(clas[index]);
    }

    return newElement;
}