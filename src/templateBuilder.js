import Handlebars from 'handlebars';
import fs from 'fs';
import {RoadmapDrawer} from './roadmap/roadmap-drawer.js';
import DescriptionBuilder from './descriptionBuilder.js';

const TEMPLATES_FOLDER = './src/templates'
const PUBLIC_FOLDER = './public'

const ROADMAPS_TEMPLATE = 'roadmap.template';
const INDEX_TEMPLATE = 'index.template';
const PERSONAL_PATH_TEMPLATE = 'personal_path.template';


export default class TemplateBuilder {
    constructor(roadmaps, courses) {
        this.roadmaps = roadmaps;
        this.courses = courses;
        this.descriptionBuilder = new DescriptionBuilder(courses);
    };

    build() {
        console.log('Creating html:')
        this.#buildRoadmaps();
    };

    #buildRoadmaps() {
        const indexInfo = [];

        const roadmapHtml = this.#openHtml(ROADMAPS_TEMPLATE);
        const roadmapsTemplateScript = Handlebars.compile(roadmapHtml);

        for (const href in this.roadmaps) {
            const {title, description, roadmap} = this.roadmaps[href];

            indexInfo.push({
                title,
                description,
                href
            });

            const coursesInfo = this.descriptionBuilder.getDescriptions(roadmap);
            const roadmapDrawer = new RoadmapDrawer(roadmap, this.courses);
            const elementToShow = roadmapDrawer.run();

            const titleInfo = {
                title,
                description,
                coursesInfo,
                roadmap: elementToShow.outerHTML
            };

            const html = roadmapsTemplateScript(titleInfo);
            this.#saveHtml(html, href);
        }

        this.#buildIndex({roadmaps: indexInfo});
        this.#buildPersonalPath({coursesInfo: this.courses});
    };

    #buildIndex(indexInfo) {
        const indexHtml = this.#openHtml(INDEX_TEMPLATE);
        const templateScript = Handlebars.compile(indexHtml);
        const html = templateScript(indexInfo);

        this.#saveHtml(html, 'index');
    };

    #buildPersonalPath(coursesInfo) {
        const ownPathTemplate = this.#openHtml(PERSONAL_PATH_TEMPLATE);
        const roadmapsTemplateScript = Handlebars.compile(ownPathTemplate);
        const html = roadmapsTemplateScript(coursesInfo);
        this.#saveHtml(html, 'personal_path');
    };

    #saveHtml(html, name) {
        const dir = `${PUBLIC_FOLDER}/${name}.html`;
        fs.writeFileSync(dir, html);
        console.log(dir);
    };

    #openHtml(name) {
        const dir = `${TEMPLATES_FOLDER}/${name}.html`;
        return fs.readFileSync(dir, 'utf-8');
    };
}
