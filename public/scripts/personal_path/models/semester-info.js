import Model from './model.js';
import constants from '../constants.js';

export default class SemesterInfo extends Model {
    #courses = [];
    _zedCount;
    _name;
    _maxZedCount;

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<CourseInfo>} courses
     * @param {Number} maxZedCount
     * @param {string} semTime
     * @param {SemesterView} view
     * **/
    constructor(id, name, courses, maxZedCount, semTime, view) {
        super(view);

        this.id = id;
        this.semTime = semTime;
        this.name = name;
        this.zedCount = 0;

        courses.forEach(item => this.addCourse(item));
        this.maxZedCount = maxZedCount;
    }

    get maxZedCount() {
        return this._maxZedCount;
    }

    set maxZedCount(value) {
        this._maxZedCount = value;

        this.view.maxZedCount = this._maxZedCount;
    }

    set name(value) {
        this._name = value

        this.view.title.innerText = value;
    }

    get zedCount() {
        return this._zedCount;
    }

    set zedCount(value) {
        this._zedCount = value;

        this.view.zedCount = this._zedCount;
    }

    /**
     * @param {CourseInfo} course
     * **/
    isSuitableForAdding(course) {
        return this.semTime === course.semTime || this.semTime === constants.semTime.ANY;
    }

    /**
     * @param {CourseInfo} course
     * **/
    addCourse(course) {
        if (this.#courses.indexOf(course) >= 0 || !this.isSuitableForAdding(course))
            return;

        this.#courses.push(course);
        this.zedCount += course.zedCount;

        this.view.zedCount = this._zedCount;
        this.view.courseContainer.appendChild(course.view.root);
        this.view.updateUrl(this.id, this.#courses);
    }

    /**
     * @param {CourseInfo} course
     * **/
    removeCourse(course) {
        let index = this.#courses.indexOf(course);
        if (index < 0)
            return;

        this.#courses.splice(index, 1);

        this._zedCount -= course.zedCount

        this.view.zedCount = this._zedCount;
        this.view.courseContainer.removeChild(course.view.root);
        this.view.updateUrl(this.id, this.#courses);
    }

    selectCoursesWithFilter(filterCallback) {
        return this.#courses.filter(filterCallback);
    }
}
