import fs from 'fs';
import TemplateBuilder from './src/templateBuilder.js';
import {JSDOM} from 'jsdom';
import path from 'path';

global.document = new JSDOM().window.document;

const roadmapsFolder = './src/configuration/roadmaps';
const roadmapJsons = {};
const allConfigs = fs.readdirSync(roadmapsFolder);

for (const configFilename of allConfigs) {
    console.log(`Processing ${configFilename}`);
    const absoluteFilename = path.join(roadmapsFolder, configFilename);
    const fileData = fs.readFileSync(absoluteFilename, 'utf-8');
    const json = JSON.parse(fileData);

    const fileWithoutExtension = path.parse(absoluteFilename).name;
    roadmapJsons[fileWithoutExtension] = json;
    console.log(`Processed ${fileWithoutExtension}`);
}

const htmlBuilder = new TemplateBuilder(roadmapJsons);
htmlBuilder.build();

console.log('Pages created successfully');
