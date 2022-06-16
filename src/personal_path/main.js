import SemesterInfo from "./semester_info.js";
import CourseFullInfo from "./course_full_info.js";
import CourseView from "./course_view.js";
import CoursePreview from "./course_preview.js";
import SemesterView from "./semester_view.js";
import DescriptionWindow from "./description_window.js";
import CoursePreviewInfo from "./course_preview_info.js";
import CourseContainer from "./course_container.js";
import SemConstants from "./sem_consts.js";
import FreeZone from "./free_zone.js";
import FreeZoneView from "./free_zone_view.js";

let eventIdsCount = 0;
let modelByEventId = {};
let url = new URL(window.location.href);

/**
 * @param {View} view
 * **/
function setNextEventId(view) {
    view.eventId = 'eid' + eventIdsCount;
    eventIdsCount++;
}

async function loadModels(url, recordToModelParser, viewFactory) {
    let recordsList = await (await fetch(url)).json();

    let models = [];
    for (const record of recordsList) {
        let view = viewFactory();
        let model = recordToModelParser(record, view);

        models.push(model);
    }

    return Promise.resolve(models);
}

/**
 * @param {object} jsonRecord,
 * @param {CourseView} view
 * **/
function parseJsonToCourseFullInfo(jsonRecord, view) {
    let result = new CourseFullInfo(
        jsonRecord['id'],
        jsonRecord['name'],
        jsonRecord['zedCount'],
        jsonRecord['description'],
        jsonRecord['semTime'],
        view
    );

    modelByEventId[view.eventId] = result;
    modelByEventId[view.coursePreview.eventId] = result;
    modelByEventId[view.descriptionWindow.eventId] = result;

    return result;
}

function parseJsonToSemesterInfo(jsonRecord, courseFullInfoById, freeCourseIds, view) {
    let coursesArrayString = url.searchParams.get(jsonRecord['id']) || '';

    let result =  new SemesterInfo(
        jsonRecord['id'],
        jsonRecord['name'],
        [],
        jsonRecord['maxZedCount'],
        jsonRecord['semTime'],
        view
    );

    let coursesToAdd = [...new Set(
        coursesArrayString
            .split(',')
            .filter(item => item)
            .map(courseId => courseFullInfoById[courseId]))
    ];

    coursesToAdd = coursesToAdd.filter(course => {
        let isCourseFree = freeCourseIds.has(course.id);
        if (isCourseFree && result.isSuitableForAdding(course)) {
            freeCourseIds.delete(course.id);
            return true;
        }

        return false;
    });

    coursesToAdd.forEach(item => result.addCourse(item));

    modelByEventId[view.eventId] = result;
    modelByEventId[view.courseContainer.eventId] = result;

    return result;
}

function initDragAndDropEvents(semesterInfos, modelByEventId) {
    //TODO: refactoring with dataTransfer style
    let draggableCourse;
    let startSemester;

    semesterInfos.forEach(item => {
        item.view.courseContainer.root.addEventListener('dragstart', event => {
            let model = modelByEventId[event.target.id];
            if (!model || !(model instanceof CoursePreviewInfo))
                return;

            draggableCourse = model;
        });

        item.view.courseContainer.root.addEventListener('dragend', () => {
            draggableCourse = undefined;
            startSemester = undefined;
        });

        item.view.courseContainer.root.addEventListener('dragleave', event => {
            let model = modelByEventId[event.target.id];
            if (!model || !(model instanceof SemesterInfo))
                return;

            if (startSemester === undefined)
                startSemester = item;
        });

        item.view.courseContainer.root.addEventListener('dragover', event => {
            event.preventDefault();
        });

        item.view.courseContainer.root.addEventListener('drop', event => {
            let model = modelByEventId[event.target.id];
            if (!model
                || !(model instanceof SemesterInfo)
                || !item.isSuitableForAdding(draggableCourse)
                || !startSemester)
                return;

            startSemester.removeCourse(draggableCourse);
            item.addCourse(draggableCourse);
        });
    });
}

function initDescriptionOnClick(courseFullInfos) {
    for (const item of courseFullInfos) {
        item.view.coursePreview.root.addEventListener('click', () => {
            item.view.descriptionWindow.currentCourse = item;
            item.view.descriptionWindow.show();
        });
    }
}

function createSemesterView(isNeedUrlUpdate=true) {
    let container = new CourseContainer();
    setNextEventId(container);

    let result = new SemesterView(container, isNeedUrlUpdate ? url : undefined);
    setNextEventId(result);

    return result;
}

async function main() {
    let descriptionWindow = new DescriptionWindow();
    setNextEventId(descriptionWindow);

    let courseFullInfos = await loadModels(
        '/static/courses.json',
        parseJsonToCourseFullInfo,
        () => {
             let preview = new CoursePreview();
             setNextEventId(preview);

             let view = new CourseView(preview, descriptionWindow);
             setNextEventId(view);

             return view;
        }
    );

    let courseFullInfoById = courseFullInfos.reduce(
        (acc, item) => {
            acc[item.id] = item;

            return acc;
        },
        {}
    );

    let freeCourseIds = new Set(courseFullInfos.map(item => item.id));

    let semesterInfos = await loadModels(
        '/static/semesters.json',
        (jsonRecord, view) => parseJsonToSemesterInfo(
            jsonRecord,
            courseFullInfoById,
            freeCourseIds,
            view),
        createSemesterView
    );

    let courseContainer = new CourseContainer();
    setNextEventId(courseContainer);

    let freeSemView = new FreeZoneView(courseContainer, undefined)
    setNextEventId(freeSemView);

    let freeSemester = new FreeZone(
        'free',
        'Все курсы',
        [...freeCourseIds].map(item => courseFullInfoById[item]),
        10000,
        SemConstants.SemTime.ANY,
        freeSemView
    );

    freeSemView.model = freeSemester;

    modelByEventId[freeSemView.eventId] = freeSemester;
    modelByEventId[freeSemView.courseContainer.eventId] = freeSemester;

    semesterInfos.unshift(freeSemester);

    initDragAndDropEvents(semesterInfos, modelByEventId);
    initDescriptionOnClick(courseFullInfos);

    semesterInfos.forEach(item => document.body.appendChild(item.view.root));
}

main().then();
