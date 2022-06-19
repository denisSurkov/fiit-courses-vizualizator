import SemesterView from './semester-view.js';
import constants from '../constants.js';
import {createDomElement} from '../utils.js';

export default class FreeZoneView extends SemesterView {
    #model;
    #currentCategory;
    #currentSemTime;

    /**
     * @param {URL} url
     * @param {Array<string>} categories
     * **/
    constructor(url, categories) {
        super(url);

        this.root.classList.add('free-zone-root');
        this.hide();

        this.categories = categories;
        if (categories.length < 1)
            throw new Error('must be at least one category');

        this.zedCountElement.remove();

        this.status = createDomElement('', this.root)

        this.hideBtn = createDomElement('close-btn', this.root);
        this.hideBtn.innerText = 'закрыть';
        this.hideBtn.addEventListener('click', () => this.hide());

        this.navigationContainer = createDomElement('navigation-container');
        this.root.insertBefore(this.navigationContainer, this.root.firstChild);

        this.categoryBtns = {};
        for (const category of this.categories) {
            let btn = createDomElement('filter-btn', this.navigationContainer);
            btn.innerText = constants.courseCategoryAliases[category];
            btn.addEventListener('click', () => this.currentCategory = category);

            this.categoryBtns[category] = btn;
        }

        this.currentCategory = this.categories[0];
        this.#currentSemTime = constants.semTime.ANY;
    }

    get currentCategory() {
        return this.#currentCategory;
    }

    set currentCategory(value) {
        if (this.currentCategory !== undefined)
            this.categoryBtns[this.currentCategory].style.removeProperty('opacity');

        this.#currentCategory = value;

        this.categoryBtns[this.currentCategory].style.opacity = '1';

        if (this.#model !== undefined)
            this.fillContainer(this.#model.selectCoursesWithFilter(item => this.#filterCourse(item)));

        if (constants.DEBUG)
            this.status.innerText = this.#currentSemTime + ' ' + this.#currentCategory;
    }

    /**
     * @param {FreeZone} value
     * **/
    set model(value) {
        this.#model = value;

        this.currentSemTime = this.#currentSemTime;
    }

    set currentSemTime(value) {
        this.#currentSemTime = value;

        this.fillContainer(this.#model.selectCoursesWithFilter(item => this.#filterCourse(item)));

        if (value === constants.semTime.SPRING) {
            this.root.style.removeProperty('right');
            this.root.style.setProperty('left', '0');
        } else if (value === constants.semTime.FALL) {
            this.root.style.removeProperty('left');
            this.root.style.setProperty('right', '0');
        }

        if (constants.DEBUG)
            this.status.innerText = this.#currentSemTime + ' ' + this.#currentCategory;
    }

    /**
     * @param {Array<CourseInfo>} courses
     * **/
    fillContainer(courses) {
        this.courseContainer.innerHTML = '';

        courses.forEach(course => {
            this.courseContainer.appendChild(course.view.root);
        });
    }

    show() {
        this.root.style.removeProperty('display');
    }

    hide() {
        this.root.style.display = 'none';
    }

    #filterCourse(course) {
        return course.category === this.currentCategory
            && (course.semTime === this.#currentSemTime
                || this.#currentSemTime === constants.semTime.ANY);
    }
}
