const admin = require("firebase-admin");
var serviceAccount = require("./firebaseAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatappschule-default-rtdb.europe-west1.firebasedatabase.app/",
});

module.exports = admin;