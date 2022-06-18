const elements = document.querySelectorAll('[data-course]');
const container = document.querySelector('.description-container');
let section = undefined;

elements.forEach(element => {
    element.addEventListener('click', event => {
        displayModalById(event.target.dataset.course);
    });
})

window.addEventListener('click', event => {
    closeModal(event);
})

function displayModalById(id){
    container.style.display = 'inherit';
    section = document.getElementById(id);
    section.style.display = 'inherit';
}

function closeModal(event){
    if (event.target == container && section !== undefined){
        container.style.display = 'none';
        section.style.display = 'none';
        section = undefined;
    }
}
