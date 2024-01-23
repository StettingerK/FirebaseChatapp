import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBM-9czK5V9Juda9r60lIZPN_4pFX5zYAA",
  authDomain: "chatappschule.firebaseapp.com",
  databaseURL: "https://chatappschule-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatappschule",
  storageBucket: "chatappschule.appspot.com",
  messagingSenderId: "108118542440",
  appId: "1:108118542440:web:fb3ab09ca62f5c936a13dd"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function getDB(){
  return db;
}

export default getDB();
