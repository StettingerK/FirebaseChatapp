const { initializeApp } = require("firebase/app");
const { getFirestore, doc ,setDoc, getDoc, exists, collection, addDoc, query, getDocs, where} = require("firebase/firestore");
const express = require("express");
const helmet = require("helmet");

const http = require("http");

const firebaseConfic = ({
  apiKey: "AIzaSyBM-9czK5V9Juda9r60lIZPN_4pFX5zYAA",
  authDomain: "chatappschule.firebaseapp.com",
  databaseURL: "https://chatappschule-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatappschule",
  storageBucket: "chatappschule.appspot.com",
  messagingSenderId: "108118542440",
  appId: "1:108118542440:web:fb3ab09ca62f5c936a13dd"
});

const firebaseApp = initializeApp(firebaseConfic);
  
const firestore = getFirestore();
const path = require("path");
const { getDefaultAutoSelectFamily } = require("net");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../client/build")));

async function readASingleDocument(doc) {
  const mySnapshot = await getDoc(doc);
  if(mySnapshot.exists()){
    return mySnapshot.data();
  }
}

async function IsUserNotCreated(userName){
  const userQuery = query(
    collection(firestore, 'User'),
    where('userName','==', userName)
  );
  const querySnapshot = await getDocs(userQuery);
  return querySnapshot.empty;
};

async function writeToCollection(collectionParam ,docData){
  const col = doc(firestore, collectionParam)
  const newDoc = await setDoc(col, docData)
  console.log('Value written to DB');
}

async function addANewDocument(collectionParam,docData){
  const col = collection(firestore, collectionParam)
  const newDoc = await addDoc(col, docData)
  console.log('New Document has been created');
}

app.get("/data", (req, res) =>{

  docData = readASingleDocument();

 res.send(docData);
});

app.post("/register", async (req,res) =>{
  const params = {
    userName: req.body.userName,
    password: req.body.password
  };

  if(await IsUserNotCreated(params.userName)){
    addANewDocument('User/' ,params);
    res.send(true);
  }
  else{
    res.status(409).send(false);
  }  
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
