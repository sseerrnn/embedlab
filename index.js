import { initializeApp } from "firebase/app";

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
