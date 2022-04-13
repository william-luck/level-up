const skill1PercentageNode = document.getElementById('skill-1-percentage')
const skill2PercentageNode = document.getElementById('skill-2-percentage')
const skill3PercentageNode = document.getElementById('skill-3-percentage')
const skill4PercentageNode = document.getElementById('skill-4-percentage')
let percentage1 = 0;
let percentage2 = 0;
let percentage3 = 0;
let percentage4 = 0;

// add event listener to each task button, adds logic to each set of two buttons
const taskButtons = document.querySelectorAll('.task-button');
for (const node of taskButtons) {
    node.addEventListener('click', e => {
        if ((e.target.id === 'task-name-button1') || (e.target.id === 'task-name-button2')) {
            console.log("corresponds with skill 1")
            percentage1 = updatePercentage(skill1PercentageNode, percentage1);
        } else if ((e.target.id === 'task-name-button3') || (e.target.id === 'task-name-button4')){
            console.log("corresponds with skill 2")
            percentage2 = updatePercentage(skill2PercentageNode,percentage2);
        } else if ((e.target.id === 'task-name-button5') || (e.target.id === 'task-name-button6')) {
            console.log("corresponds with skill 3")
            percentage3 = updatePercentage(skill3PercentageNode, percentage3);
        } else if ((e.target.id === 'task-name-button7') || (e.target.id === 'task-name-button8')) {
            console.log("corresponds with skill 4")
            percentage4 = updatePercentage(skill4PercentageNode,percentage4);
        }
})}


// updates corresponding percentage
function updatePercentage(node, percentage) {
    percentage += 20;
    node.textContent = `Progress: ${percentage}%`;
    return percentage;
}