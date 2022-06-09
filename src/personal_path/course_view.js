import View from "./view.js";

export default class CourseView extends View {
    constructor(coursePreview, descriptionWindow, event_id) {
        super(event_id);
        this.coursePreview = coursePreview
        this.descriptionWindow = descriptionWindow;
    }
}