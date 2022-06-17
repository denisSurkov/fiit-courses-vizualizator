const constants = {
    semTime: {
        FALL: 'fall',
        SPRING: 'spring',
        ANY: 'any'
    },
    courseCategory: {
        PROGRAMING: 'prog',
        MATH: 'math',
        DEV_OPS: 'dev-ops',
        OTHER: 'other'
    },
    semContainersElements: {
        FALL: document.querySelector('#fall-sem-container'),
        SPRING: document.querySelector('#spring-sem-container')
    }
}

export default constants;
