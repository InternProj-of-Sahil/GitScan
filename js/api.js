/**
 * Retrieves details of a user from the GitHub API.
 * @param {string} githubUsername - The GitHub username of the user.
 * @returns {Promise} A Promise that resolves with the user details.
 */
export function getUserDetails(githubUsername) {
    return $.ajax({
        url: `https://api.github.com/users/${githubUsername}`,
        method: 'GET'
    });
}

/**
 * Retrieves repository details of a user from the GitHub API.
 * @param {string} githubUsername - The GitHub username of the user.
 * @param {number} page_number - The page number of the repositories to retrieve.
 * @param {number} per_page_repo - The number of repositories per page.
 * @returns {Promise} A Promise that resolves with the user's repository details.
 */
export function getUserRepoDetails(githubUsername, page_number, per_page_repo) {
    return $.ajax({
        url: `https://api.github.com/users/${githubUsername}/repos`,
        method: 'GET',
        data: {
            'per_page': per_page_repo,
            'page': page_number
        }
    });
}

/**
 * Retrieves repository details of a user from the GitHub API.
 * @param {string} githubUsername - The GitHub username of the user.
 * @returns {Promise} A Promise that resolves with the user's repository details.
 */
export function getAllRepoData(githubUsername) {
    return $.ajax({
        url: `https://api.github.com/users/${githubUsername}/repos`,
        method: 'GET'
    });
}


/**
 * Extracts the last page number from the Link header of a GitHub API response.
 * @param {string} linkHeader - The Link header from the API response.
 * @returns {number|null} The last page number, or null if not found.
 */
export function getPageNumber(linkHeader) {
    const regex = /page=(\d+)>; rel="last"/;
    const match = linkHeader.match(regex);

    if (match && match[1]) {
        return parseInt(match[1], 10);
    }

    return null;
}


/**
 * Retrieves the last page number of a user's repositories from the GitHub API.
 * @param {string} githubUsername - The GitHub username of the user.
 * @param {number} per_page_repo - The number of repositories per page.
 * @returns {Promise} A Promise that resolves with the last page number.
 */
export function getlastPageNumber(githubUsername, per_page_repo) {
    return new Promise((resolve, reject) => {
        var lastPageNumber = 1;
        $.ajax({
            url: `https://api.github.com/users/${githubUsername}/repos`,
            method: 'GET',
            data: {
                'per_page': per_page_repo
            }
        }).done(function (response, textStatus, jqXHR) {
            const linkHeader = jqXHR.getResponseHeader('Link');
            if (linkHeader !== null) {
                const pageNumber = getPageNumber(linkHeader);
                if (pageNumber !== null) {
                    lastPageNumber = pageNumber;
                }
            }

            resolve(lastPageNumber);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}