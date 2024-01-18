import {  addUserDetailstoPage, addRepoDetailstoPage, testFunction} from './uiUpdate.js';

$(document).ready(function () {
    $('#searchUsername').submit(function (event) {
        event.preventDefault(); // Prevent form submission
        var username = $('#username').val();
        console.log('Username: ' + username);
        testFunction(username);
        addUserDetailstoPage(username);
        addRepoDetailstoPage(username);
    });
});




