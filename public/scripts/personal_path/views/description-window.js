import View from "./view.js";
import constants from "../constants.js";
<<<<<<< HEAD
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

        // this.window = document.createElement('div');
        // this.window.classList.add('window');
        //
        // this.descriptionElement = document.createElement('div');
        // this.descriptionElement.classList.add('desc');

        this.hide();

        //this.window.appendChild(this.descriptionElement);
        //this.descriptionSection.appendChild(this.window);
=======

export default class DescriptionWindow extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.id = eventId;
        this.root.classList.add('desc-window-root');

        this.mainContainer = document.createElement('div');
        this.descriptionSection.classList.add('container');

        this.window = document.createElement('div');
        this.window.classList.add('window');

        this.descriptionElement = document.createElement('div');
        this.descriptionElement.classList.add('desc');

        this.closeBtn = document.createElement('div');
        this.closeBtn.innerText = 'закрыть';
        this.closeBtn.classList.add('close-btn');

        this.closeBtn.addEventListener('click', () => this.hide());

        this.hide();

        this.window.appendChild(this.descriptionElement);
        this.window.appendChild(this.closeBtn);
        this.descriptionSection.appendChild(this.window);
>>>>>>> origin/fix/dd_event
        this.root.appendChild(this.descriptionSection);
        document.body.appendChild(this.root);
    }

    /**
     * @param {CourseInfo} course
     * **/
    set currentCourse(course) {
        let debugInfo = constants.DEBUG ? course.id + '\n' : '';
<<<<<<< HEAD
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

    static #createDescriptionHtml(descriptionObj) {

=======
        this.descriptionElement.innerHTML = debugInfo + course.description;
    }

    show() {
        this.root.hidden = false;
    }

    hide() {
        this.root.hidden = true;
>>>>>>> origin/fix/dd_event
    }
}