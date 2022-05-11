import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyASCqxo8pwAMSjfeXriWtSWjaOgf_17sag",
  authDomain: "embed-lab-project.firebaseapp.com",
  projectId: "embed-lab-project",
  storageBucket: "embed-lab-project.appspot.com",
  messagingSenderId: "1019577633582",
  appId: "1:1019577633582:web:5197e0c2450debd82788bf",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);
// document.getElementById("test").innerHTML = collection(db, "book");
const db = getFirestore(app);
const book = collection(db, "book");
console.log(book);
// const citiesRef = collection(db, "cities");

//  setDoc(doc(citiesRef, "SF"), {
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });
//  setDoc(doc(citiesRef, "LA"), {
//     name: "Los Angeles", state: "CA", country: "USA",
//     capital: false, population: 3900000,
//     regions: ["west_coast", "socal"] });
//  setDoc(doc(citiesRef, "DC"), {
//     name: "Washington, D.C.", state: null, country: "USA",
//     capital: true, population: 680000,
//     regions: ["east_coast"] });
//  setDoc(doc(citiesRef, "TOK"), {
//     name: "Tokyo", state: null, country: "Japan",
//     capital: true, population: 9000000,
//     regions: ["kanto", "honshu"] });
//  setDoc(doc(citiesRef, "BJ"), {
//     name: "Beijing", state: null, country: "China",
//     capital: true, population: 21500000,
//     regions: ["jingjinji", "hebei"] });