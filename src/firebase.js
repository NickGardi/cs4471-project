import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDCXBzTLS82Gqxp2x_-ldlNm6VQcaVBBvg",
  authDomain: "breadcrumbs-c382c.firebaseapp.com",
  databaseURL: "https://breadcrumbs-c382c-default-rtdb.firebaseio.com",
  projectId: "breadcrumbs-c382c",
  storageBucket: "breadcrumbs-c382c.appspot.com",
  messagingSenderId: "32315761056",
  appId: "1:32315761056:web:f04ef52ad7bf820a6604c5",
  measurementId: "G-452NV98MGL",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
