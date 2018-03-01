(function () {
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

const txtEmail = document.getElementById('userEmail');
const txtPassword = document.getElementById('userpass');
const btnLogIn = document.getElementById('LogIn');

btnLogIn.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.then(function () {
      console.log("Log In successful");
      firebase.auth().onAuthStateChanged(firebaseUser =>{
          if (firebaseUser){
            localStorage.setItem("currentUser", firebaseUser.uid);
            window.location = "index.html";
          }else {
              console.log('Not logged in');
              window.location = 'login.html'
          }
      });
    });
    promise.catch(e=> console.log(e.message));
      // window.location.href='main.html';

  });


} ());
