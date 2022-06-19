import View from './view.js';
import {createDomElement} from '../utils.js';

export default class SemesterView extends View {
    /**
     * @param {URL} url
     * **/
    constructor(url) {
        super(createDomElement('semester-root'));

        this.url = url;

        this.title = createDomElement('sem-title', this.root, '', 'span');
        this.courseContainer = createDomElement('courses-container', this.root);
        this.zedCountElement = createDomElement(
            'zed-counter-text',
            createDomElement('zed-counter', this.root)
        );
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
