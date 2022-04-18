import {RoadmapDrawer} from "./roadmap-drawer.js";

const roadmapDrawer = new RoadmapDrawer({});
const elementToShow = roadmapDrawer.run();


const pathHolder = document.getElementById('path-holder');

pathHolder.appendChild(elementToShow);

