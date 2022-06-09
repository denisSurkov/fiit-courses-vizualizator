import View from "./view.js";

export default class CoursePreview extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.event_id = eventId;
        this.root.classList.add('course-block');

        this.title = document.createElement('span');
        this.zedCountElement = document.createElement('span');

        // target.setAttribute('draggable', 'true');
    }
}