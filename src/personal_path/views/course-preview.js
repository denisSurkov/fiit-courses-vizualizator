import View from "./view.js";

export default class CoursePreview extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.id = eventId;
        this.root.classList.add('course-preview-root');
        this.root.setAttribute('draggable', 'true');

        this.title = document.createElement('div');
        this.title.classList.add('title');
        let titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');

        titleContainer.appendChild(this.title);


        this.zedCountElement = document.createElement('div');
        this.zedCountElement.classList.add('zed-counter-text');

        let zedCounterDiv = document.createElement('div');
        zedCounterDiv.appendChild(this.zedCountElement);
        zedCounterDiv.classList.add('zed-counter');

        this.root.appendChild(titleContainer);
        this.root.appendChild(zedCounterDiv);
    }
}