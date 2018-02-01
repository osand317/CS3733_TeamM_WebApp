(function () {
    var config = {
        apiKey: "AIzaSyAc5zOr-2Pt0dKzoU61Hv68vb4ealPgjyQ",
        authDomain: "pwagram-82371.firebaseapp.com",
        databaseURL: "https://pwagram-82371.firebaseio.com",
        projectId: "pwagram-82371",
        storageBucket: "pwagram-82371.appspot.com",
        messagingSenderId: "953557656666"
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
      window.location = 'accountCreation.html'
    });
    promise.catch(e=> console.log(e.message));
      // window.location.href='main.html';

  });


} ());
