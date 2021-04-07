import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDCXBzTLS82Gqxp2x_-ldlNm6VQcaVBBvg",
  authDomain: "breadcrumbs-c382c.firebaseapp.com",
  projectId: "breadcrumbs-c382c",
  storageBucket: "breadcrumbs-c382c.appspot.com",
  messagingSenderId: "32315761056",
  appId: "1:32315761056:web:f04ef52ad7bf820a6604c5",
  measurementId: "G-452NV98MGL",
});

export const auth = app.auth();
export default app;
