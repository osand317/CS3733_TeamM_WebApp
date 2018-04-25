var userEmail = document.querySelector("#userEmail");
var password = document.querySelector("#userpass");

const LOGIN = "admin";
const PASS = "admin";

if ((window.localStorage.getItem("loggedIn")) === "true"){
    window.location = '../home.html';
}

function auth(){
    if(userEmail.value === LOGIN && password.value === PASS){
        window.localStorage.setItem("loggedIn", "true");
        window.location = "/home.html";
    }
    else {
        alert("Wrong username/password!");
    }
}