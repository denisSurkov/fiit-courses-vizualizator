import Model from "./model.js";

export default class CourseInfo extends Model {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} zedCount
     * @param {string} description
     * @param {string} semTime
     * @param {string} category
     * @param {CourseView} view
     * **/
    constructor(
        id,
        name,
        zedCount,
        description,
        semTime,
        category,
        view
    ) {
        super(view);

        this.id = id;
        this.name = name;
        this.zedCount = zedCount;
        this.description = description;
        this.semTime = semTime;
        this.category = category;

        view.coursePreview.title.innerText = this.name;
        view.coursePreview.zedCountElement.innerText = this.zedCount.toString();
    }
}