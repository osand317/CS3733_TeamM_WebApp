

var admin = require("firebase-admin");

var serviceAccount = require("/urmatt-app-firebase-adminsdk-pqda0-4246daedc0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://urmatt-app.firebaseio.com"
});
