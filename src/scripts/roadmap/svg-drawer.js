import {createSVGElement} from "./utils.js";

export class SVGDrawer {

    constructor(svgRoot) {
        this.svgRoot = svgRoot;
    }

    /**
     *  @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
     * @param {SVGElement?} parent
     * @param {number} width
     * @param {number} height
     * @param {{"stroke-width": number, fill: string, stroke: string}} options
     */
    drawRectangle(x, width, height, options, parent) {
        parent = parent ?? this.svgRoot;

        return createSVGElement('rect', {
            x: x,
            width: width,
            height: height,
            ...options,
        }, parent)
    }


    addGroup(groupOptions) {
        return createSVGElement('g', groupOptions, this.svgRoot);
    }


    drawText(x, y, text, options, parent) {
        parent = parent ?? this.svgRoot;

        const wrapper = createSVGElement('text', {
            x: x,
            y: y,
            ...options,
        }, parent);

        wrapper.textContent = text;
        return wrapper;
    }

}
