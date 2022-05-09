const stickFigureContainer = document.getElementById('stick-figure-container')

const selfCompPercentageNode = document.getElementById('self-comp-percentage')
const persPercentageNode = document.getElementById('pers-percentage')
const ghPercentageNode = document.getElementById('gh-percentage')
const suppPercentageNode = document.getElementById('supp-percentage')

const selfCompProgressBar = document.getElementById('self-comp-progress-bar')
const persProgressBar = document.getElementById('pers-progress-bar')
const ghProgressBar = document.getElementById('gh-3-progress-bar')
const suppProgressBar = document.getElementById('supp-4-progress-bar')

let selfCompPercentage = 0;
let persPercentage = 0;
let ghPercentage = 0;
let suppPercentage = 0;

const rewardsTile = document.getElementById('reward-announcement')
const rewardsList = document.getElementById('reward-list')

const taskLog = document.getElementById('task-log')
const completedTasksContainer = document.getElementById('completed-task-container') 



let tasksCompleted = 0

const key = config.accessKey;

let axeRotation = 0



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




// add event listener to each task button, adds logic to each set of two buttons
const taskButtons = document.querySelectorAll('.task-button');
for (const node of taskButtons) {
    node.addEventListener('click', e => {
        if ((e.target.id === 'self-comp-1') || (e.target.id === 'self-comp-2')) {
            if (selfCompPercentage < 100) {
                selfCompPercentage = updatePercentage(selfCompPercentageNode, selfCompPercentage, ' - Self Compassion');
                updateProgressBar(selfCompProgressBar, selfCompPercentage);
                addTaskCompleted(e);
            }
        } else if ((e.target.id === 'pers-1') || (e.target.id === 'pers-2')){
            if (persPercentage < 100) {
                persPercentage = updatePercentage(persPercentageNode,persPercentage, ' - Persistence');
                updateProgressBar(persProgressBar, persPercentage);
                addTaskCompleted(e)
            }
        } else if ((e.target.id === 'gh-1') || (e.target.id === 'gh-2')) {
            if (ghPercentage < 100) {
                ghPercentage = updatePercentage(ghPercentageNode, ghPercentage, ' - Good Habits');
                updateProgressBar(ghProgressBar, ghPercentage);
                addTaskCompleted(e)
            }
        } else if ((e.target.id === 'supp-1') || (e.target.id === 'supp-2')) {
            if (suppPercentage < 100) {
                suppPercentage = updatePercentage(suppPercentageNode,suppPercentage, ' - Support');
                updateProgressBar(suppProgressBar, suppPercentage);
                addTaskCompleted(e)
            }
        }
})}






// updates corresponding percentage
function updatePercentage(node, percentage, skillString) {
    percentage += 20;
    node.textContent = `${percentage}%${skillString}`;

    // triggers once percentage equals 100
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

    // creates form next to the completed task
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
    
    // Adds show/hide button only on first task completed
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

//Removes form bar, adds comment to task. Callback function for submit event listener. 
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





function displayAward(node) {
    rewardsTile.textContent = "Earned rewards:"

    if (node.id === 'self-comp-percentage') {
        addHeart();
    } else if (node.id === 'pers-percentage') {
        addAxe();
        window.addEventListener('keydown', rotateAxe)
    } else if (node.id === 'gh-percentage') {
        addShield();
    } else if (node.id === 'supp-percentage') {
        addFollowers();
    }
}

// rotates by left and right arrows, only available after axe appears




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

        const rewardText = document.createElement('p');
        rewardText.textContent = `Earned a heart! ${heartEmoji}`
        rewardsList.appendChild(rewardText);

        
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


        const rewardText = document.createElement('p');
        rewardText.textContent = `Earned axe! (You can rotate the axe with your arrow keys, because why not) ${axeEmoji}`
        rewardsList.appendChild(rewardText);
    }) 
}

function rotateAxe(e) {
    const axeNode = document.getElementById('axe')

    if (e.key === 'ArrowLeft') {
        axeRotation-=45
    } else if (e.key === 'ArrowRight') {
        axeRotation+=45
    }

    axeNode.style.transform = `rotate(${axeRotation}deg)`
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

        const rewardText = document.createElement('p');
        rewardText.textContent = `Earned shield! ${shieldEmoji}`
        rewardsList.appendChild(rewardText);
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

        const rewardText = document.createElement('p')
        rewardText.textContent = `Earned followers! ${manEmoji}`
        rewardsList.appendChild(rewardText);


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










    













