const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const express = require("express");
const helmet = require("helmet");

const http = require("http");

const admin = require("./firebase/dbadmin.js");
const db = getFirestore();
const path = require("path");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/data", async(req, res) =>{

  const abc = await db.collection('user').get();

  
  const ref = admin.database().ref("/Chats");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(abc.query.firestore.database.collection);
    res.send(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
