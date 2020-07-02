import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../plugins/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
