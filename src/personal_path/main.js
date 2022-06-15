import SemesterInfo from "./semester_info.js";
import CourseFullInfo from "./course_full_info.js";
import CourseView from "./course_view.js";
import CoursePreview from "./course_preview.js";
import SemesterView from "./semester_view.js";
import DescriptionWindow from "./description_window.js";
import CoursePreviewInfo from "./course_preview_info.js";
import CourseContainer from "./course_container.js";

let eventIdsCount = 0;
let modelByEventId = {};
let urlSearchParams = new URLSearchParams(window.location.search);

//TODO: Изменение url в браузере без перезагрузки:
// history.pushState(null, null, "https://ru.stackoverflow.com/static?Hello=ok1");

//TODO: freeZone must be a Semester

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
        view
    );

    modelByEventId[view.eventId] = result;
    modelByEventId[view.coursePreview.eventId] = result;
    modelByEventId[view.descriptionWindow.eventId] = result;

    return result;
}

function parseJsonToSemesterInfo(jsonRecord, courseFullInfoById, freeCourses, view) {
    let result =  new SemesterInfo(
        jsonRecord['id'],
        jsonRecord['name'],
        [...new Set(
            urlSearchParams
                .getAll(jsonRecord['id'])
                .filter(courseId => {
                    let isCourseFree = freeCourses.has(courseId);
                    if (isCourseFree)
                        freeCourses.delete(courseId);

                    return isCourseFree;
                })
                .map(courseId => courseFullInfoById[courseId]))
        ],
        jsonRecord['maxZedCount'],
        view
    );

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

        item.view.courseContainer.root.addEventListener('dragend', event => {
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
            if (!model || !(model instanceof SemesterInfo))
                return;

            startSemester.removeCourse(draggableCourse);
            item.addCourse(draggableCourse);
        });
    });
}

function initDescriptionOnClick(courseFullInfos) {
    for (const item of courseFullInfos) {
        item.view.coursePreview.root.addEventListener('click', event => {
            item.view.descriptionWindow.currentCourse = item;
            item.view.descriptionWindow.show();
        });
    }
}

function createSemesterView() {
    let container = new CourseContainer();
    setNextEventId(container);

    let result = new SemesterView(container, urlSearchParams);
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

    let freeCourses = new Set(courseFullInfos.map(item => item.id));

    let semesterInfos = await loadModels(
        '/static/semesters.json',
        (jsonRecord, view) => parseJsonToSemesterInfo(
            jsonRecord,
            courseFullInfoById,
            freeCourses,
            view),
        createSemesterView
    );

    //TODO: course validator obj
    //TODO: free semester
    //TODO: url changing

    semesterInfos.forEach(item => document.body.appendChild(item.view.root));

    console.log(courseFullInfos);
    console.log(courseFullInfoById);
    console.log(semesterInfos);
    console.log(modelByEventId);

    initDragAndDropEvents(semesterInfos, modelByEventId);
    initDescriptionOnClick(courseFullInfos);
}

main().then();
