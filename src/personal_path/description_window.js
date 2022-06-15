import View from "./view.js";

export default class DescriptionWindow extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.id = eventId;
        this.root.classList.add('desc-window-root');

        this.mainContainer = document.createElement('div');
        this.mainContainer.classList.add('container');

        this.window = document.createElement('div');
        this.window.classList.add('window');

        this.descriptionElement = document.createElement('div');
        this.descriptionElement.classList.add('desc');

        this.closeBtn = document.createElement('div');
        this.closeBtn.innerText = 'close';
        this.closeBtn.classList.add('close-btn');

        this.closeBtn.addEventListener('click', () => this.hide());

        this.hide();

        this.window.appendChild(this.descriptionElement);
        this.window.appendChild(this.closeBtn);
        this.mainContainer.appendChild(this.window);
        this.root.appendChild(this.mainContainer);
        document.body.appendChild(this.root);
    }

    /**
     * @param {CourseFullInfo} course
     * **/
    set currentCourse(course) {
        this.descriptionElement.innerText = course.description;
    }

    show() {
        this.root.hidden = false;
    }

    hide() {
        this.root.hidden = true;
    }
}