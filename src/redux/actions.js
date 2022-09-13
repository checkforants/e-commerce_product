import {ADD_ITEM, ADD_ITEM_TO_CART, ADD_TO_CART, CLOSE_MENU, INIT, OPEN_MENU, REMOVE_ITEM_FROM_CART, REMOVE_USER, SET_USER} from './types'
import { IProduct } from './../models';
import { query, collection } from 'firebase/firestore';
import { db } from './firebase';
import { getDocs } from 'firebase/firestore';



export function addItem(payload) {
	return {
		type:ADD_ITEM,
		payload
	}
}

export function addToCart(payload){
	return {
		type:ADD_TO_CART,
		payload
	}
}

export function setUser(payload){
	return {
		type:SET_USER,
		payload
	}
}
export function removeUser(payload){
	return {
		type:REMOVE_USER,
		payload
	}
}

export function openMenu(){
	return{
		type:OPEN_MENU
	}
}
export function closeMenu(){
	return{
		type:CLOSE_MENU
	}
}


export function addItemToCart(payload) {
	return{
		type:ADD_ITEM_TO_CART,
		payload
	}
}

export function removeItemFromCart(payload) {
	return{
		type:REMOVE_ITEM_FROM_CART,
		payload
	}
}
// export function init() {
// 	return function (dispatch){
// 		let ans = []
// 		const q = query(collection(db, "items"));
// 		const querySnapshot = getDocs(q);
// 		querySnapshot.forEach((doc) => {
// 			console.log(doc.id, " => ", doc.data());
// 			ans.push(doc.data())
// 		})
// 		console.log(ans);
// 		return ans;
// 		}
// }