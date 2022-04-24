import Storage from "../state_storage/Storage.js";


let dragged;

let courses = {
    "Operation Systems": {
        zedNumber: 4
    },
    "Networks": {
        zedNumber: 4
    }
};

let semesters = [
    {
        title: "sem5",
        zedCount: 0
    }
];


let states = new Storage();

states.setValue("sem5", semesters[0]);
states.register("sem5", function(update) {
    console.log(update);
});


document.addEventListener("dragstart", function(event) {
    dragged = event.target;
    console.log(dragged);
});

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

for (const sem of semesters) {
    let semContainer = document.createElement('div');
    semContainer.classList.add('courses-container', 'sem-container');
    semContainer.innerHTML =
        `<span class="sem-title">${sem.title}</span>
        <span class="zed-stat">Zed: ${sem.zedCount}</span>`;

    document.body.appendChild(semContainer);

    document.addEventListener("drag", function(event) {

    });

    document.addEventListener("drop", function(event) {
        console.log("drop");
        console.log(event.target.className);

        if (event.target.className.split(' ').indexOf('courses-container') === -1) {
            return;
        }

        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);

        if (dragged.parentNode.classList.contains('courses-container')) {
            console.log("OK");
            let title = dragged.parentNode.querySelector('.sem-title');

            if (title !== null) {
                states.setValue(title.textContent, {
                    title: "sem5",
                    zedCount: 10
                });
            }
        }

        dragged = undefined;
    });
}