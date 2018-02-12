var form = document.querySelector("#form");
var submitBtn = document.querySelector("#submitBtn");

var config = {
    apiKey: "AIzaSyCFWzxl0VLYePJ-5O8U5umWWNJLT7TG9Fo",
    authDomain: "urmatt-app.firebaseapp.com",
    databaseURL: "https://urmatt-app.firebaseio.com",
    projectId: "urmatt-app",
    storageBucket: "urmatt-app.appspot.com",
    messagingSenderId: "523826665141"
};
if(!firebase.apps.length){
    firebase.initializeApp(config);
}
var firestore = firebase.firestore();

function submitReport(data){
    firestore.collection("reports").add(data);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = {};
    for(var i = 0; i < 1; i++){
        let key = form.elements[i].name;
        let val = form.elements[i].value;
        if (val != null && key != null) data[key] = val;

    }
    console.log(data);
    submitReport(data);
    form.reset();
});