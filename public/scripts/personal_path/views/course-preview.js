import View from "./view.js";
import {createDomElement} from "../utils.js";

export default class CoursePreview extends View {
    constructor() {
        super(createDomElement('course-preview-root'));

        this.root.setAttribute('draggable', 'true');

        this.title = createDomElement(
            'title',
            createDomElement('title-container', this.root)
        );

        this.zedCountElement = createDomElement(
            'zed-counter-text',
            createDomElement('zed-counter', this.root)
        );
    }
}