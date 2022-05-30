import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc } from "firebase/firestore"; 
import { getStorage, ref } from "firebase/storage";

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
async function opendb(){

  const docRef = doc(db, "tmp", "pics");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data().pic;
  console.log(data);
  

}
window.opendb = opendb;

function openpic(){
  document.getElementById('status').src = "pic/cloudy.jpg";
}
window.openpic = openpic;

function check(){
  
}

          

