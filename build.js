import fs from 'fs';
import TemplateBuilder from './src/templateBuilder.js';
import {JSDOM} from 'jsdom';
import path from 'path';
import {createPersonalPathData} from "./src/utils.js";

global.document = new JSDOM().window.document;

const ROADMAPS_FOLDER = './src/configuration/roadmaps';
const COURSES_FOLDER = './src/configuration/courses';

function loadJsonFilesWithContent(folder) {
    const jsonFilenameToContent = {};
    const allFiles = fs.readdirSync(folder);

    for (const configFilename of allFiles) {
        console.log(`Processing ${configFilename}`);
        const absoluteFilename = path.join(folder, configFilename);
        const fileData = fs.readFileSync(absoluteFilename, 'utf-8');
        const json = JSON.parse(fileData);

        const fileWithoutExtension = path.parse(absoluteFilename).name;
        jsonFilenameToContent[fileWithoutExtension] = json;
    }

    return jsonFilenameToContent;
}


const roadmaps = loadJsonFilesWithContent(ROADMAPS_FOLDER);
const courses = loadJsonFilesWithContent(COURSES_FOLDER);

const htmlBuilder = new TemplateBuilder(roadmaps, courses);
htmlBuilder.build();

console.log('Pages created successfully');

createPersonalPathData(courses);
