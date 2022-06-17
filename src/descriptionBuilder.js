export default class DescriptionBuilder {
    constructor(courses) {
        this.courses = courses;
    };

    getDescriptions(roadmap){
        const coursesFromRoadmap = this.#extractCourses(roadmap);
        const resultDescriptions = coursesFromRoadmap
        .map(description => this.courses[description]);
        
        resultDescriptions.forEach(description => {
            description['id'] = description['title']
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('.', '');
        });
        
        return resultDescriptions;
    }

    #extractCourses(roadmap){
    return roadmap
    .map(x => x.children
        .map(y => y.course))
    .flat();
    }
}