// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import moduleName from 'module'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBAYLkyscpj1bObkpU5q-lLGiAx4Me0Jg",
  authDomain: "uploading-images-15ba5.firebaseapp.com",
  projectId: "uploading-images-15ba5",
  storageBucket: "uploading-images-15ba5.appspot.com",
  messagingSenderId: "394614517375",
  appId: "1:394614517375:web:eea11f826ba4a534c7994a",
  measurementId: "G-S626890744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)