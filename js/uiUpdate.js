import { getUserDetails, getUserRepoDetails, getAllRepoData } from './api.js';

/**
 * Updates the user details card on the page.
 * 
 * @param {string} username - The username of the user.
 * @returns {void}
 */
export function addUserDetailstoPage(username) {
    getUserDetails(username)
        .then(function (response) {
            $('.user-card-title').text(response.name || response.login);
            $('.user-card-bio').first().text(response.bio || 'No bio available');
            $('.user-card-location').last().text(response.location || 'No location available');
            $('.user-card-img-top').attr('src', response.avatar_url);
            $('.user-card-github-link').first().attr('href', response.html_url);
            $('.user-card-github-link').show();
            $('.user-card-github-link').text('GitHub');
            if (response.twitter_username) {
                $('.user-card-twitter-link').attr('href', `https://twitter.com/${response.twitter_username}`);
                $('.user-card-twitter-link').show();
            } else {
                $('.user-card-twitter-link').hide();
            }
        })
        .catch(function (error) {
            handleUserNotFoundError();
        });
}

function handleUserNotFoundError() {
    $('.user-card-title').html('<strong> User Not Found! </strong>');
    $('.user-card-bio').first().text('Please Recheck the GitHub Username.');
    $('.user-card-img-top').attr('src', '/assets/img/user-not-found.png');
    $('.user-card-github-link').hide();
    $('.repo-detail-card').empty();
    $('.paginationline').hide();
    $('.repoFilterSearch').hide();
}

/**
 * Creates a card HTML for a repository.
 * 
 * @param {Object} data - The repository data.
 * @returns {string} - The HTML string for the repository card.
 */
function createCard(data) {
    const topics = data.topics || [];
    const topicButtons = topics.length > 0
        ? topics.map(topic => `<button class="btn btn-primary btn-light rounded-pill" style="cursor: default;">${topic}</button>`).join('')
        : '<button class="btn btn-primary btn-light rounded-pill" style="cursor: default;"> No Topic</button>';

    return `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${data.name || data.login}</h5>
                    <p class="card-text">${data.bio || 'No bio available'}</p>
                    <div class="d-flex flex-wrap gap-2">
                        ${topicButtons}
                    </div>
                </div>
            </div>
        </div>
    `;
}


/**
 * Creates a placeholder card with dummy content.
 * 
 * @returns {string} The HTML markup for the placeholder card.
 */
function createPlaceholderCard() {
    return `
    <div class="col">
                <div class="card placeholder-glow">
                    <div class="card-body placeholder-glow">
                        <h5 class="card-title placeholder">Card title</h5>
                        <p class="card-text placeholder">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <div class="d-flex flex-wrap gap-2 ">
                            <a href="#" class="btn btn-primary btn-light rounded-pill placeholder" style="cursor: default;">Topics</a>
                            <a href="#" class="btn btn-primary btn-light rounded-pill placeholder" style="cursor: default;">Topics</a>
                            <a href="#" class="btn btn-primary btn-light rounded-pill placeholder" style="cursor: default;">Topics</a>
                            <a href="#" class="btn btn-primary btn-light rounded-pill placeholder" style="cursor: default;">Topics</a>
                            <a href="#" class="btn btn-primary btn-light rounded-pill placeholder" style="cursor: default;">Topics</a>
                        </div>
                    </div>
                </div>
            </div>
    `

}

function addPlaceholderCards() {
    let placeholderCards = '';
    for (let i = 0; i < 5; i++) {
        placeholderCards += createPlaceholderCard();
    }
    $('.repo-detail-card').html(placeholderCards);
}

/**
 * Adds repository details cards to the page.
 * 
 * @param {string} username - The username of the user.
 * @returns {void}
 */
export function addRepoDetailstoPage(username, currentPage, reposPerPage) {
    // Run the other function here
    addPlaceholderCards();

    getUserRepoDetails(username, currentPage, reposPerPage)
        .then(function (response) {
            const cards = response.map(createCard).join('');
            $('.repo-detail-card').html(cards);
            $('.repoFilterSearch').show();
        })
        .catch(function (error) {
            handleUserNotFoundError();
        });
}


/**
 * Adds repository data for a given username.
 * 
 * @param {string} username - The username for which to retrieve repository data.
 */
let apiData = [];
export function addRepoData(username) {
    getAllRepoData(username)
        .then(function (response) {
            apiData = response;
        })
        .catch(function (error) {
            handleUserNotFoundError();
        });
}

/**
 * Filters the repository data based on the provided repoName.
 * 
 * @param {string} repoName - The name of the repository to filter.
 * @returns {void}
 */
export function filterRepoData(repoName) {
    // Convert the repoName to lowercase for case-insensitive comparison
    const lowercaseRepoName = repoName.toLowerCase();

    // Filter the data
    const filteredData = apiData.filter(item => item.name.toLowerCase().includes(lowercaseRepoName));

    // Clear the card container
    $('.repo-detail-card').empty();

    // Add the cards to the container
    filteredData.forEach(item => {
        const card = createCard(item);
        $('.repo-detail-card').append(card);
    });
}

