// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import 'dotenv/config'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoPyyvr38UkYkytrOo8v9rvHWzq-tfdFw",
    authDomain: "estate-oauth.firebaseapp.com",
    projectId: "estate-oauth",
    storageBucket: "estate-oauth.appspot.com",
    messagingSenderId: "382812853335",
    appId: "1:382812853335:web:914c6bdabbde14d81fbf12"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);




// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if request.resource.size < 2 * 1024 * 1024 && 
//       request.resource.contentType.matches('image/.*');
//     }
//   }
// }