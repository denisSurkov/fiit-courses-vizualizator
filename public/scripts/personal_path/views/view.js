export default class View {
    #eventId

    constructor(eventId, root) {
        this.root = root;
        this.eventId = eventId;
    }

    set eventId(id) {
        this.#eventId = id;

        if (this.root !== undefined)
            this.root.id = this.#eventId;
    }

    get eventId() {
        return this.#eventId;
    }
}