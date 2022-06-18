export function createDomElement(tagName='div', classes='', id='') {
    let result = document.createElement(tagName);
    result.classList.add(...classes.split(' '));
    result.id = id;

    return result;
}