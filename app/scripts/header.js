var config = {
  apiKey: "AIzaSyCFWzxl0VLYePJ-5O8U5umWWNJLT7TG9Fo",
  authDomain: "urmatt-app.firebaseapp.com",
  databaseURL: "https://urmatt-app.firebaseio.com",
  projectId: "urmatt-app",
  storageBucket: "urmatt-app.appspot.com",
  messagingSenderId: "523826665141"
};
firebase.initializeApp(config);

var firestore = firebase.firestore();
var storage = firebase.storage().ref();
const btnLogOut = document.getElementById("btnLogOut");





btnLogOut.addEventListener('click', e=> {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if (firebaseUser){
        console.log(firebaseUser);
        currentUserInfo(firebaseUser);
    }else {
        console.log('Not logged in');
        window.location = 'login.html'
    }
});


function currentUserInfo(user) {
  var usersRef = firestore.collection("users");
  var query = usersRef.where("profileId", '==', user.uid).get()
  .then(function (querySnapShot) {
    querySnapShot.forEach(function(doc) {
        const userProfileName = doc.data().firstName;
        console.log(userProfileName);
        document.getElementById('labelUserProfile').textContent = userProfileName + '  ';
    });
  })
};




