import {createSVGElement, preCalc} from "./utils.js";
import {SVGDrawer} from "./svg-drawer.js";
import {BLOCK_MODULE_STYLE_NAME, BLOCK_THEME_STYLE_NAME, MODULE_FONT} from "./constants.js";

const BLOCK_THEME_PARAMS = {
    'class': BLOCK_THEME_STYLE_NAME,
}

const BLOCK_MODULE_PARAMS = {
    'class': BLOCK_MODULE_STYLE_NAME,
}

const THEME_LINE_PARAMS = {
    fill: 'none',
    stroke: 'rgb(43, 120, 228)',
    'stroke-width': 4,
}

const MODULE_LINE_PARAMS = {
    fill: 'none',
    stroke: 'rgb(43, 120, 228)',
    'stroke-width': 4,
    'stroke-dasharray': '0.8, 12',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
}

export class RoadmapDrawer {

    constructor(roadmapConfig) {
        this.roadmapConfig = roadmapConfig;

        this.root = null;
        this.svgDrawer = null;
    }

    run() {
        this.roadmapConfig = preCalc(this.roadmapConfig);


        this.root = createSVGElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            viewBox: `0 0 1000 ${this.roadmapConfig.viewHeight}`,
        });
        this.svgDrawer = new SVGDrawer(this.root);

        let prevThemeX = 500;
        let prevThemeY = 0;

        for (const element of this.roadmapConfig.config) {
            this.#drawPath(prevThemeX, prevThemeY, element.x, element.y, THEME_LINE_PARAMS);
            const themeBlock = this.#drawTheme(element.x, element.y, element.title);

            for (const child of element.children) {
                this.#drawPath(element.x, element.y, child.x, child.y, MODULE_LINE_PARAMS, themeBlock);
                this.#drawModule(child.x, child.y, child.title);
            }

            prevThemeX = element.x;
            prevThemeY = element.y;
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

        this.svgDrawer.drawRectangle(xCenter - textMeasure.width / 4, yCenter - actualHeight * 2, textMeasure.width * 2, actualHeight * 3, BLOCK_MODULE_PARAMS, newGroup);
        this.svgDrawer.drawText(xCenter, yCenter, name, {'fill': 'white'}, newGroup);

        return newGroup;
    }

    /**
     * @param {number} xCenter
     * @param {number} yCenter
     * @param {string} name
     */
    #drawTheme(xCenter, yCenter, name) {
        const newGroup = this.svgDrawer.addGroup();
        const textMeasure = this.svgDrawer.measureText(name, MODULE_FONT);

        const actualHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;

        this.svgDrawer.drawRectangle(xCenter - textMeasure.width / 4, yCenter - actualHeight * 2, textMeasure.width * 2, actualHeight * 3, BLOCK_THEME_PARAMS, newGroup);
        this.svgDrawer.drawText(xCenter, yCenter, name, {'fill': 'white'}, newGroup);

        return newGroup;
    }

    #drawPath(fromX, fromY, toX, toY, params, parent) {
        this.svgDrawer.drawPath(`M${fromX} ${fromY}Q${fromX + 10} ${fromY + 50} ${toX} ${toY}`, params, parent);
    }
}
