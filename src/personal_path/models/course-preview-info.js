import Model from "./model.js";

export default class CoursePreviewInfo extends Model {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} zedCount
     * @param {CoursePreview} view
     * **/
    constructor(id, name, zedCount, view) {
        super(view);

        this.id = id;
        this.name = name;
        this.zedCount = zedCount;
    }
}