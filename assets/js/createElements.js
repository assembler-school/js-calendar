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

function inDay(content, id, clas, clas2) {
    var newElement1 = document.createElement("button");
    var newElement = document.createElement("div");
    var point = document.createElement("div");
    var cont = document.createElement("p");
    newElement1.classList="btnmodalinfo"
    cont.innerHTML = content
    point.classList = clas2
    newElement1.appendChild(newElement)
    newElement.appendChild(point)
    newElement.appendChild(cont)
    newElement.classList = clas
    newElement.id = id
    return newElement
}