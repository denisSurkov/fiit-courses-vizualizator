import SemesterView from "./semester_view.js";
import SemConstants from "./sem_consts.js";

export default class FreeZoneView extends SemesterView {
    _model;

    /**
     * @param {CourseContainer} courseContainer
     * @param {URL} url
     * @param {string} eventId
     * **/
    constructor(courseContainer, url, eventId) {
        super(courseContainer, url, eventId);

        this.maxZedCountElement.remove();
        this.zedCountElement.remove();

        this.fallFilterBtn = document.createElement('div');
        this.fallFilterBtn.classList.add('filter-btn');
        this.fallFilterBtn.innerText = 'fall courses';
        this.fallFilterBtn.addEventListener('click', () => {
            this.fillContainer(this._model.getCoursesBySemTime(SemConstants.SemTime.FALL));
        });

        this.springFilterBtn = document.createElement('div');
        this.springFilterBtn.classList.add('filter-btn');
        this.springFilterBtn.innerText = 'spring courses';
        this.springFilterBtn.addEventListener('click', () => {
            this.fillContainer(this._model.getCoursesBySemTime(SemConstants.SemTime.SPRING));
        });

        this.anyBtn = document.createElement('div');
        this.anyBtn.classList.add('filter-btn');
        this.anyBtn.innerText = 'All courses';
        this.anyBtn.addEventListener('click', () => {
            this.fillContainer(this._model.getCoursesBySemTime(SemConstants.SemTime.ANY));
        });

        this.root.appendChild(this.anyBtn);
        this.root.appendChild(this.fallFilterBtn);
        this.root.appendChild(this.springFilterBtn);
    }

    /**
     * @param {FreeZone} value
     * **/
    set model(value) {
        this._model = value;
    }

    fillContainer(courses) {
        this.courseContainer.root.innerHTML = '';
        courses.forEach(course => this.courseContainer.root.appendChild(course.view.coursePreview.root));
    }
}