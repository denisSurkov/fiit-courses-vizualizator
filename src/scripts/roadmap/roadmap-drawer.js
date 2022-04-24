import {createSVGElement, preCalc} from "./utils.js";
import {SVGDrawer} from "./svg-drawer.js";
import {THEME_BLOCK_COLOR} from "./constants.js";

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

        this.#drawStart(1920 / 2);

        return this.root;
    }


    #drawStart(x) {
        const group = this.svgDrawer.addGroup();

        this.svgDrawer.drawRectangle(x - 100 / 2, 100, 30, {
            stroke: 'black',
            fill: THEME_BLOCK_COLOR,
            'stroke-width': 0.5,
        }, group);

        this.svgDrawer.drawText(x - 20, 15, '3 курс', {}, group);
    }


}
