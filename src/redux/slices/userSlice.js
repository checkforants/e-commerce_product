import {createSlice} from '@reduxjs/toolkit'
import { db } from '../firebase';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { REMOVE_USER, SET_USER } from './../types';

const userSlice = createSlice({
	name: 'user',
	initialState:{
		email:null,
		token:null,
		id:null,
		cart:null,
		wishList:null,
		image:null
	},
	reducers:{
		setUser(state,action){
			return {...state, email:action.payload.email,
				token : action.payload.token,
				id : action.payload.id,
				cart:action.payload.cart,
				wishList:action.payload.wishList,
				image:action.payload.image
		}},
		removeUser(state,action){
			return{
				email:null,
				token:null,
				id:null,
				cart:null,
				wishList:null,
				image:null
			}
		},
		editUser(state,action){
			return {
				...state,
				...action.payload
			}
		},
		addItemToCart(state, action){
			return {...state, cart:[...state.cart, {pid:action.payload.pid, amount:action.payload.amount}]}
		},
		removeItemFromCart(state, action){
			return {...state, cart:[...state.cart.filter(elem=>elem.pid!==action.payload.pid)]}
		}
	}
}) 
export default userSlice.reducer;
export const {setUser, removeUser, editUser, addItemToCart, removeItemFromCart} = userSlice.actions;