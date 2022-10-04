import React, { useEffect, useState } from 'react';
// import itemsArr from '../items';
import Item from './../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import { getDocs } from 'firebase/firestore';
import { db } from '../redux/firebase';
import { query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { addItem } from './../redux/actions';
import { useLocation, useParams } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { IProduct } from './../models';
import Loader from './../components/UI/loader/Loader';


const CollectionsPage = (props:any) => {
	const [scrollPos, setScrollPos] = useState(0)
	let location = useLocation();

	let res = useSelector((state:any)=>state.items)
	
	// useEffect(()=>{
	// 	window.scrollTo(0,scrollPos)
	// 	return ()=>{
	// 		setScrollPos(window.scrollY)
	// 		console.log(window.scrollY);
	// 	}
	// })
	
	if (location.pathname=='/men'){
		res = res.filter((item:any)=>item.sex!=='female')

	}
	if (location.pathname=='/women'){
		res = res.filter((item:any)=>item.sex!=='male')

	}

	
	return (
		<div className='h-full flex flex-col'>
			{res?res.map((item:any, ind:number)=><Item key={ind} info={item}></Item>):<Loader></Loader>}
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
