import SemesterInfo from "./semester-info.js";

export default class FreeZone extends SemesterInfo {
    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<CourseInfo>} courses
     * @param {Number} maxZedCount
     * @param {string} semTime
     * @param {FreeZoneView} view
     * **/
    constructor(
        id,
        name,
        courses,
        maxZedCount,
        semTime,
        view) {
        super(id, name, courses, maxZedCount, semTime, view);
    }
}