import firebase from "firebase/app";
// FIREBASE SERVICES
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// AUTHENTICATION
export const auth = firebase.auth();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const GithubAuthProvider = new firebase.auth.GithubAuthProvider();

export const actionCodeSettings: firebase.auth.ActionCodeSettings = {
  url: process.env.NEXT_PUBLIC_FIREBASE_REDIRECT_URL || '',
  handleCodeInApp: true,
};

// FIRESTORE
export const firestore = firebase.firestore();

