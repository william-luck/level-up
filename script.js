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

const rewardsTile = document.getElementById('reward-announcement')
const rewardsList = document.getElementById('reward-list')

const taskLog = document.getElementById('task-log')

const key = config.accessKey;

const stickFigureContainer = document.getElementById('stick-figure-container')






// add event listener to each task button, adds logic to each set of two buttons
const taskButtons = document.querySelectorAll('.task-button');
for (const node of taskButtons) {
    node.addEventListener('click', e => {
        if (button1Clicked(e) || button2Clicked(e)) {
            if (percentage1 < 100) {
                percentage1 = updatePercentage(skill1PercentageNode, percentage1);
                updateProgressBar(skill1ProgressBar, percentage1);
                // addTaskCompleted(e);
            }
        } else if (button3Clicked(e) || button4Clicked(e)){
            if (percentage2 < 100) {
                percentage2 = updatePercentage(skill2PercentageNode,percentage2);
                updateProgressBar(skill2ProgressBar, percentage2);
                // addTaskCompleted(e)
            }
        } else if (button5Clicked(e) || button6Clicked(e)) {
            if (percentage3 < 100) {
                percentage3 = updatePercentage(skill3PercentageNode, percentage3);
                updateProgressBar(skill3ProgressBar, percentage3);
                // addTaskCompleted(e)
            }
        } else if (button7Clicked(e) || button8Clicked(e)) {
            if (percentage4 < 100) {
                percentage4 = updatePercentage(skill4PercentageNode,percentage4);
                updateProgressBar(skill4ProgressBar, percentage4);
                // addTaskCompleted(e)
            }
        }
})}


// updates corresponding percentage
function updatePercentage(node, percentage) {
    percentage += 20;
    node.textContent = `Progress: ${percentage}%`;

    if (percentage === 100) {
        displayAward(node)
    }

    return percentage;
}

// updates corresponding progress bar
function updateProgressBar(progressBar, percentage) {
    progressBar.src = `images/${percentage}-percent.png`;
}

function displayAward(node) {
    rewardsTile.textContent = "Earned rewards:"

    if (node.id === 'skill-1-percentage') {
        addHeart();
    } else if (node.id === 'skill-2-percentage') {
        addAxe();
    } else if (node.id === 'skill-3-percentage') {
        addShield();
    } else if (node.id === 'skill-4-percentage') {
        const reward4 = document.createElement('p')
        reward4.textContent = "Earned reward associated with skill 4 (image)"
        rewardsList.appendChild(reward4);
    }
}

// gets random smiling face from API to display on avatar
fetch('https://emoji-api.com/emojis?search=smiling&access_key=' + key)
.then(response => response.json())
.then(data => {
    const randomIndex = Math.floor(Math.random() * 29)
    const emoji = data[randomIndex].character
    addRandomFace(emoji)
})

// adds random smiling face to avatar, positions on div
function addRandomFace(emoji) {
    const randomFace = document.createElement('p')
    randomFace.id = 'random-face'
    randomFace.textContent = `${emoji}`;
    randomFace.style.position = 'absolute';
    randomFace.style.left = '18px';
    randomFace.style.top = '-47px'
    randomFace.style.fontSize = '45px'
    stickFigureContainer.appendChild(randomFace)
}

function addHeart() {
    fetch('https://emoji-api.com/emojis/growing-heart?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const heartEmoji = data[0].character
        const heartNode = document.createElement('p')
        heartNode.id = 'heart'
        heartNode.textContent = `${heartEmoji}`
        heartNode.style.position = 'absolute';
        heartNode.style.left = '28px';
        heartNode.style.top = '27px'
        heartNode.style.fontSize = '26px'
        stickFigureContainer.appendChild(heartNode)
        const reward1 = document.createElement('p');
        reward1.textContent = `Earned reward associated with skill 1 ${heartEmoji}`
        rewardsList.appendChild(reward1);
    })
}

function addAxe() {
    fetch ('https://emoji-api.com/emojis/axe?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const axeEmoji = data[0].character
        const axeNode = document.createElement('p')
        axeNode.id = 'axe'
        axeNode.textContent = `${axeEmoji}`
        axeNode.style.position = 'absolute';
        axeNode.style.left = '-20px';
        axeNode.style.top = '25px'
        axeNode.style.fontSize = '40px'
        stickFigureContainer.appendChild(axeNode)
        const reward2 = document.createElement('p');
        reward2.textContent = `Earned reward associated with skill 2 ${axeEmoji}`
        rewardsList.appendChild(reward2);
    }) 
}

function addShield() {
    fetch('https://emoji-api.com/emojis/shield?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const shieldEmoji = data[0].character
        const shieldNode = document.createElement('p')
        shieldNode.id = 'axe'
        shieldNode.textContent = `${shieldEmoji}`
        shieldNode.style.position = 'absolute';
        shieldNode.style.left = '55px';
        shieldNode.style.top = '25px'
        shieldNode.style.fontSize = '40px'
        stickFigureContainer.appendChild(shieldNode)
        const reward3 = document.createElement('p');
        reward3.textContent = `Earned reward associated with skill 3 ${shieldEmoji}`
        rewardsList.appendChild(reward3);
    })
}




function addTaskCompleted(e) {
    const completedTask = document.createElement('p')
    completedTask.textContent = e.target.textContent;
    taskLog.appendChild(completedTask)

    const commentNode = document.createElement('ul')
    const commentText = document.createElement('li')
    commentNode.appendChild(commentText)

    commentText.textContent = 'Add note.. (click to change)'
    completedTask.appendChild(commentNode)

    commentText.contentEditable = 'true'

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



