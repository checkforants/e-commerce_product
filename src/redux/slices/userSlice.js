import {createSlice} from '@reduxjs/toolkit'
import { db } from '../firebase';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { REMOVE_USER, SET_USER } from './../types';
			// const docRef = doc(db, "users", action.payload.id);
			// const docSnap = await getDoc(docRef)
			// if (docSnap.exists()) {
			// 	console.log("Document data:", docSnap.data());
			//   } else {
			// 	// doc.data() will be undefined in this case
			// 	console.log("No such document!");
			//   }




// const userSlice = createSlice({
// 	name:'user',
// 	initialState,
// 	reducers:{
// 		setUser(state, action){
// 			state.email = action.payload.email;
// 			state.token = action.payload.token;
// 			state.id = action.payload.id;
// 		},
// 		removeUser(state){
// 			state.email = null;
// 			state.token = null;
// 			state.id = null;
// 		}
// 	}
// })

// export const {setUser, removeUser} = userSlice.actions
// export default userSlice.reducer