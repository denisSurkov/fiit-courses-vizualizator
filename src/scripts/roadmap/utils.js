import {
    childWidth,
    childrenYPadding,
    bigPadding,
    childHeight,
    childrenXPadding,
    leftPadding,
    moduleWidth,
    moduleHeight,
    rightPadding
} from "./constants.js";

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


export function preCalc(config) {
    let viewHeight = 0;

    for (let module of config) {
        if (module.type === "right") {
            for (let i = 0; i < module.children.length; i++) {
                module.children[i].x = bigPadding;
                module.children[i].y = viewHeight + (childHeight + childrenYPadding) * i + childrenYPadding;
            }
            module.x = bigPadding + childWidth + childrenXPadding;
        } else if (module.type === "left") {
            for (let i = 0; i < module.children.length; i++) {
                module.children[i].x = leftPadding + moduleWidth + childrenXPadding;
                module.children[i].y = viewHeight + (childHeight + childrenYPadding) * i + childrenYPadding;
            }
            module.x = leftPadding;
        } else {
            let middle = Math.floor(module.children.length / 2);
            for (let i = 0; i < middle; i++) {
                module.children[i].x = leftPadding;
                module.children[i].y = viewHeight + (childHeight + childrenYPadding) * i + childrenYPadding;
            }
            for (let i = 0; i + middle < module.children.length; i++) {
                module.children[i + middle].x = leftPadding + childWidth + childrenXPadding + moduleWidth + childrenXPadding;
                module.children[i + middle].y = viewHeight + (childHeight + childrenYPadding) * i + childrenYPadding;
            }
            module.x = leftPadding + childWidth + childrenXPadding;

        }
        module.y = Math.floor((module.children[module.children.length - 1].y + viewHeight) / 2);
        viewHeight = module.children[module.children.length - 1].y + childrenYPadding;
    }


    return {
        viewHeight,
        config
    };
}