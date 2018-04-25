var userEmail = document.querySelector("#userEmail");
var password = document.querySelector("#userpass");

const LOGIN = "admin";
const PASS = "admin";

function auth(){
    if(userEmail.value === LOGIN && password.value === PASS){
        window.location = "/home.html";
    }
    else {
        alert("Wrong username/password!");
    }
}