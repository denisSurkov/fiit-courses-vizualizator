import fs from "fs";
import HtmlBuilder from "./src/build_html/html_builder.js";
import { JSDOM } from "jsdom";
import path from "path";

global.document = new JSDOM().window.document;

const roadmapsFolder = "./src/configuration/roadmaps";
const roadmapJsons = {};

fs.readdirSync(roadmapsFolder).forEach(file => {
  const filename = path.join(roadmapsFolder, file);
  const fileData = fs.readFileSync(filename, 'utf-8');
  const json = JSON.parse(fileData);
  
  const fileWithoutExtension = file.split('.')[0];
  roadmapJsons[fileWithoutExtension] = json;
});

const htmlBuilder = new HtmlBuilder(roadmapJsons);
htmlBuilder.build();

console.log("Pages created successfully")