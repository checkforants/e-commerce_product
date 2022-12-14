import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import 'firebase/firestore'
import { store } from './store';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { collection, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId:process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  
  const rrfConfig = {
	userProfile: 'users',
	items:'items',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);


//   (async () => {
// 	const docRef = doc(db, "items", "newitems");
// 	const docSnap = await getDoc(docRef);
// 	console.log(docSnap);
//   })();


  const analytics = getAnalytics(app);

  export const rrfProps = {
	firebase: app,
	config: rrfConfig,
	dispatch: store.dispatch,
	firestore: db
  }

export const storage = getStorage(app);

//   console.log(firebase.collection('items'));