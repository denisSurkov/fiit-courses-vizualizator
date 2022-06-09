import View from "./view.js";

export default class SemesterView extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.courseContainer = document.createElement('div');
        this.courseContainer.classList.add('courses-container', 'sem-container');

        this.title = document.createElement('span');
        this.title.classList.add('sem-title');

        this.zedCountElement = document.createElement('span');
        this.zedCountElement.classList.add('zed-stat');

        this.maxZedCountElement = document.createElement('span');

        this.root.appendChild(this.title);
        this.root.appendChild(this.courseContainer);
        this.root.appendChild(this.zedCountElement);
        this.root.appendChild(this.maxZedCountElement);
    }

    /**
     * @param {Number} value
     * **/
    set zedCount(value) {
        this.zedCountElement.innerText = `Zed: ${value}/`;
    }

    set maxZedCount(value) {
        this.maxZedCountElement.innerText = `${value}`;
    }
}