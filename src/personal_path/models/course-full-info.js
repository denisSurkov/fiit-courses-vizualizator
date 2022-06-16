import CoursePreviewInfo from "./course-preview-info.js";

export default class CourseFullInfo extends CoursePreviewInfo {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} zedCount
     * @param {string} description
     * @param {string} semTime
     * @param {CourseView} view
     * **/
    constructor(id, name, zedCount, description, semTime,  view) {
        super(id, name, zedCount, view);

        this.id = id;
        this.name = name;
        this.zedCount = zedCount;
        this.description = description;
        this.semTime = semTime;

        view.coursePreview.title.innerText = this.name;
        view.coursePreview.zedCountElement.innerText = this.zedCount;
        view.descriptionWindow.descriptionElement.innerText = this.description;
    }
}