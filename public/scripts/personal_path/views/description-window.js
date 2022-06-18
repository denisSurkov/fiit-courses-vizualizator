import View from "./view.js";
import constants from "../constants.js";
import {createDomElement} from "../utils.js";

export default class DescriptionWindow extends View {
    constructor(eventId) {
        super(eventId, createDomElement('div', 'description-container'));

        this.root.addEventListener('click', event => {
           this.hide();
           event.stopPropagation();
        });

        this.descriptionSection = createDomElement('div', 'description-section');

        this.descriptionSection.addEventListener('click', event => event.stopPropagation());

        this.hide();

        this.root.appendChild(this.descriptionSection);
        document.body.appendChild(this.root);
    }

    /**
     * @param {CourseInfo} course
     * **/
    set currentCourse(course) {
        let debugInfo = constants.DEBUG ? course.id + '\n' : '';
        this.descriptionSection.innerHTML = debugInfo + course.description;
    }

    show() {
        this.root.style.display = 'inherit';
        this.descriptionSection.style.display = 'inherit';
    }

    hide() {
        this.root.style.removeProperty('display');
        this.descriptionSection.style.removeProperty('display');
    }
}