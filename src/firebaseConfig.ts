// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { browser } from '$app/environment';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCOQfHSfPxvCIwOI7EaqZlT3BrjhMIfXP4',
	authDomain: 'dropbox-clone-814f9.firebaseapp.com',
	projectId: 'dropbox-clone-814f9',
	storageBucket: 'dropbox-clone-814f9.appspot.com',
	messagingSenderId: '404651066493',
	appId: '1:404651066493:web:de51cc179fe07ef67b1d14',
	measurementId: 'G-K7QXR74BJZ'
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
if (browser) {
	getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
