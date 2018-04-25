const btnLogOut = document.getElementById("btnLogOut");

btnLogOut.addEventListener('click', function(){
    window.localStorage.setItem("loggedIn", "false");
    window.location = '../index.html';
});