import Storage from "../state_storage/storage.js";


let draggableDomElement = null;
let stateById = {};


function handleDragLeaveForDropZone(event) {
    let zoneState = stateById[event.target.id];
    let itemState = stateById[draggableDomElement.id];

    zoneState.setValue('zedCount', zoneState.getValue('zedCount') - itemState.getValue('zedCount'));
}

function handleDragEnterForDropZone(event) {
    let zoneState = stateById[event.target.id];
    let itemState = stateById[draggableDomElement.id];

    console.log(zoneState.getValue('zedCount'));
    console.log(itemState.getValue('zedCount'));
    let nextCount = zoneState.getValue('zedCount') + itemState.getValue('zedCount');

    console.log(nextCount);

    zoneState.setValue('zedCount', nextCount);
}

function handleDragOverForDropZone(event) {
    event.preventDefault();
}

function handleDropForDropZone(event) {
    console.log('drop');
    draggableDomElement.parentNode.removeChild(draggableDomElement);
    event.target.appendChild(draggableDomElement);

    draggableDomElement = null;
}

function createSemesterView(id) {
    let target = document.createElement('div');
    target.id = id;
    target.classList.add('courses-container', 'sem-container');

    let title = document.createElement('span');
    title.classList.add('sem-title');

    let zedCount = document.createElement('span');
    zedCount.classList.add('zed-stat');

    document.body.appendChild(target);
    target.appendChild(title);
    target.appendChild(zedCount);

    target.addEventListener('dragleave', handleDragLeaveForDropZone);
    target.addEventListener('dragenter', handleDragEnterForDropZone);
    target.addEventListener('dragover', handleDragOverForDropZone);
    target.addEventListener('drop', handleDropForDropZone);

    return {target, title, zedCount};
}

function createSemester(id, title, zedCount) {
    let view = createSemesterView(id);

    let storage = new Storage();
    storage.register('title', function(update) {
        view.title.innerText = update.nextValue;
    });

    storage.register('zedCount', function(update) {
        view.zedCount.innerText = 'Zed: ' + update.nextValue;
    });

    storage.updateState({title, zedCount});

    return storage;
}

function handleDragStartForDraggable(event) {
    draggableDomElement = event.target;
}

function handleDragEndForDraggable(event) {
    console.log('dragend');
}

function createCourseView(id, courseContainer) {
    let target = document.createElement('div');
    target.id = id;
    target.setAttribute('draggable', 'true');
    target.classList.add('course-block');
    let title = document.createElement('span');
    let zedCount = document.createElement('span');

    courseContainer.appendChild(target);
    target.appendChild(title);
    target.appendChild(document.createElement('br'));
    target.appendChild(zedCount);

    target.addEventListener('dragstart', handleDragStartForDraggable);
    target.addEventListener('dragend', handleDragEndForDraggable);

    return {
        target,
        title,
        zedCount
    };
}

function createCourse(id, courseContainer, title, zedCount) {
    let view = createCourseView(id, courseContainer);
    let storage = new Storage();

    storage.register('title', function(update) {
        view.title.innerText = update.nextValue;
    });

    storage.register('zedCount', function(update) {
        view.zedCount.innerText = 'Zed: ' + update.nextValue;
    });

    storage.updateState({title, zedCount});

    return storage;
}


stateById['sem5'] = createSemester('sem5', 'Sem 5', 0);
stateById['sem6'] = createSemester('sem6', 'Sem 6', 0);

let startContainer = document.querySelector('#courses-store');
stateById['c1'] = createCourse('c1', startContainer, 'OS', 4);
stateById['c2'] = createCourse('c2', startContainer, 'Linear Algebra', 6);
