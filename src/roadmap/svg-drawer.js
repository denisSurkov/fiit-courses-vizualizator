import {createSVGElement} from './utils.js';

export class SVGDrawer {

    constructor(svgRoot) {
        this.svgRoot = svgRoot;

        this.canvasRenderingContext2D = document
            .createElement('canvas')
            .getContext('2d');
    }

    /**
     *  @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
     * @param {number} x
     * @param {number} y
     * @param {SVGElement?} parent
     * @param {number} width
     * @param {number} height
     * @param {{"stroke-width": number, fill: string, stroke: string}} options
     */
    drawRectangle(x, y, width, height, options, parent) {
        parent = parent ?? this.svgRoot;

        return createSVGElement('rect', {
            x: x,
            y: y,
            width: width,
            height: height,
            ...options,
        }, parent)
    }


    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
     * @param {number} cx
     * @param {number} cy
     * @param {number} r
     * @param {SVGElement?} parent
     */
    drawCircle(cx, cy, r, options, parent) {
        parent = parent ?? this.svgRoot;

        return createSVGElement('rect', {
            cx: cx,
            cy: cy,
            r: r,
            ...options,
        }, parent);
    }


    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
     * @param {string} d
     * @param options
     * @param {SVGElement?} parent
     */
    drawPath(d, options, parent) {
        parent = parent ?? this.svgRoot;

        return createSVGElement('path', {
            d: d,
            ...options,
        }, parent)
    }


    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse
     * @param {number} cx
     * @param {number} cy
     * @param {number} rx
     * @param {number} ry
     * @param {SVGElement?} parent
     */
    drawEllipse(cx, cy, rx, ry, options, parent) {
        parent = parent ?? this.svgRoot;

        return createSVGElement('ellipse', {
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry,
            ...options
        }, parent);
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

    /**
     * @param {string} text
     * @param {string?} font
     * @returns {TextMetrics}
     */
    measureText(text, font) {
        this.canvasRenderingContext2D.font = font;

        return this.canvasRenderingContext2D.measureText(text);
    }
}
