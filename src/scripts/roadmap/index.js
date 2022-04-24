import {RoadmapDrawer} from "./roadmap-drawer.js";

const config = [
    {
        "mode": "theme",
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

