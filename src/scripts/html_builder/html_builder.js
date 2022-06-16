import Handlebars from 'handlebars';
import fs from 'fs';
import {RoadmapDrawer} from '../roadmap/roadmap-drawer.js';

const TEMPLATES_FOLDER = './src/templates'
const PUBLIC_FOLDER = './public'

export default class HtmlBuilder {
    constructor(roadmapsJsons) {
        this.roadmapsJsons = roadmapsJsons;
    };

    build() {
        console.log('Creating html:')
        this.#buildRoadmaps();
    };

    #buildRoadmaps() {
        const renderedHtmlWithFilenames = [];

        const indexInfo = [];
        for (const href in this.roadmapsJsons) {
            const {title, description, roadmap} = this.roadmapsJsons[href];

            indexInfo.push({
                title,
                description,
                href
            });

            const titleInfo = {
                title,
                description
            };

            const roadmapDrawer = new RoadmapDrawer(roadmap);
            const elementToShow = roadmapDrawer.run();
            titleInfo.roadmap = elementToShow.outerHTML;

            const templateScript = Handlebars.compile(this.#openHtml('roadmap.template'));
            const html = templateScript(titleInfo);

            renderedHtmlWithFilenames.push({
                html,

            })
            this.#saveHtml(html, href);
        }

        this.#buildIndex({roadmaps: indexInfo})
    };

    #buildIndex(indexInfo) {
        const templateScript = Handlebars.compile(this.#openHtml('index.template'));
        const html = templateScript(indexInfo);
        this.#saveHtml(html, "index");
    };

    #saveHtml(html, name) {
        const dir = `${PUBLIC_FOLDER}/${name}.html`;
        fs.writeFileSync(dir, html);
        console.log(dir)
    };

    #openHtml(name) {
        const dir = `${TEMPLATES_FOLDER}/${name}.html`;
        return fs.readFileSync(dir, 'utf-8');
    };
}
