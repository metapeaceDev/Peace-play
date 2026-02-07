// Firebase Configuration
// Get your config from: https://console.firebase.google.com/

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// Singleton pattern for Next.js to prevent "Firebase App named '[DEFAULT]' already exists" errors
import { getApps, getApp } from 'firebase/app';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
// Ensure auth state persists across redirects and reloads
setPersistence(auth, browserLocalPersistence).catch(() => {
  // If persistence fails (e.g. restricted environments), fall back to default
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Analytics is optional and can break initialization in some environments/bundlers.
// Load it lazily only in the browser.
export let analytics: unknown | null = null;
if (typeof window !== 'undefined') {
  // Fire-and-forget: app should not depend on analytics to render.
  import('firebase/analytics')
    .then(async m => {
      // Prefer isSupported() when available.
      if (typeof m.isSupported === 'function') {
        const ok = await m.isSupported().catch(() => false);
        if (!ok) return;
      }
      analytics = m.getAnalytics(app);
    })
    .catch(() => {
      // ignore
    });
}

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export default app;
