import View from "./view.js";

export default class SemesterView extends View {
    /**
     * @param {CourseContainer} courseContainer
     * @param {URLSearchParams} urlSearchParams
     * @param {string} eventId
     * **/
    constructor(courseContainer, urlSearchParams, eventId) {
        super(eventId, document.createElement('div'));

        this.root.classList.add('semester-root');

        this.courseContainer = courseContainer;

        this.title = document.createElement('span');
        this.title.classList.add('sem-title');

        this.zedCountElement = document.createElement('span');
        this.zedCountElement.classList.add('zed-stat');

        this.maxZedCountElement = document.createElement('span');

        this.root.appendChild(this.title);
        this.root.appendChild(this.courseContainer.root);
        this.root.appendChild(this.zedCountElement);
        this.root.appendChild(this.maxZedCountElement);

        this.urlSearchParams = urlSearchParams;
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