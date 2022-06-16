import View from "./view.js";

export default class SemesterView extends View {
    /**
     * @param {CourseContainer} courseContainer
     * @param {URL} url
     * @param {string} eventId
     * **/
    constructor(courseContainer, url, eventId) {
        super(eventId, document.createElement('div'));

        this.url = url;

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

    /**
     * @param {string} semesterId
     * @param {Array<CourseFullInfo>} courses
     * **/
    updateUrl(semesterId, courses) {
        if (!this.url)
            return;

        this.url.searchParams.set(semesterId, courses.map(item => item.id));

        history.pushState(null, null, this.url.href);
    }
}