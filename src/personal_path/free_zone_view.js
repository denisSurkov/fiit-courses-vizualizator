import SemesterView from "./semester_view.js";

export default class FreeZoneView extends SemesterView {
    /**
     * @param {CourseContainer} courseContainer
     * @param {URL} url
     * @param {string} eventId
     * **/
    constructor(courseContainer, url, eventId) {
        super(courseContainer, url, eventId);

        this.maxZedCountElement.remove();
        this.zedCountElement.remove();
        //TODO: filters
    }
}