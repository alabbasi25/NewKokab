import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

const isConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Initialize Firebase only if config is available
if (isConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { auth, db };

export const FirebaseService = {
  /**
   * Safe wrapper for Firestore operations that handles missing DB gracefully (Test Mode)
   */
  isReady: () => !!db,

  // Generic document fetching
  getDocument: async (colPath: string, docId: string) => {
    if (!db) return null;
    try {
      const docRef = doc(db, colPath, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
      console.error(`Error getting document ${colPath}/${docId}:`, e);
      return null;
    }
  },

  // Generic collection fetching with filters
  getCollection: async (colPath: string, filters?: { field: string; op: any; value: any }[]) => {
    if (!db) return [];
    try {
      let q = query(collection(db, colPath));
      if (filters) {
        filters.forEach(f => {
          q = query(q, where(f.field, f.op, f.value));
        });
      }
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error(`Error getting collection ${colPath}:`, e);
      return [];
    }
  }
};
