export function createDomElement(classes='', parent=undefined, id='', tagName='div') {

    let result = document.createElement(tagName);

    const classesArray = classes.split(' ');
    if (classesArray[0])
        result.classList.add(...classes.split(' '));

    result.id = id;

    if (parent !== undefined)
        parent.appendChild(result);

    return result;
}