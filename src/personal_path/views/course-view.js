import View from "./view.js";

export default class CourseView extends View {
    constructor(coursePreview, descriptionWindow, eventId) {
        super(eventId);
        this.coursePreview = coursePreview
        this.descriptionWindow = descriptionWindow;
    }
}