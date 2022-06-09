import View from "./view.js";

export default class DescriptionWindow extends View {
    constructor(eventId) {
        super(eventId, document.createElement('div'));

        this.root.id = eventId;
        this.root.classList.add('desc-window');
    }
}