const skill1PercentageNode = document.getElementById('skill-1-percentage')
const skill2PercentageNode = document.getElementById('skill-2-percentage')
const skill3PercentageNode = document.getElementById('skill-3-percentage')
const skill4PercentageNode = document.getElementById('skill-4-percentage')
const skill1ProgressBar = document.getElementById('skill-1-progress-bar')
const skill2ProgressBar = document.getElementById('skill-2-progress-bar')
const skill3ProgressBar = document.getElementById('skill-3-progress-bar')
const skill4ProgressBar = document.getElementById('skill-4-progress-bar')
let percentage1 = 0;
let percentage2 = 0;
let percentage3 = 0;
let percentage4 = 0;



// add event listener to each task button, adds logic to each set of two buttons
const taskButtons = document.querySelectorAll('.task-button');
for (const node of taskButtons) {
    node.addEventListener('click', e => {
        if (button1Clicked(e) || button2Clicked(e)) {
            if (percentage1 < 100) {
                percentage1 = updatePercentage(skill1PercentageNode, percentage1);
                updateProgressBar(skill1ProgressBar, percentage1);
            }
        } else if (button3Clicked(e) || button4Clicked(e)){
            if (percentage2 < 100) {
                percentage2 = updatePercentage(skill2PercentageNode,percentage2);
                updateProgressBar(skill2ProgressBar, percentage2);
            }
        } else if (button5Clicked(e) || button6Clicked(e)) {
            if (percentage3 < 100) {
                percentage3 = updatePercentage(skill3PercentageNode, percentage3);
                updateProgressBar(skill3ProgressBar, percentage3);
            }
        } else if (button7Clicked(e) || button8Clicked(e)) {
            if (percentage4 < 100) {
                percentage4 = updatePercentage(skill4PercentageNode,percentage4);
                updateProgressBar(skill4ProgressBar, percentage4);
            }
        }
})}


// updates corresponding percentage
function updatePercentage(node, percentage) {
    percentage += 20;
    node.textContent = `Progress: ${percentage}%`;

    return percentage;
}

// updates corresponding progress bar
function updateProgressBar(progressBar, percentage) {
    progressBar.src = `images/${percentage}-percent.png`;
}




function button1Clicked(e) {
    return e.target.id === 'task-name-button1';
}

function button2Clicked(e) {
    return e.target.id === 'task-name-button2'
}

function button3Clicked(e) {
    return e.target.id === 'task-name-button3'
}

function button4Clicked(e) {
    return e.target.id === 'task-name-button4'
}

function button5Clicked(e) {
    return e.target.id === 'task-name-button5'
}

function button6Clicked(e) {
    return e.target.id === 'task-name-button6'
}

function button7Clicked(e) {
    return e.target.id === 'task-name-button7'
}

function button8Clicked(e) {
    return e.target.id === 'task-name-button8'
}



