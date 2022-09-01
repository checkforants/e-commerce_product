import React, { useEffect, useState } from 'react';
// import itemsArr from '../items';
import Item from './../components/Item';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { getDocs } from 'firebase/firestore';
import { db } from '../redux/firebase';
import { query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { addItem } from './../redux/actions';


const CollectionsPage = (props:any) => {
	const [data, setData] = useState<any[]>([])
	console.log(props.items);
	
	const dispatch = useDispatch()
	const itemsState = props.items
	console.log(data);
	
	const getItems =async ()=>{
		const q = query(collection(db, 'items'))
		const querySnapshot = await getDocs(q);
		console.log(typeof querySnapshot);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.data());
			dispatch(addItem(doc.data()))
			setData(prev=>{
				return([...prev, doc.data()])
			})
		  });

	}
	useEffect(()=>{
		getItems()
	},[])
	// console.log(itemsState);

	
	
	

	return (
		<div className='h-full pt-[65px] flex flex-col'>
			{data?data.map((item:any, ind:number)=><Item key={ind} info={item}></Item>):'nea'}
		</div>
	);
};
function mapStateToProps(state:any) {

	return {
		items: state.items,
		currentUser: state.currentUser,
		// firebase: state.firebase
	};
  }
export default connect(mapStateToProps)(CollectionsPage);
