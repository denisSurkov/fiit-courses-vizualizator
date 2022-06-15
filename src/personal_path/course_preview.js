import View from "./view.js";

export default class CoursePreview extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.id = eventId;
        this.root.classList.add('course-preview-root');
        this.root.setAttribute('draggable', 'true');

        this.title = document.createElement('span');
        this.zedCountElement = document.createElement('span');

        this.root.appendChild(this.title);
        this.root.appendChild(document.createElement('br'));
        this.root.appendChild(this.zedCountElement);
    }
}