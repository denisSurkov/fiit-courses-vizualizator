import {createSVGElement, preCalc} from "./utils.js";
import {SVGDrawer} from "./svg-drawer.js";
import {MODULE_FONT, THEME_BLOCK_COLOR} from "./constants.js";

export class RoadmapDrawer {

    constructor(roadmapConfig) {
        this.roadmapConfig = roadmapConfig;

        this.root = null;
        this.svgDrawer = null;
    }

    run() {
        this.roadmapConfig = preCalc(this.roadmapConfig);

        // после подсчета начинаем рисовать
        this.root = createSVGElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            viewBox: `0 0 1920 1080`,
            style: 'font-family: balsamiq',
        });
        this.svgDrawer = new SVGDrawer(this.root);

        this.#drawModule(100, 10, '3 курс');
        this.#drawStart(1920 / 2);

        return this.root;
    }


    #drawStart(x) {
        const group = this.svgDrawer.addGroup();

        this.svgDrawer.drawRectangle(x - 100 / 2, 100, 30, 100, {
            stroke: 'black',
            fill: THEME_BLOCK_COLOR,
            'stroke-width': 0.5,
        }, group);

        this.svgDrawer.drawText(x - 20, 15, '3 курс', {}, group);
    }


    /**
     * @param {number} xCenter
     * @param {number} yCenter
     * @param {string} name
     */
    #drawModule(xCenter, yCenter, name) {
        const newGroup = this.svgDrawer.addGroup();
        const textMeasure = this.svgDrawer.measureText(name, MODULE_FONT);

        const actualHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;

        this.svgDrawer.drawRectangle(xCenter - textMeasure.width, 20, textMeasure.width * 2, actualHeight + 30, {}, newGroup);
        this.svgDrawer.drawText(xCenter - textMeasure.width / 2, 20, name, {'fill': 'red'}, newGroup);
    }
}
