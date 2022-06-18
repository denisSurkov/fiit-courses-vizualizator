const constants = {
    DEBUG: false,
    semTime: {
        FALL: 'fall',
        SPRING: 'spring',
        ANY: 'any'
    },
    courseCategory: {
        PROGRAMING: 'prog',
        MATH: 'math',
        DEV_OPS: 'dev-ops',
        FRONTEND: 'frontend',
        BACKEND: 'backend',
        OTHER: 'other'
    },
    semContainersElements: {
        FALL: document.querySelector('#fall-sem-container'),
        SPRING: document.querySelector('#spring-sem-container')
    }
}

constants.courseCategoryAliases = {};
constants.courseCategoryAliases[constants.courseCategory.PROGRAMING] = 'Программирование';
constants.courseCategoryAliases[constants.courseCategory.DEV_OPS] = 'DevOps';
constants.courseCategoryAliases[constants.courseCategory.MATH] = 'Математика';
constants.courseCategoryAliases[constants.courseCategory.FRONTEND] = 'Frontend';
constants.courseCategoryAliases[constants.courseCategory.BACKEND] = 'Backend';
constants.courseCategoryAliases[constants.courseCategory.OTHER] = 'Остальное';


export default constants;
