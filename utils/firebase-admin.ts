import admin from "firebase-admin";
// import { serviceAccount } from "./serviceAccount";

try {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT as admin.ServiceAccount),

  });
} catch(error) {
  console.log('Firebase admin initialization error');
}

// FIRESTORE
export const firestore = admin.firestore();