import fs from 'fs';
import {JSDOM} from 'jsdom';
import path from 'path';

import HtmlBuilder from './src/build_html/html_builder.js';

global.document = new JSDOM().window.document;

const userArguments = process.argv.slice(2);
if (userArguments.length < 3) {
    console.log('Usage node builder.js /path/to/configs/ /path/to/save/');
    process.exit(1);
}

const roadmapsFolder = userArguments[0];
const saveBuildFolder = userArguments[1];
console.log(`Starting to build site with roadmaps folder: ${roadmapsFolder} and save folder: ${saveBuildFolder}`);

const allConfigs = fs.readdirSync(roadmapsFolder);
console.log(`Got ${allConfigs.length} roadmaps inside roadmaps folder`);

const roadmapJsons = {};
for (const configFilename of allConfigs) {
    console.log(`Processing ${configFilename}`);
    const absoluteFilename = path.join(roadmapsFolder, configFilename);
    const fileData = fs.readFileSync(absoluteFilename, 'utf-8');
    const json = JSON.parse(fileData);

    const fileWithoutExtension = path.parse(absoluteFilename).name;
    roadmapJsons[fileWithoutExtension] = json;
    console.log(`Processed ${fileWithoutExtension}`);
}


const htmlBuilder = new HtmlBuilder(roadmapJsons);
htmlBuilder.build();

console.log("Pages created successfully")
