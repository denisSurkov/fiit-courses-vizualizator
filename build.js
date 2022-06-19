import fs from 'fs';
import TemplateBuilder from './src/templateBuilder.js';
import {JSDOM} from 'jsdom';
import path from 'path';

global.document = new JSDOM().window.document;

const ROADMAPS_FOLDER = './src/configuration/roadmaps';
const COURSES_FOLDER = path.join('src', 'configuration', 'courses');
const SEMESTERS_FILE = path.join('src', 'configuration', 'semesters.json');

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

const semestersFileContent = fs.readFileSync(SEMESTERS_FILE);
const semesters = JSON.parse(semestersFileContent);

const htmlBuilder = new TemplateBuilder(roadmaps, courses, semesters);
htmlBuilder.build();

console.log('Pages created successfully');
