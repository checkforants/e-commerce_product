import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import 'firebase/firestore'
import { store } from './store';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { collection, doc, getDoc } from "firebase/firestore";


const firebaseConfig = {
	apiKey: "AIzaSyD8YOdwiM9Yx4xaShronfNA9P2sqrSp-5g",
	authDomain: "sneakers-36077.firebaseapp.com",
	projectId: "sneakers-36077",
	storageBucket: "sneakers-36077.appspot.com",
	messagingSenderId: "460190006245",
	appId: "1:460190006245:web:805c8fdc1cbc853f7a0d0c",
	measurementId: "G-ZNKHZVMFX0"
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

//   console.log(firebase.collection('items'));