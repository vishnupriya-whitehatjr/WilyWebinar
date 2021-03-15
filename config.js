import * as firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCc7GEJpvlnwHnK1U3HECqoer5njK84A8s",
  authDomain: "wilywebinar.firebaseapp.com",
  projectId: "wilywebinar",
  storageBucket: "wilywebinar.appspot.com",
  messagingSenderId: "912482411204",
  appId: "1:912482411204:web:d402c0e638a1ad0c625f91",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
