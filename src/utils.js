import fs from "fs";

export const PUBLIC_FOLDER = './public';

export function convertCourseNameToId(courseName) {
    return courseName
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '');
}

export function createPersonalPathData(courses) {
    const coursesToWrite = Object.getOwnPropertyNames(courses)
        .map(item => courses[item])
        .map(item => Object.assign({}, item));

    coursesToWrite.forEach(item => {delete item['description']; delete item['other']});

    fs.writeFileSync(`${PUBLIC_FOLDER}/static/courses.json`, JSON.stringify(coursesToWrite));

    console.log('courses.json is created');
}
