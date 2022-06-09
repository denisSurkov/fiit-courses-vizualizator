import Model from "./model.js";

export default class SemesterInfo extends Model {
    _zedCount;
    _courses = [];
    _name;
    _maxZedCount;

    /**
     * @param {string} id
     * @param {string} name
     * @param {Array<CoursePreviewInfo>} courses
     * @param {Number} maxZedCount
     * @param {SemesterView} view
     * **/
    constructor(id, name, courses, maxZedCount, view) {
        super(view);

        this.id = id;
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
     * @param {CoursePreviewInfo} course
     * **/
    addCourse(course) {
        //TODO: Validate (duplicated courses)
        this._courses.push(course);
        this.zedCount += course.zedCount;

        this.view.zedCount = this._zedCount;
        this.view.courseContainer.appendChild(course.view.root);
    }

    /**
     * @param {CoursePreviewInfo} course
     * **/
    removeCourse(course) {
        let index = this._courses.indexOf(course);
        if (index < 0)
            return;

        this._courses.splice(index, 1);

        this._zedCount -= course.zedCount

        this.view.zedCount = this._zedCount;
        this.view.courseContainer.removeChild(course.view.root);
    }
}