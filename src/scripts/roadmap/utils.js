import {
    CHILD_WIDTH,
    CHILDREN_Y_PADDING,
    BIG_PADDING,
    CHILD_HEIGHT,
    CHILDREN_X_PADDING,
    LEFT_PADDING,
    MODULE_WIDTH,
    MODULE_HEIGHT,
    RIGHT_PADDING
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
                module.children[i].x = BIG_PADDING;
                module.children[i].y = viewHeight + (CHILD_HEIGHT + CHILDREN_Y_PADDING) * i + CHILDREN_Y_PADDING;
            }
            module.x = BIG_PADDING + CHILD_WIDTH + CHILDREN_X_PADDING;
        } else if (module.type === "left") {
            for (let i = 0; i < module.children.length; i++) {
                module.children[i].x = LEFT_PADDING + MODULE_WIDTH + CHILDREN_X_PADDING;
                module.children[i].y = viewHeight + (CHILD_HEIGHT + CHILDREN_Y_PADDING) * i + CHILDREN_Y_PADDING;
            }
            module.x = LEFT_PADDING;
        } else {
            let middle = Math.floor(module.children.length / 2);
            for (let i = 0; i < middle; i++) {
                module.children[i].x = LEFT_PADDING;
                module.children[i].y = viewHeight + (CHILD_HEIGHT + CHILDREN_Y_PADDING) * i + CHILDREN_Y_PADDING;
            }
            for (let i = 0; i + middle < module.children.length; i++) {
                module.children[i + middle].x = LEFT_PADDING + CHILD_WIDTH + CHILDREN_X_PADDING + MODULE_WIDTH + CHILDREN_X_PADDING;
                module.children[i + middle].y = viewHeight + (CHILD_HEIGHT + CHILDREN_Y_PADDING) * i + CHILDREN_Y_PADDING;
            }
            module.x = LEFT_PADDING + CHILD_WIDTH + CHILDREN_X_PADDING;

        }
        module.y = Math.floor((module.children[module.children.length - 1].y + viewHeight) / 2);
        viewHeight = module.children[module.children.length - 1].y + CHILDREN_Y_PADDING;
    }


    return {
        viewHeight,
        config
    };
}