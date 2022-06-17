import SemesterView from "./semester-view.js";
import constants from "../constants.js";

export default class FreeZoneView extends SemesterView {
    _model;

    /**
     * @param {CourseContainer} courseContainer
     * @param {URL} url
     * @param {Array<string>} categories
     * @param {string} eventId
     * **/
    constructor(courseContainer, url, categories, eventId) {
        super(courseContainer, url, eventId);

        this.root.classList.add('free-zone-root');
        this.hide();

        this.categories = categories;
        if (categories.length < 1)
            throw new Error('must be at least one category');

        this.zedCountElement.remove();

        this.hideBtn = document.createElement('div');
        this.hideBtn.classList.add('filter-btn');
        this.hideBtn.innerText = 'закрыть';
        this.hideBtn.addEventListener('click', () => this.hide());

        this.status = document.createElement('div');

        this.navigationContainer = document.createElement('div');
        this.navigationContainer.classList.add('navigation-container');
        this.root.insertBefore(this.navigationContainer, this.root.firstChild);


        this.root.appendChild(this.status);
        this.root.appendChild(this.hideBtn);

        this.categoryBtns = [];
        for (const category of this.categories) {
            let btn = document.createElement('div');
            this.categoryBtns.push(btn);

            btn.classList.add('filter-btn');
            btn.innerText = constants.courseCategoryAliases[category];

            btn.addEventListener('click', () => {
               this.currentCategory = category;
            });

            this.navigationContainer.appendChild(btn);
        }

        this._currentCategory = this.categories[0];
        this._currentSemTime = constants.semTime.ANY;
    }

    get currentCategory() {
        return this._currentCategory;
    }

    set currentCategory(value) {
        this._currentCategory = value;

        this.fillContainer(this._model.selectCoursesWithFilter(item => this.#filterCourse(item)));

        if (constants.DEBUG)
            this.status.innerText = this._currentSemTime + ' ' + this._currentCategory;
    }

    /**
     * @param {FreeZone} value
     * **/
    set model(value) {
        this._model = value;

        this.currentSemTime = this._currentSemTime;
    }

    set currentSemTime(value) {
        this._currentSemTime = value;

        this.fillContainer(this._model.selectCoursesWithFilter(item => this.#filterCourse(item)));

        if (value === constants.semTime.SPRING) {
            this.root.style.removeProperty('right');
            this.root.style.setProperty('left', '0');
        } else if (value === constants.semTime.FALL) {
            this.root.style.removeProperty('left');
            this.root.style.setProperty('right', '0');
        }

        if (constants.DEBUG)
            this.status.innerText = this._currentSemTime + ' ' + this._currentCategory;
    }

    /**
     * @param {Array<CourseInfo>} courses
     * **/
    fillContainer(courses) {
        this.courseContainer.root.innerHTML = '';

        courses.forEach(course => {
            this.courseContainer.root.appendChild(course.view.coursePreview.root);
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
            && (course.semTime === this._currentSemTime
                || this._currentSemTime === constants.semTime.ANY);
    }
}