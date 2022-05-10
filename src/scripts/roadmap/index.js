import {RoadmapDrawer} from "./roadmap-drawer.js";

const config = [
    {
        "mode": "theme",
        "title": "5 семестр",
        "children": [
            {
                "mode": "module",
                "title": "Фронтенд от Контура",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Hackedrom",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Бэкенд от Контура",
                "infoPath": "a/bla.md"
            }
        ]
    },
    {
        "mode": "theme",
        "title": "6 семестр",
        "children": [
            {
                "mode": "module",
                "title": "Фронтенд от Контура",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Hackedrom",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Бэкенд от Контура",
                "infoPath": "a/bla.md"
            }
        ]
    },
    {
        "mode": "theme",
        "type": "right",
        "title": "Интернет",
        "children": [
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            }
        ]
    },
    {
        "mode": "theme",
        "type": "left",
        "title": "Интернет",
        "children": [
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            }
        ]
    },
    {
        "mode": "theme",
        "type": "center",
        "title": "Интернет",
        "children": [
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            },
            {
                "mode": "module",
                "title": "Bla bla",
                "infoPath": "a/bla.md"
            }
        ]
    }
];

const roadmapDrawer = new RoadmapDrawer(config);
const elementToShow = roadmapDrawer.run();


const pathHolder = document.getElementById('path-holder');

pathHolder.appendChild(elementToShow);

