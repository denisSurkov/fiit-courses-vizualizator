let eventIdsCount = 0;
export const modelByEventId = {};

function createEventId() {
    return 'eid' + (eventIdsCount++);
}

export function registerDragAndDropModel(element, model) {
    element.id = createEventId();

    modelByEventId[element.id] = model;
}