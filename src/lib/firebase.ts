import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAc3GeC9ZROmdFE7XAmR5zQO7bzHPTJGt0",
    authDomain: "blog-health-ae0ea.firebaseapp.com",
    projectId: "blog-health-ae0ea",
    storageBucket: "blog-health-ae0ea.firebasestorage.app",
    messagingSenderId: "632579778510",
    appId: "1:632579778510:web:634a2eb13194bd6198ad9f",
    measurementId: "G-S12LDVLPRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);