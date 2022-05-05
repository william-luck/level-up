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

let axeRotation = 0

const rewardsTile = document.getElementById('reward-announcement')
const rewardsList = document.getElementById('reward-list')

const taskLog = document.getElementById('task-log')
const completedTasksContainer = document.getElementById('completed-task-container') 

const stickFigureContainer = document.getElementById('stick-figure-container')

let tasksCompleted = 0

const key = config.accessKey;




// add event listener to each task button, adds logic to each set of two buttons
const taskButtons = document.querySelectorAll('.task-button');
for (const node of taskButtons) {
    node.addEventListener('click', e => {
        if ((e.target.id === 'self-comp-1') || (e.target.id === 'self-comp-2')) {
            if (percentage1 < 100) {
                percentage1 = updatePercentage(skill1PercentageNode, percentage1, ' - Self Compassion');
                updateProgressBar(skill1ProgressBar, percentage1);
                addTaskCompleted(e);
            }
        } else if ((e.target.id === 'pers-1') || (e.target.id === 'pers-2')){
            if (percentage2 < 100) {
                percentage2 = updatePercentage(skill2PercentageNode,percentage2, ' - Persistence');
                updateProgressBar(skill2ProgressBar, percentage2);
                addTaskCompleted(e)
            }
        } else if ((e.target.id === 'gh-1') || (e.target.id === 'gh-2')) {
            if (percentage3 < 100) {
                percentage3 = updatePercentage(skill3PercentageNode, percentage3, ' - Good Habits');
                updateProgressBar(skill3ProgressBar, percentage3);
                addTaskCompleted(e)
            }
        } else if ((e.target.id === 'supp-1') || (e.target.id === 'supp-2')) {
            if (percentage4 < 100) {
                percentage4 = updatePercentage(skill4PercentageNode,percentage4, ' - Support');
                updateProgressBar(skill4ProgressBar, percentage4);
                addTaskCompleted(e)
            }
        }
})}






// updates corresponding percentage
function updatePercentage(node, percentage, skillString) {
    percentage += 20;
    node.textContent = `${percentage}%${skillString}`;

    if (percentage === 100) {
        displayAward(node)
    }

    return percentage;
}

// updates corresponding progress bar
function updateProgressBar(progressBar, percentage) {
    progressBar.src = `images/${percentage}-percent.png`;
}

function addTaskCompleted(e) {

    // adds name of completed task to tag log
    const completedTask = document.createElement('p')
    completedTask.textContent = e.target.textContent;
    completedTasksContainer.appendChild(completedTask)

    // creates form underneath the completed task
    const inputForm = document.createElement('form')
    inputForm.id = 'input-form'
    completedTask.appendChild(inputForm)

    // Adds comment bar
    const inputText = document.createElement('input')
    inputText.type = 'text'
    inputText.value = ''
    inputText.placeholder = 'Add comment..'
    inputText.id = 'comment'
    inputForm.appendChild(inputText)

    // Adds submit button 
    const submitButton = document.createElement('input')
    submitButton.type = 'submit'
    submitButton.name = 'submit'
    submitButton.value = 'Add'
    inputForm.appendChild(submitButton)

    // Adds comment to task completed upon submission of form
    inputForm.addEventListener('submit', addCommentToTask)      
    
    tasksCompleted+=1
    if (tasksCompleted === 1) {
        const hideButton = createHideButton()
        let hidden = false
        hideButton.addEventListener('click', e => {
            if (hidden === false) {
                hideButton.textContent = 'Show'
                hidden = true
                completedTasksContainer.style.display ='none'
            } else if (hidden === true) {
                hideButton.textContent = "Hide"
                hidden = false
                completedTasksContainer.style.display=''
            }
            
        })
    }
    

}




function displayAward(node) {
    rewardsTile.textContent = "Earned rewards:"

    if (node.id === 'skill-1-percentage') {
        addHeart();
    } else if (node.id === 'skill-2-percentage') {
        addAxe();
        window.addEventListener('keydown', rotateAxe)
    } else if (node.id === 'skill-3-percentage') {
        addShield();
    } else if (node.id === 'skill-4-percentage') {
        addFollowers();
    }
}

