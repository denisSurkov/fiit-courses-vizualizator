const elements = document.querySelectorAll('.roadmap-module');

elements.forEach(element => {
    element.addEventListener('click', event => {
        displayModalById(event.target.dataset.course);
    });
})

function displayModalById(id){
    const container = document.querySelector('.description-container');
    container.style.display = 'inherit';

    const section = document.getElementById(id);
    section.style.display = 'inherit';
}