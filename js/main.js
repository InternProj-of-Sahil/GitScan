// import { getUserDetails, getUserRepoDetails, getlastPageNumber, addUserDetailstoPage } from './api.js';
import {  addUserDetailstoPage } from './uiUpdate.js';

$(document).ready(function () {
    $('#searchUsername').submit(function (event) {
        event.preventDefault(); // Prevent form submission
        var username = $('#username').val();
        console.log('Username: ' + username);
        // testFunction(username);
        addUserDetailstoPage(username);
    });
});



function testFunction(username) {
    console.log('test');

    // getUserDetails(username)
    //     .then(function (response) {
    //         console.log('Response:', response);
    //     })
    //     .catch(function (error) {
    //         console.error('Error:', error);
    //     });

    // getUserRepoDetails(username, 1, 10)
    //     .then(function (response) {
    //         console.log('Response:', response);
    //     })
    //     .catch(function (error) {
    //         console.error('Error:', error);
    //     });

    // getlastPageNumber(username, 10)
    //     .then(function (response) {
    //         console.log('Response:', response);
    //     })
    //     .catch(function (error) {
    //         console.error('Error:', error);
    //     });
}
