import { getUserDetails, getUserRepoDetails, getlastPageNumber } from './api.js';

export function addUserDetailstoPage(username) {
    getUserDetails(username)
        .then(function (response) {
            console.log('Response:', response);
            $('.user-card-title').text(response.name || response.login);
            $('.user-card-bio').first().text(response.bio || 'No bio available');
            $('.user-card-location').last().text(response.location || 'No location available');
            $('.user-card-img-top').attr('src', response.avatar_url);
            $('.user-card-github-link').first().attr('href', response.html_url);
            if (response.twitter_username) {
                $('.user-card-twitter-link').attr('href', `https://twitter.com/${response.twitter_username}`);
                $('.user-card-twitter-link').show();
            } else {
                $('.user-card-twitter-link').hide();
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}