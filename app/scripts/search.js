var reportDisplay = document.querySelector("#reportDisplay");
var searchBtn = document.querySelector("#searchBtn");
var form = document.querySelector("form");


var config = {
    apiKey: "AIzaSyCFWzxl0VLYePJ-5O8U5umWWNJLT7TG9Fo",
    authDomain: "urmatt-app.firebaseapp.com",
    databaseURL: "https://urmatt-app.firebaseio.com",
    projectId: "urmatt-app",
    storageBucket: "urmatt-app.appspot.com",
    messagingSenderId: "523826665141"
};
// if(!firebase.apps.length){
firebase.initializeApp(config);
// }

var db = firebase.firestore();

// get and disp top 10 num of eggs
db.collection("reports").limit(10)
    .onSnapshot(function(snapshot) {
        var reports = [];
        snapshot.forEach(function(doc){
            reports.push(doc.data().eggs);
        });
        // console.log("eggs: ", reports);
        reportDisplay.textContent = reports;
    });

// search for report with matching num of eggs
function searchDB(query){
    db.collection("reports").where("eggs", "==", query.toString()).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    var query = form.query.value;
    searchDB(query);
    form.reset();
});