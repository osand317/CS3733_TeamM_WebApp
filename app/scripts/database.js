// Access to firebase cloud firestore database
  var config = {
      apiKey: "AIzaSyCFWzxl0VLYePJ-5O8U5umWWNJLT7TG9Fo",
      authDomain: "urmatt-app.firebaseapp.com",
      databaseURL: "https://urmatt-app.firebaseio.com",
      projectId: "urmatt-app",
      storageBucket: "urmatt-app.appspot.com",
      messagingSenderId: "523826665141"
  };
    firebase.initializeApp(config);

    var secondaryApp = firebase.initializeApp(config, "Secondary");

    var firestore = firebase.firestore();
    var storage = firebase.storage().ref();
