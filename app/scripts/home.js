var usersBtn = document.querySelector('#usersBtn');
var requestsBtn = document.querySelector('#requestsBtn');
var logsBtn = document.querySelector('#logsBtn');
var emergencyBtn = document.querySelector('#emergencyBtn');
var plusAccount = document.querySelector('#newAccount');

usersBtn.addEventListener('click', function(){
    window.location = '/users.html';
});
requestsBtn.addEventListener('click', function(){
    window.location = '/requests.html';
});
logsBtn.addEventListener('click', function(){
    accessManage();
});
emergencyBtn.addEventListener('click', function(){
    window.location = '/emergency.html';
});