// rotates by left and right arrows, only available after axe appears
function rotateAxe(e) {
    const axeNode = document.getElementById('axe')

    if (e.key === 'ArrowLeft') {
        axeRotation-=45
    } else if (e.key === 'ArrowRight') {
        axeRotation+=45
    }

    axeNode.style.transform = `rotate(${axeRotation}deg)`
    


    

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

// Has find array iteration
function addHeart() {
    fetch('https://emoji-api.com/emojis?search=heart&access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const matchingObj = data.find(element => element.slug === 'growing-heart');
        const heartEmoji = matchingObj.character

        const heartNode = document.createElement('p')
        heartNode.id = 'heart'
        heartNode.textContent = `${heartEmoji}`
        heartNode.style.position = 'absolute';
        heartNode.style.left = '28px';
        heartNode.style.top = '27px'
        heartNode.style.fontSize = '26px'
        stickFigureContainer.appendChild(heartNode)

        const reward1 = document.createElement('p');
        reward1.textContent = `Earned a heart! ${heartEmoji}`
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
        axeNode.style.transform = `rotate(${axeRotation}deg)`
        stickFigureContainer.appendChild(axeNode)

        // axeNode.style.transform = 'rotate(90deg)'

        const reward2 = document.createElement('p');
        reward2.textContent = `Earned axe! (You can rotate the axe with your arrow keys, because why not) ${axeEmoji}`
        rewardsList.appendChild(reward2);
    }) 
}

function addShield() {
    fetch('https://emoji-api.com/emojis/shield?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const shieldEmoji = data[0].character
        const shieldNode = document.createElement('p')
        shieldNode.id = 'shield'
        shieldNode.textContent = `${shieldEmoji}`
        shieldNode.style.position = 'absolute';
        shieldNode.style.left = '55px';
        shieldNode.style.top = '25px'
        shieldNode.style.fontSize = '40px'
        stickFigureContainer.appendChild(shieldNode)
        const reward3 = document.createElement('p');
        reward3.textContent = `Earned shield! ${shieldEmoji}`
        rewardsList.appendChild(reward3);
    })
}

function addFollowers() {
    fetch('https://emoji-api.com/emojis/technologist-light-skin-tone?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const manEmoji = data[0].character
        const manNode = document.createElement('p')
        manNode.id = 'male-follower'
        manNode.textContent = `${manEmoji}`
        manNode.style.position = 'absolute';
        manNode.style.left = '65px';
        manNode.style.top = '-40px'
        manNode.style.fontSize = '40px'
        stickFigureContainer.appendChild(manNode)

        const reward4 = document.createElement('p')
        reward4.textContent = `Earned followers! ${manEmoji}`
        rewardsList.appendChild(reward4);


})
    fetch('https://emoji-api.com/emojis/woman-technologist-light-skin-tone?access_key=' + key)
    .then(response => response.json())
    .then(data => {
        const womanEmoji = data[0].character
        const womanNode = document.createElement('p')
        womanNode.id = 'female-follower'
        womanNode.textContent = `${womanEmoji}`
        womanNode.style.position = 'absolute';
        womanNode.style.left = '-25px';
        womanNode.style.top = '-40px'
        womanNode.style.fontSize = '40px'
        stickFigureContainer.appendChild(womanNode)
})
}  



//Removes form bar, adds comment to task.
function addCommentToTask(e) {
    e.preventDefault();

    const comment = e.target.comment.value
    const completedTask = e.target.parentNode  

    e.target.remove()

    const commentNode = document.createElement('ul')
    const commentText = document.createElement('li')
    commentNode.appendChild(commentText)

    commentText.textContent = `Comment: ${comment}`
    
    completedTask.appendChild(commentNode)

    

    
    

  }  

function createHideButton() {
    const hideButton = document.createElement('button')
    hideButton.textContent = 'Hide'

    completedTasksContainer.parentNode.insertBefore(hideButton, completedTasksContainer)

    return hideButton
  }



//   function hideLog() {
//     completedTasksContainer.style.display = 'none'
// }

    













