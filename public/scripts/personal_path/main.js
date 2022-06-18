import SemesterInfo from "./models/semester-info.js";
import CourseInfo from "./models/course-info.js";
import CoursePreview from "./views/course-preview.js";
import constants from "./constants.js";
import FreeZone from "./models/free-zone.js";
import FreeZoneView from "./views/free-zone-view.js";
import {initModal} from "../description.js";
import {modelByEventId, registerDragAndDropModel} from "./dnd-manager.js";
import SemesterView from "./views/semester-view.js";


const url = new URL(window.location.href);

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
 * @param {CoursePreview} view
 * **/
function parseJsonToCourseFullInfo(jsonRecord, view) {
    return new CourseInfo(
        jsonRecord['id'],
        jsonRecord['title'],
        jsonRecord['zet'],
        jsonRecord['semester'],
        jsonRecord['theme'],
        view
    );
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

    return result;
}

function initDragAndDropEvents(semesterInfos, courseInfos) {
    let draggableCourse;
    let startSemester;

    semesterInfos.forEach(item => {
        registerDragAndDropModel(item.view.root, item);
        registerDragAndDropModel(item.view.courseContainer, item);
    });

    courseInfos.forEach(item => {
        registerDragAndDropModel(item.view.root, item);
    });

    semesterInfos.forEach(item => {
        item.view.courseContainer.addEventListener('dragstart', event => {
            let model = modelByEventId[event.target.id];
            if (!model || !(model instanceof CourseInfo))
                return;

            draggableCourse = model;
        });

        item.view.courseContainer.addEventListener('dragend', () => {
            draggableCourse = undefined;
            startSemester = undefined;
        });

        item.view.courseContainer.addEventListener('dragenter', event => {
            let model = modelByEventId[event.target.id];
            if (!model || !(model instanceof FreeZone))
                return;

            model.view.currentCategory = draggableCourse.category;
        })

        item.view.courseContainer.addEventListener('dragleave', event => {
            let model = modelByEventId[event.target.id];
            if (!model || !(model instanceof SemesterInfo))
                return;

            if (startSemester === undefined)
                startSemester = item;
        });

        item.view.courseContainer.addEventListener('dragover', event => {
            event.preventDefault();
        });

        item.view.courseContainer.addEventListener('drop', event => {
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

async function main() {
    let courseFullInfos = await loadModels(
        'static/courses.json',
        parseJsonToCourseFullInfo,
        () => new CoursePreview()
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
        'static/semesters.json',
        (jsonRecord, view) => parseJsonToSemesterInfo(
            jsonRecord,
            courseFullInfoById,
            freeCourseIds,
            view),
        () => new SemesterView(url)
    );

    let freeZoneView = new FreeZoneView(
        undefined,
        Object.getOwnPropertyNames(constants.courseCategory).map(item => constants.courseCategory[item])
    );

    let freeZone = new FreeZone(
        'free',
        '',
        [...freeCourseIds].map(item => courseFullInfoById[item]),
        NaN,
        constants.semTime.ANY,
        freeZoneView
    );

    freeZoneView.model = freeZone;

    semesterInfos.forEach(semesterInfo => {
        semesterInfo.view.root.addEventListener('click', () => {
            freeZoneView.currentSemTime = semesterInfo.semTime;

            freeZoneView.show();

            if (constants.DEBUG)
                console.log('click on ' + semesterInfo.id);
        });
    });

    semesterInfos.unshift(freeZone);

    //TODO: dnd zone placeholder

    initDragAndDropEvents(semesterInfos, courseFullInfos);

    semesterInfos.forEach(item => {
        if (item instanceof FreeZone)
            document.body.appendChild(item.view.root);
        else if (item.semTime === constants.semTime.FALL)
            constants.semContainersElements.FALL.appendChild(item.view.root);
        else if (item.semTime === constants.semTime.SPRING)
            constants.semContainersElements.SPRING.appendChild(item.view.root);
    });

    initModal(courseFullInfos.reduce((acc, item) => {
        acc.push(item.view.root, item.view.title, item.view.zedCountElement);

        return acc;
    }, []));
}

main().then();
