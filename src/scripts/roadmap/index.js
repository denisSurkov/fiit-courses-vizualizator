import {RoadmapDrawer} from "./roadmap-drawer.js";

const response = await fetch("./scripts/example.json")
const config = await response.json()

const roadmapDrawer = new RoadmapDrawer(config);
const elementToShow = roadmapDrawer.run();


const pathHolder = document.getElementById('path-holder');

pathHolder.appendChild(elementToShow);

