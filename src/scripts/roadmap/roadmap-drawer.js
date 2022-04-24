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
            viewBox: `0 0 1920 ${this.roadmapConfig.viewHeight}`,
        });
        this.svgDrawer = new SVGDrawer(this.root);

        for (const element of this.roadmapConfig.config) {
            console.log(element)
            this.#drawModule(element.x, element.y, element.title);

            for (const child of element.children) {
                this.#drawModule(child.x, child.y, child.title);
            }
        }

        return this.root;
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

        this.svgDrawer.drawRectangle(xCenter - textMeasure.width / 4, yCenter - actualHeight * 2, textMeasure.width * 2, actualHeight * 3, {}, newGroup);
        this.svgDrawer.drawText(xCenter, yCenter, name, {'fill': 'red'}, newGroup);
    }
}
