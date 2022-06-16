import SemesterInfo from "./semester-info.js";
import constants from "../consts.js";

export default class FreeZone extends SemesterInfo {
    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<CourseFullInfo>} courses
     * @param {Number} maxZedCount
     * @param {string} semTime
     * @param {FreeZoneView} view
     * **/
    constructor(id, name, courses, maxZedCount, semTime, view) {
        super(id, name, courses, maxZedCount, semTime, view);
    }

    /**
     * @param {string} semTime
     * **/
    getCoursesBySemTime(semTime) {
        return semTime === constants.semTime.ANY
            ? [...this.courses]
            : this.courses.filter(course => course.semTime === semTime);
    }
}