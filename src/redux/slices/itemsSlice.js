import { createSlice } from '@reduxjs/toolkit';



const itemsSlice = createSlice({
	name:'items',
	initialState:[],
	reducers:{
		addItem(state, action){
			console.log(222);
			return [...state, action.payload]
		}
	}
})
export default itemsSlice.reducer;
export const {addItem} = itemsSlice.actions;