export function convertCourseNameToId(courseName) {
    return courseName
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('.', '');
}
