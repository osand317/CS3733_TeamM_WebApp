var accountBtn = document.querySelector('#accountBtn');
var consoleBtn = document.querySelector('#consoleBtn');
var formsBtn = document.querySelector('#formsBtn');
var checkInBtn = document.querySelector('#checkInBtn');
var plusAccount = document.querySelector('#newAccount');

document.querySelector('#accountBtn').addEventListener('click', function(){
    window.location = '/profiles.html';

});
consoleBtn.addEventListener('click', function(){
    window.location = '/console.html';
});
formsBtn.addEventListener('click', function(){
    accessManage();
});
checkInBtn.addEventListener('click', function(){
    window.location = '/checkIn.html';
});


plusAccount.addEventListener('click', function (e) {
  e.stopPropagation();
  if (userType == 'Employee') {
    window.location = 'profileCreation.html';
  }
})
