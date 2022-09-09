import { combineReducers } from "@reduxjs/toolkit";
import { ADD_ITEM, ADD_TO_CART, INIT, OPEN_MENU, REMOVE_USER, SET_USER, CLOSE_MENU } from './types';
import 'firebase/firestore'
import {
	ReactReduxFirebaseProvider,
	firebaseReducer
  } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase";
// import userReducer from './slices/userSlice'

const initialItemsState=
[
	{
		pid:0,
		company: 'Sneaker Company',
		collection:'Fall',
		name:'Fall Limited Edition Sneakers',
		description:'These low-profile sneakers are your perfect casual wear companion. Featuring a \
durable rubber outer sole, they’ll withstand everything the weather can offer.',
		price:250,
		discount:50,
		sex:'uni',
		amount:100,
		photos:['https://i.ibb.co/JsfxFfw/image-product-1.jpg', 'https://i.ibb.co/wwwkHFd/image-product-2.jpg',
		'https://i.ibb.co/kyXmNqY/image-product-3.jpg','https://i.ibb.co/XFmZXTw/image-product-4.jpg']
	},
]

function itemsReducer(state = initialItemsState, action){
	switch (action.type) {
		case ADD_ITEM:
			return [...state, action.payload]


		default:
			return state;
	}
}

const initialUserState = {
	uid:123123123,
	email:'qweqwe12@qwe.qwe',
	cart:[
		{pid: 0,amount:1}
	],
	image:'https://firebasestorage.googleapis.com/v0/b/sneakers-36077.appspot.com/o/defaultAva.png?alt=media&token=f2186fcb-adc6-416a-9def-3791d94764ae'
}

function currentUserReducer(state = initialUserState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			
			return {...state, cart:[ ...state.cart,
									{pid:action.payload.pid,
									amount:action.payload.amount}
								]}
	
		default:
			return state;
	}
}
const initialUsState= {
	email:null,
	token:null,
	id:null,
};



export function userReducer(state = initialUsState, action) {
	switch (action.type) {
		case SET_USER:
			
			return {...state, email:action.payload.email,
				token : action.payload.token,
				id : action.payload.id
			}
		case REMOVE_USER:
			return{
				email :null,
				token: null,
				id : null,
			}
		default:
			return state;
	}
}
const modalInitialState = {
	burger:false,
}
export function modalReducer(state = modalInitialState, action) {
	switch (action.type) {
		case OPEN_MENU:
			return {...state, burger:true}
		;
		case CLOSE_MENU:
			return {...state, burger:false}
		;
		default:
			return state
	} 
}

export const rootReducer = combineReducers({
	items: itemsReducer, 
	currentUser:currentUserReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	user: userReducer,
	modal:modalReducer,
})