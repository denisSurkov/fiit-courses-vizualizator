import {createSVGElement, preCalc} from './utils.js';
import {SVGDrawer} from './svg-drawer.js';
import {
    BLOCK_MODULE_STYLE_NAME,
    BLOCK_THEME_STYLE_NAME,
    MODULE_FONT,
    BLOCK_TEXT_COURSE_STYLE_NAME,
    LINE_COURSE_STYLE_NAME,
    LINE_SEMESTER_STYLE_NAME,
    ZET_CIRCLE_STYLE_NAME,
    ZET_TEXT_STYLE_NAME,
} from "./constants.js";
import {convertCourseNameToId} from '../utils.js';

const BLOCK_THEME_PARAMS = {
    'class': BLOCK_THEME_STYLE_NAME,
    'rx': 5,
}

const BLOCK_MODULE_PARAMS = {
    'class': BLOCK_MODULE_STYLE_NAME,
    'rx': 5,
}

const BLOCK_TEXT_COURSE_PARAMS = {
    'class': BLOCK_TEXT_COURSE_STYLE_NAME,
}

const BLOCK_TEXT_SEMESTER_PARAMS = {
    'class': BLOCK_TEXT_COURSE_STYLE_NAME
}

const SEMESTER_LINE_PARAMS = {
    fill: 'none',
    'class': LINE_SEMESTER_STYLE_NAME,
    stroke: 'rgb(43, 120, 228)',
    'stroke-width': 4,
}

const COURSE_LINE_PARAMS = {
    fill: 'none',
    stroke: 'rgb(43, 120, 228)',
    'class': LINE_COURSE_STYLE_NAME,
    'stroke-width': 4,
    'stroke-dasharray': '0.8, 12',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
}

const AVERAGE_PADDING_FOR_LINES = 25;


const ZET_CIRCLE_PARAMS = {
    'class': ZET_CIRCLE_STYLE_NAME,
}

const ZET_TEXT_PARAMS = {
    'class': ZET_TEXT_STYLE_NAME,
}

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
            const zet = this.courses[child.course].zet;

            this.#drawCourse(child.x, child.y, courseName, semester, dataCourse, zet);
        }

        this.#drawTheme(semesterData.x, semesterData.y, semesterData.title, semester);
    }


    /**
     * @param {number} xCenter
     * @param {number} yCenter
     * @param {string} name
     * @param {SVGElement} group
     * @param {string} dataCourse
     * @param {number} zet
     */
    #drawCourse(xCenter, yCenter, name, group, dataCourse, zet) {
        const textMeasure = this.svgDrawer.measureText(name, MODULE_FONT);
        const actualHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;

        this.#drawCourseRectangle(xCenter, yCenter, textMeasure, actualHeight, group, dataCourse);
        this.#drawCourseText(xCenter, yCenter, name, textMeasure, group, dataCourse);
        this.#drawCourseZet(xCenter, yCenter, zet, textMeasure, actualHeight, group, dataCourse);
    }

    #drawCourseRectangle(xCenter, yCenter, textMeasure, actualHeight, group, dataCourse) {
        const rectangleX = xCenter - textMeasure.width / 5;
        const rectangleY = yCenter - actualHeight;
        const rectangleWidth = textMeasure.width;
        const rectangleHeight = actualHeight * 1.5

        const options = {...BLOCK_MODULE_PARAMS, 'data-course': dataCourse};

        this.svgDrawer.drawRectangle(rectangleX, rectangleY,
            rectangleWidth, rectangleHeight, options, group);
    }


    #drawCourseText(xCenter, yCenter, name, textMeasure, group, dataCourse) {
        const textX = xCenter - textMeasure.width / 10;
        const textY = yCenter;

        const options = {...BLOCK_TEXT_COURSE_PARAMS, 'data-course': dataCourse};

        this.svgDrawer.drawText(textX, textY, name, options, group);
    }

    #drawCourseZet(xCenter, yCenter, zet, textMeasure, actualHeight, group, dataCourse) {
        const circleX = xCenter + textMeasure.width * 0.8;
        const circleY = yCenter + actualHeight / 4;
        const circleOptions = {...ZET_CIRCLE_PARAMS, 'data-course': dataCourse}
        this.svgDrawer.drawCircle(circleX, circleY, 10, circleOptions, group);

        const textX = xCenter + textMeasure.width * 0.775;
        const textY = yCenter + actualHeight * 0.5;
        const textOptions = {...ZET_TEXT_PARAMS, 'data-course': dataCourse};
        this.svgDrawer.drawText(textX, textY, zet, textOptions, group);
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
        this.svgDrawer.drawText(xCenter - textMeasure.width / 12, yCenter, name, BLOCK_TEXT_SEMESTER_PARAMS, group);
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
            firstLine + secondLine + thirdLine + fourthLine + fiveLine, SEMESTER_LINE_PARAMS);
    }
}
