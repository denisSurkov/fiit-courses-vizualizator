import Model from './model.js';

export default class CourseInfo extends Model {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} zedCount
     * @param {string} semTime
     * @param {string} category
     * @param {CoursePreview} view
     * **/
    constructor(
        id,
        name,
        zedCount,
        semTime,
        category,
        view
    ) {
        super(view);

        this.id = id;
        this.name = name;
        this.zedCount = zedCount;
        this.semTime = semTime;
        this.category = category;

        [view.root, view.title, view.zedCountElement]
            .concat(...view.root.children)
            .forEach(item => item.setAttribute('data-course', this.id));
        view.title.innerText = this.name;
        view.zedCountElement.innerText = this.zedCount.toString();
    }
}
