import Handlebars from 'handlebars';
import fs from 'fs';

const TEMPLATES_FOLDER = './src/templates'
const PUBLIC_FOLDER = './public'

const OWN_PATH_TEMPLATE = 'own_path.template';

export default class OwnPathTemplateBuilder {
    constructor(courses) {
        this.courses = courses;
    };

    build() {
        console.log('Creating html:')
        this.#buildOwnPath();
    };

    #buildOwnPath() {

        const ownPathTemplate = this.#openHtml(OWN_PATH_TEMPLATE);
        const roadmapsTemplateScript = Handlebars.compile(ownPathTemplate);
        const html = roadmapsTemplateScript({});
        this.#saveHtml(html, 'own_path');
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
