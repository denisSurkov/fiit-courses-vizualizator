import Handlebars from 'handlebars';
import fs from 'fs';
import {RoadmapDrawer} from '../scripts/roadmap/roadmap-drawer.js';

const TEMPLATES_FOLDER = './src/templates'

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

            const templateScript = Handlebars.compile(this.#openHtml('roadmap'));
            const html = templateScript(titleInfo);

            renderedHtmlWithFilenames.push({
                html,

            })
            this.#saveHtml(html, href);
        }

        this.#buildIndex({roadmaps: indexInfo})
    };

    #buildIndex(indexInfo) {
        const templateScript = Handlebars.compile(this.#openHtml('index'));
        const html = templateScript(indexInfo);
        this.#saveHtml(html, "index");
    };

    #saveHtml(html, name) {
        const dir = `./src/${name}.html`;
        fs.writeFileSync(dir, html);
        console.log(dir)
    };

    #openHtml(name) {
        const dir = `${TEMPLATES_FOLDER}/./src/build_html/base_html/${name}.html`;
        return fs.readFileSync(dir, 'utf-8');
    };
}
