// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmNp9JwlTqo71K-v8L3spIFn9kMgy0Liw",
  authDomain: "restauranteb-e69c3.firebaseapp.com",
  projectId: "restauranteb-e69c3",
  storageBucket: "restauranteb-e69c3.appspot.com",
  messagingSenderId: "648809755962",
  appId: "1:648809755962:web:b82bf992b6d6f2f83acc03"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);



// Initialize Firebase
//export { app, auth, getApp, getAuth };
export { app, auth, db, storage};