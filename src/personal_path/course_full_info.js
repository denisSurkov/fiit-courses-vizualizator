import CoursePreviewInfo from "./course_preview_info.js";

export default class CourseFullInfo extends CoursePreviewInfo {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} zedCount
     * @param {string} description
     * @param {CourseView} view
     * **/
    constructor(id, name, zedCount, description, view) {
        super(id, name, zedCount, view);

        this.id = id;
        this.name = name;
        this.zedCount = zedCount;
        this.description = description;
    }

    createPreviewInfo() {
        return new CoursePreviewInfo(
            this.id,
            this.name,
            this.zedCount,
            this.view.coursePreview
        );
    }
}