import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcLSedGkajDPIAMMXNQ7hEtjha-KcVRXw",
  authDomain: "nametruck-4b5f3.firebaseapp.com",
  projectId: "nametruck-4b5f3",
  storageBucket: "nametruck-4b5f3.appspot.com",
  messagingSenderId: "349572616851",
  appId: "1:349572616851:web:e7ad2653b2c2531ded7366",
  measurementId: "G-3W1905W0TN"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const auth = getAuth(app)

export const db = getFirestore();

export default app;


// import firebase from 'firebase/compat/app';)
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyBcLSedGkajDPIAMMXNQ7hEtjha-KcVRXw",
//   authDomain: "nametruck-4b5f3.firebaseapp.com",
//   projectId: "nametruck-4b5f3",
//   storageBucket: "nametruck-4b5f3.appspot.com",
//   messagingSenderId: "349572616851",
//   appId: "1:349572616851:web:e7ad2653b2c2531ded7366",
//   measurementId: "G-3W1905W0TN"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// export { firebase }