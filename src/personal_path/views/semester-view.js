import View from "./view.js";
import constants from "../constants.js";

export default class SemesterView extends View {
    _model;

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

        this.zedCountElement = document.createElement('div');
        this.zedCountElement.classList.add('zed-counter-text');

        let zedCounterContainer = document.createElement('div');
        zedCounterContainer.classList.add('zed-counter');
        zedCounterContainer.appendChild(this.zedCountElement);

        this.root.appendChild(this.title);
        this.root.appendChild(this.courseContainer.root);
        this.root.appendChild(zedCounterContainer);
    }

    /**
     * @param {Number} value
     * **/
    set zedCount(value) {
        let splitText = this.zedCountElement.innerText.split('/');
        splitText[0] = value.toString();

        this.zedCountElement.innerText = splitText.join('/');
    }

    set maxZedCount(value) {
        let splitText = this.zedCountElement.innerText.split('/');
        splitText[1] = value.toString();

        this.zedCountElement.innerText = splitText.join('/');
    }

    /**
     * @param {string} semesterId
     * @param {Array<CourseInfo>} courses
     * **/
    updateUrl(semesterId, courses) {
        if (!this.url)
            return;

        this.url.searchParams.set(semesterId, courses.map(item => item.id).toString());

        history.pushState(null, null, this.url.href);
    }
}