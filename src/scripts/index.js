import { getUser } from "./services/getUser.js"
import { getRepositories } from "./services/repositories.js"

import { user } from "./objects/userObject.js"
import { screen } from "./objects/screen.js"

import { getUserEvents } from "./services/getEvents.js"

import { baseUrl } from "./variables/variables.js"


//SEARCH BUTTON CLICK EVENT ↓

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

//SEARCH KEYUP EVENT ↓

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

//FUNCTIONS ↓

function validateEmptyInput (userName) {
    if(userName.length === 0) {
        alert ('Preencha o campo com o usuário do Github!')
        return true
    }
}

async function getUserData (userName) {

    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getUserEvents(userName);

    const eventsResponseMapping = eventsResponse.map((events) => {
        return {
            type: events.type,
            repo:events.repo,
        };
    });
    
    user.setInfo(userResponse);
    user.setEvent(eventsResponseMapping);
    user.setRepositories(repositoriesResponse);
    
    screen.renderUser(user);

    console.log(repositoriesResponse)
}




