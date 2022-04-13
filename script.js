// const h2 = document.createElement('h2');
// h2.textContent = "this content added by JavaScript";

const taskButtons = document.querySelectorAll('.task-button');


for (const node of taskButtons) {
    node.addEventListener('click', e => {
        console.log(e.target.id)
        // if ((e.target.id === 'task-name-button1') || (e.target.id === 'task-name-button2')) {
        //     console.log("corresponds with skill 1")
        // } else {
        //     console.log("corresponds with other skill")
        // }
    
})}




/*

<p id="skill-1-percentage">Skill 1: 0%</p>
<p id="skill-2-percentage">Skill 2: 0%</p>
<p id="skill-3-percentage">Skill 3: 0%</p>
<p id="skill-4-percentage">Skill 4: 0%</p>

*/

const skill1PercentageNode = document.getElementById('skill-1-percentage')
const skill2PercentageNode = document.getElementById('skill-2-percentage')
const skill3PercentageNode = document.getElementById('skill-4-percentage')
const skill4PercentageNode = document.getElementById('skill-5-percentage')
