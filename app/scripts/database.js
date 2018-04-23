// Initialize Firebase
var config = {
    apiKey: "AIzaSyCwp4N4mIkw8MqzegINZTY77iFawihuw20",
    authDomain: "cs3733-web-app.firebaseapp.com",
    databaseURL: "https://cs3733-web-app.firebaseio.com",
    projectId: "cs3733-web-app",
    storageBucket: "cs3733-web-app.appspot.com",
    messagingSenderId: "52508509145"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// var storage = firebase.storage().ref();
