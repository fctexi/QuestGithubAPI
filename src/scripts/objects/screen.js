const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) { 
       this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="profile picture">
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                                <p><span class="bio">Bio:</span>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                                <p><span class="bio">Seguidores:</span>${user.followers}</p>
                                                <p><span class="bio">Seguindo:</span>${user.following}</p>
                                            </div>
                                    </div>`;

        let eventsItens = '';
        user.events.forEach( 
            (events) => 
                (eventsItens += `<li>${events.repo.name}</li>`)
        );

            if(user.events.length > 0) {
                this.userProfile.innerHTML +=
                 `<div class="events section">
                    <h2>Eventos</h2>
                    <ul>${eventsItens}</ul>
                 </div>`
            }

        let repositoriesItens = '';
        user.repositories.forEach(repo => repositoriesItens += 
            `<li>
                <a href="${repo.html_url}" target="_blank">${repo.name}
                    <section class="reposInfoList">
                            <div class="reposInfo">
                                <i class="fas fa-utensils"></i>${repo.forks}
                            </div>
                            <div class="reposInfo">
                                <i class="fas fa-star"></i>${repo.stargazers_count}
                            </div>
                            <div class="reposInfo">
                                <i class="fas fa-eye"></i>${repo.watchers}
                            </div>
                            <div class="reposInfo">
                                <i class="fas fa-globe"></i>${repo.language}
                            </div>
                    </section>        
                </a>
            </li>`)
        
            if(user.repositories.length > 0) {
                this.userProfile.innerHTML += 
                `<div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário Não encontrado</h3>"
    }
}

export {screen}