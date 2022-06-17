import {createSVGElement, preCalc} from './utils.js';
import {SVGDrawer} from './svg-drawer.js';
import {BLOCK_MODULE_STYLE_NAME, BLOCK_THEME_STYLE_NAME, MODULE_FONT, THEME_FONT} from './constants.js';
import { convertCourseNameToId } from '../utils.js';

const BLOCK_THEME_PARAMS = {
    'class': BLOCK_THEME_STYLE_NAME,
    'rx': 5,
}

const BLOCK_MODULE_PARAMS = {
    'class': BLOCK_MODULE_STYLE_NAME,
    'rx': 5,
}

const SEMESTR_LINE_PARAMS = {
    fill: 'none',
    stroke: 'rgb(43, 120, 228)',
    'stroke-width': 4,
}

const COURSE_LINE_PARAMS = {
    fill: 'none',
    stroke: 'rgb(43, 120, 228)',
    'stroke-width': 4,
    'stroke-dasharray': '0.8, 12',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
}

const AVERAGE_PADDING_FOR_LINES = 25;

export class RoadmapDrawer {

    constructor(roadmapConfig, courses) {
        this.roadmapConfig = roadmapConfig;
        this.courses = courses;

        this.root = null;
        this.svgDrawer = null;
    }

    run() {
        this.roadmapConfig = preCalc(this.roadmapConfig);


        this.root = createSVGElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            viewBox: `-100 0 1000 ${this.roadmapConfig.viewHeight}`,
        });
        this.svgDrawer = new SVGDrawer(this.root);


        for (let i = 1; i < this.roadmapConfig.config.length; i++) {
            const prevSemester = this.roadmapConfig.config[i - 1];
            const currentSemester = this.roadmapConfig.config[i];

            const maxYOfPrevSemesterChild = prevSemester.children[prevSemester.children.length - 1].y;
            const minYOfCurrentSemesterChild = currentSemester.children[0].y;

            const differenceOfY = minYOfCurrentSemesterChild - maxYOfPrevSemesterChild;
            const almostMiddlePointInDiff = maxYOfPrevSemesterChild + differenceOfY / 2;

            this.#drawSemesterPath(prevSemester.x, prevSemester.y, almostMiddlePointInDiff, currentSemester.x, currentSemester.y);
        }

        for (const element of this.roadmapConfig.config) {
            this.#drawSemester(element);
        }


        return this.root;
    }

    #drawSemester(semesterData) {
        const semester = this.svgDrawer.addGroup();

        for (const child of semesterData.children) {
            this.#drawCoursePath(semesterData.x, semesterData.y, child.x, child.y, semester);

            const courseName = this.courses[child.course].title;
            const dataCourse = convertCourseNameToId(courseName);

            this.#drawModule(child.x, child.y, courseName, semester, dataCourse);
        }

        this.#drawTheme(semesterData.x, semesterData.y, semesterData.title, semester);
    }


    /**
     * @param {number} xCenter
     * @param {number} yCenter
     * @param {string} name
     * @param {SVGElement} group
     */
    #drawModule(xCenter, yCenter, name, group, dataCourse) {
        const textMeasure = this.svgDrawer.measureText(name, MODULE_FONT);
        const actualHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;
        const currentBlockParams = {...BLOCK_MODULE_PARAMS, 'data-course': dataCourse};
 
        this.svgDrawer.drawRectangle(xCenter - textMeasure.width / 4, yCenter - actualHeight, textMeasure.width * 1.2, actualHeight * 1.5, currentBlockParams, group);
        this.svgDrawer.drawText(xCenter - textMeasure.width / 10, yCenter, name, {'fill': 'white'}, group);
    }

    /**
     * @param {number} xCenter
     * @param {number} yCenter
     * @param {string} name
     * @param {SVGElement} group
     */
    #drawTheme(xCenter, yCenter, name, group) {
        const textMeasure = this.svgDrawer.measureText(name, MODULE_FONT);

        const actualHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;

        this.svgDrawer.drawRectangle(xCenter - textMeasure.width / 4, yCenter - actualHeight, textMeasure.width * 1.2, actualHeight * 1.5, BLOCK_THEME_PARAMS, group);
        this.svgDrawer.drawText(xCenter - textMeasure.width / 12, yCenter, name, {'fill': 'white'}, group);
    }

    #drawCoursePath(fromX, fromY, toX, toY, parent) {
        this.svgDrawer.drawPath(`M${fromX + AVERAGE_PADDING_FOR_LINES} ${fromY}Q${fromX} ${toY} ${toX} ${toY}`, COURSE_LINE_PARAMS, parent);
    }


    #drawSemesterPath(fromX, fromY, almostMiddlePointInDiff, toX, toY) {
        const correctFromX = fromX + AVERAGE_PADDING_FOR_LINES;
        const correctFromY = fromY;

        const correctToX = toX + AVERAGE_PADDING_FOR_LINES;
        const correctToY = toY;

        const lengthOfDiff = Math.abs(correctToX - correctFromX);

        const yBeforeMiddle = almostMiddlePointInDiff * 0.95;


        let xAfter = correctFromX + Math.sign(correctToX - correctFromX) * lengthOfDiff / 25;

        const firstLine = `M${correctFromX} ${correctFromY}L${correctFromX} ${yBeforeMiddle}`;

        const secondLine = `C${correctFromX} ${almostMiddlePointInDiff} ${correctFromX} ${almostMiddlePointInDiff} ${xAfter} ${almostMiddlePointInDiff}`;


        xAfter = correctToX - Math.sign(correctToX - correctFromX) * lengthOfDiff / 25;
        const thirdLine = `L${xAfter} ${almostMiddlePointInDiff}`;


        const yAfterMiddle = almostMiddlePointInDiff * 1.05;

        const fourthLine = `C${correctToX} ${almostMiddlePointInDiff} ${correctToX} ${almostMiddlePointInDiff} ${correctToX} ${yAfterMiddle}`;
        const fiveLine = `L${correctToX} ${correctToY}`;


        this.svgDrawer.drawPath(
            firstLine + secondLine + thirdLine + fourthLine + fiveLine, SEMESTR_LINE_PARAMS);
    }
}
