const { initializeApp } = require("firebase/app");
const { getFirestore, doc ,setDoc, getDoc, collection, addDoc, query, getDocs, where, orderBy, startAt, endAt, limit, and, or} = require("firebase/firestore");
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


//const { getDefaultAutoSelectFamily } = require("net");
//const { userInfo } = require("os");

const firebaseApp = initializeApp(firebaseConfic);
const firestore = getFirestore();
const path = require("path");

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

async function userLogin(userName, password){
  const userQuery = query(
    collection(firestore, 'User'),
    where('userName','==', userName),
    where('password','==', password)
  );
  const querySnapshot = await getDocs(userQuery);
  if(!querySnapshot.empty){
    let userId = "";
    querySnapshot.forEach((doc) => {
      userId = [doc.id, doc.data().userName];
    });
    return userId;
  }
  else{
    return "Invalid Credentials";
  }
}

async function searchUser(searchedUser){
  const userQuery = query(
    collection(firestore, 'User'),
    orderBy("userName"),
    startAt(searchedUser),
    endAt(`${searchedUser}\uf8ff`),
    limit(10)
  );
  const querySnapshot = await getDocs(userQuery);
  if(!querySnapshot.empty){
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push([doc.id, doc.data().userName]);
    })
    return data;
  }
  else{
    return "No User Found"
  }
}

async function isChatCreated(myUserId, chatpartnerUserId){
  const userQuery = query(
    collection(firestore, 'Chats'),
    or( and(where('User1', "==", myUserId), where('User2', "==", chatpartnerUserId)),
        and(where('User1', "==", chatpartnerUserId), where('User2', "==", myUserId))
    )
  );
  const querySnapshot = await getDocs(userQuery);
  if(!querySnapshot.empty){
    let chatid = "";
    querySnapshot.forEach((doc) => {
      chatid = doc.id;
    });
    return chatid;
  }
  else{
    return "kein Chat vorhanden";
  }
}

async function getChat(chatId){
  const userQuery = query(
    collection(firestore, 'Messages'),
    where('ChatId', "==", chatId), 
    orderBy("Time")
  );
  const querySnapshot = await getDocs(userQuery);
  if(!querySnapshot.empty){
    let chat = "";
    querySnapshot.forEach((doc) => {
      chat = [doc.data().UserId, doc.data().Message, doc.data().Time];
    });
    return chat;
  }
  else{
    return "kein Chat vorhanden";
  }
}

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
    password: req.body.password,
    userName: req.body.userName
  };

  if(await IsUserNotCreated(params.userName)){
    addANewDocument('User/' ,params);
    res.send(true);
  }
  else{
    res.status(409).send(false);
  }  
});

app.post("/login", async (req,res) =>{
  const params = {
    userName: req.body.userName,
    password: req.body.password
  };
  user = await userLogin(params.userName, params.password);
  res.send(user); 
});

app.post("/search", async (req,res) =>{
  const params = {
    searchedUser: req.body.searchedUser
  };
  user = await searchUser(params.searchedUser);
  res.send(user); 
});

app.post("/chat", async (req,res) =>{
  const params = {
    myUserId: req.body.myUserId,
    chatpartnerUserId: req.body.chatpartnerUserId
  };
  chatid = await isChatCreated(params.myUserId, params.chatpartnerUserId);
  //console.log(chatid)
  res.send(chatid); 
});

app.post("/messages", async (req,res) =>{
  const params = {
    ChatId: req.body.ChatId
  };
  chat = await getChat(params.ChatId);
  console.log(chat)
  res.send(chat); 
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
