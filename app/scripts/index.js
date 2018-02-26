var accountBtn = document.querySelector('#accountBtn');
var consoleBtn = document.querySelector('#consoleBtn');
var formsBtn = document.querySelector('#formsBtn');
var checkInBtn = document.querySelector('#checkInBtn');

document.querySelector('#accountBtn').addEventListener('click', function(){
    window.location = '/profiles.html';

});
consoleBtn.addEventListener('click', function(){
    window.location = '/console.html';
});
formsBtn.addEventListener('click', function(){
    window.location = '/fillform.html';
});
checkInBtn.addEventListener('click', function(){
    window.location = '/checkIn.html';
});
