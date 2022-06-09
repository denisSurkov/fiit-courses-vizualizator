import SemesterInfo from "./semester_info.js";
import CourseFullInfo from "./course_full_info.js";
import CourseView from "./course_view.js";
import CoursePreview from "./course_preview.js";
import SemesterView from "./semester_view.js";
import DescriptionWindow from "./description_window.js";

let eventIdsCount = 0;
let viewByEventId = {};
let urlSearchParams = new URLSearchParams(window.location.search);

//TODO: Изменение url в браузере без перезагрузки:
// history.pushState(null, null, "https://ru.stackoverflow.com/static?Hello=ok1");

//TODO: freeZone must be a Semester

/**
 * @param {View} view
 * **/
function initView(view) {
    let eventId = 'eid' + eventIdsCount;

    view.eventId = eventId;
    viewByEventId[eventId] = view;
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

function parseJsonToCourseFullInfo(jsonRecord, view) {
    return new CourseFullInfo(
        jsonRecord['id'],
        jsonRecord['name'],
        jsonRecord['zedCount'],
        jsonRecord['description'],
        view
    );
}

function parseJsonToSemesterInfo(jsonRecord, coursePreviewInfoById, view) {
    return new SemesterInfo(
        jsonRecord['id'],
        jsonRecord['name'],
        urlSearchParams.getAll(jsonRecord['id']).map(courseId => coursePreviewInfoById[courseId]),
        jsonRecord['maxZedCount'],
        view
    )
}

async function main() {
    let descriptionWindow = new DescriptionWindow();
    initView(descriptionWindow);

    let courseFullInfos = await loadModels(
        '/static/courses.json',
        parseJsonToCourseFullInfo,
        () => {
             let preview = new CoursePreview();
             initView(preview);

             let view = new CourseView(preview, descriptionWindow);
             initView(view);

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

    let semesterInfos = await loadModels(
        '/static/semesters.json',
        (jsonRecord, view) => parseJsonToSemesterInfo(jsonRecord, coursePreviewInfoById, view),
        () => {
            let result = new SemesterView();
            initView(result);

            return result;
        }
    );
    //TODO: 09.06.2022
    //TODO: You need to complete models: courses validation, correct work (and what is correct?).
    //TODO: visualize courses
    //TODO: description on click
    //TODO: new DragAndDropManager(...views);

    semesterInfos.forEach(item => document.body.appendChild(item.view.root));

    console.log(courseFullInfos);
    console.log(coursePreviewInfoById);
    console.log(semesterInfos);
}

main().then();
