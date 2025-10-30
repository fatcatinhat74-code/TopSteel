// firebase-config.js
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCTK22UhteEWD4GOJ5q-zRVgjQYATLQRM",
  authDomain: "top-steel-pipes.firebaseapp.com",
  projectId: "top-steel-pipes",
  storageBucket: "top-steel-pipes.firebasestorage.app",
  messagingSenderId: "936218766277",
  appId: "1:936218766277:web:bf44749f0341b8cda2f9ac"
};

let app;
window.db = null; // define only once globally

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Firebase initialized successfully");

    // Make globally available
    window.firebaseApp = app;
    window.db = db;

} catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    // Dummy db for offline safety
    db = {
        collection: () => ({
            doc: () => ({
                set: () => Promise.reject(new Error('Firebase not available')),
                get: () => Promise.reject(new Error('Firebase not available')),
                onSnapshot: () => () => {}
            })
        })
    };
}