import View from "./view.js";

export default class CourseContainer extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.classList.add('courses-container');
    }
}