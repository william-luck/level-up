# Level Up Progress Tracker



## Description: 

Level Up Progress Tracker is a small, game-like project to help new coders keep track of those smaller but important accomplishments. This project is specific to Flatiron students, but its functionality can be used by other students and learners as well. At Flatiron, we have milestones in base to keep track of when we complete labs and quizzes, but it can be harder to recognize your own progress beyond that single existenial progress bar that fills up until the end of the cohort. 

As a very basic and incomplete list, users can mark up to eight tasks completed with buttons: 

* "Took a break when I needed to"
* "Used positive affirmations" 
* "Had an 'aha!' moment" 
* "All lab tests passing" 
* "Coded along during a lesson" 
* "Refactored code" 
* "Received / support on Slack" 
* "Paired with a technical coach" 

The completion of each task corresponds to one of four skills: 
* Self Compassion: Ability to be kind to yourself, and realize this is all a learning process
* Persistence: Ability to stick with it when things get tough
* Good Habits: Ability to protect against future challenges and obstacles, through constant reinforcement
* Support: Ability to ask for help when needed, and the willingness to support others

Each task completed 'levels up' the corresponding skill by 20 points, starting at 0. Once users reach 100% for a given skill, they earn an emoji reward, which is reflected in a basic stick figure avatar: 
* A heart, which is rewarded for leveling up the self compassion skill. 
* An axe, which is rewarded for leveling up the persistence skill. 
* A shield, which is rewarded for leveling up the good habits skill.
* Followers, which are rewarded for leveluping up the support skill. 

The reward emojis are sourced from [Open Emoji API](https://emoji-api.com/)

Users have the ability to add comments to their tasks completed, which appear in a list below the primary game bar upon completion of the first task. Users can show / hide this task log, as the list can get pretty long (20 tasks, if all skills are leveled up). 

A rewards list also appears upon completion of the first skill leveled up below the primary game bar. 

## Basic functionality

Once you load the app, a random smiling face emoji will appear over the stick figure avatar. A GET request is made to an endpoint with 29 different smiling characters. The app calculates a random number to access a random smiling emoji. While the API is free and open, it does require an access key (which you can get instantly by providing your email). The key is not visible in the repo, and has been hidden with a config file.

A 'click' event listener is added to each of the task buttons. Once clicked, using `e.target.id` associted with each button click event to correctly line up the tasks with skills, three things immediately occur, each with its own generic function to avoid dry code: 
1. The progress bar updates to add a completed portion of the bar, where each portion is 20 percentage points. These progress bars were roughly made in google slides and screenshotted for each stage of completion.
2. The task completed appears in a task log, with a show/hide button. The ability to add a comment is implemented with a 'submit' event listener on a form node.
3. The percentage text to the right of the bar updates, 20% at a time.

Once the percentage hits 100%, the DOM node that was most recently updated is passed into a function to display awards. Using `node.id === 'skill-percentage'` as a boolean on a few 'if' statements, a reward will display on the stick figure avatar and the = reward list, either a heart, axe, shield, or followers.  

The heart reward, as with all other emojis, are accessed with a GET request to a specific endpoint, and are placed on the avatar using a series of `element.style.attribute`'s. The stick figure avatar is just a background on a div, and I brute-forced different values for the left, top, and fontSize attributes to find the correct position for each reward on the avatar. 

Each reward is accessed / placed a litte differently: 
1. For the heart, the endpoint lists all available heart emojis. The .find array iteration method was used to return the "growing heart" emoji, which returned the first emoji with the matching identifier as the growding heart. 
2. For the axe, a GET request is made to an endpoint for the axe and axe only (no manipulation of the data). After the axe is placed, a 'keydown' event listener added to the window (not to a specific element, due to 'focus' issues, something I do not completely understand just yet) listens for leftArrow and rightArrow keydowns to rotate the axe on the avatar. When placing the axe over the avatar, I set the default value of rotation to 0 using `element.style.transform = 'rotate(${axeRotation}deg)`. On each leftArrow and RightArrow, a function adjusts the value of axeRotation +/- 45 degrees. 
3. For the shield, a simple GET request is made to the shield and shield only. 
4. For the followers, two different GET requests are made for two different followers, which are placed in each corner of the avatar using the same brute-force attribute value setting method. The rewards list, however, only shows one follower.  

## Expansion / Roadmap 

This project can extended in several different ways, most helpfully with a JSON server. Other ideas: 
* An actual avatar, not a stick figure
* Ability to add custom tasks and skills
* Ability to do something with the avatar
* Ability to equip / unequip rewards
* Better tracking / filtering / statistics of tasks completed 
* Ability to keep going past 100 points
* If using over multple days / weeks, an feature to keep track of streaks
* Better CSS and styling all around

## Sources: 

Open Emoji API: https://emoji-api.com/
Stick figure:http://www.stickpng.com/img/people/stick-figures/simple-stick-figure





















## Features: 


# Sources: 
