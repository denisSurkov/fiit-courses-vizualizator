const _NAMESPACE_URL = 'http://www.w3.org/2000/svg';


/**
 *
 * @param type
 * @param attributes
 * @param parent
 * @returns {SVGElement}
 */
export function createSVGElement(
    type,
    attributes,
    parent
) {
    const element = document.createElementNS(_NAMESPACE_URL, type);

    for (let prop in attributes) {
        if (!attributes.hasOwnProperty(prop)) {
            continue;
        }

        element.setAttribute(prop, attributes[prop]);
    }

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}
