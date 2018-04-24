var userEmail = document.querySelector("#userEmail");
var password = document.querySelector("#userpass");

function auth(){
    if(userEmail.value === "admin" && password.value === "admin"){
        window.location = "/index.html";
    }
    else {
        console.log("wrong");
    }
}