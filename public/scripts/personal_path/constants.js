const constants = {
    DEBUG: false,
    semTime: {
        FALL: 'fall',
        SPRING: 'spring',
        ANY: 'any'
    },
    courseCategory: {
        PROGRAMING: 'prog',
        SECURITY: 'security',
        MATH: 'math',
        OTHER: 'other'
    },
    semContainersElements: {
        FALL: document.querySelector('#fall-sem-container'),
        SPRING: document.querySelector('#spring-sem-container')
    }
}

constants.courseCategoryAliases = {};
constants.courseCategoryAliases[constants.courseCategory.PROGRAMING] = 'Программирование';
constants.courseCategoryAliases[constants.courseCategory.SECURITY] = 'Безопасность';
constants.courseCategoryAliases[constants.courseCategory.MATH] = 'Математика';
constants.courseCategoryAliases[constants.courseCategory.OTHER] = 'Остальное';


export default constants;
