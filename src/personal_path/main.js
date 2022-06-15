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

function parseJsonToSemesterInfo(jsonRecord, coursePreviewInfoById, freeCourses, view) {
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
                .map(courseId => coursePreviewInfoById[courseId]))
        ],
        jsonRecord['maxZedCount'],
        view
    );

    modelByEventId[view.eventId] = result;
    modelByEventId[view.courseContainer.eventId] = result;

    return result;
}

function initDragAndDropEvents(semesterInfos, modelByEventId) {
    let draggableCourse;
    let semesterToDrop;

    semesterInfos.forEach(item => {
        item.view.courseContainer.root.addEventListener('dragstart', event => {
            if (!(modelByEventId[event.target.id] instanceof CoursePreviewInfo))
                return;

            draggableCourse = modelByEventId[event.target.id];

            console.log('dragstart ' + event.target.id + ' ' + modelByEventId[event.target.id].constructor.name);
        });

        item.view.courseContainer.root.addEventListener('dragend', event => {
            draggableCourse = undefined;
            console.log('dragend ' + event.target.id + ' ' + modelByEventId[event.target.id].constructor.name);
        });

        item.view.courseContainer.root.addEventListener('dragenter', event => {
            if (!(modelByEventId[event.target.id] instanceof SemesterInfo))
                return;

            console.log('dragenter ' + event.target.id + ' ' + modelByEventId[event.target.id].constructor.name);
        });

        item.view.courseContainer.root.addEventListener('dragleave', event => {
            if (!(modelByEventId[event.target.id] instanceof SemesterInfo))
                return;

            console.log('dragleave ' + event.target.id);
        });

        item.view.courseContainer.root.addEventListener('drop', event => {
            semesterToDrop = undefined;
        });
    });
}

function initDescriptionOnClick(courseFullInfos) {
    for (const item of courseFullInfos) {
        item.view.coursePreview.root.addEventListener('click', event => {
            console.log(item.description);
        });
    }
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

    let coursePreviewInfoById = courseFullInfos.reduce(
        (acc, item) => {
            acc[item.id] = item.createPreviewInfo();

            return acc;
        },
        {}
    );

    let freeCourses = new Set(courseFullInfos.map(item => item.id));

    let semesterInfos = await loadModels(
        '/static/semesters.json',
        (jsonRecord, view) => parseJsonToSemesterInfo(
            jsonRecord,
            coursePreviewInfoById,
            freeCourses,
            view),
        () => {
            let container = new CourseContainer();
            setNextEventId(container);

            let result = new SemesterView(container, urlSearchParams);
            setNextEventId(result);

            return result;
        }
    );

    //TODO: You need to complete models: courses validation, correct work (and what is correct?).
    //TODO: description on click
    //TODO: new DragAndDropManager(...views);

    semesterInfos.forEach(item => document.body.appendChild(item.view.root));

    console.log(courseFullInfos);
    console.log(coursePreviewInfoById);
    console.log(semesterInfos);
    console.log(modelByEventId);

    initDragAndDropEvents(semesterInfos, modelByEventId);
    initDescriptionOnClick(courseFullInfos);
}

main().then();
