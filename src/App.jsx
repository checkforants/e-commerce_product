import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navigator from './components/Navigator';
import Modal from './components/Modal';
import PhotoGallery from './components/PhotoGallery';
import About from './pages/About';
import ItemPage from './pages/ItemPage';
import CollectionsPage from './pages/CollectionsPage';
import CreateNewItem from './pages/CreateNewItem';
import {useCollectionData} from 'react-firebase-hooks/firestore'

import 'firebase/firestore';
import { db, app } from './redux/firebase';
import { getFirestore, collection } from 'firebase/firestore';
import { init, addItem } from './redux/actions';
import { useDispatch, connect } from 'react-redux';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { query } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';




function App(props) {
	//  const [items, itemsLoading, itemsSnap, itemsError] = useCollectionData(
	// 	collection(db, 'items')
	// )
	// console.log(items);
	const dispatch = useDispatch()
	const auth = getAuth() 
	
	console.log(auth);
	const user = auth.currentUser

	const getItems =async ()=>{
		const q = query(collection(db, 'items'))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.data());
			dispatch(addItem(doc.data()))
		  });

	}
	useEffect(()=>{
		getItems()
		
	},[props.currentUser])

  return (
	<div className='app w-4/5 h-screen mx-auto box-border relative '>
		<Navigator/>
		<div className='w-10/12 box-border mx-auto h-screen py-10 flex flex-col justify-center items-center'>
		{props.user.email?
			<Routes >
				<Route path='/' element={<CollectionsPage/>}></Route>
				<Route path='/men' element={<CollectionsPage/>}></Route>
				<Route path='/women' element={<CollectionsPage/>}></Route>
				<Route path='/about' element={<About/>}></Route>
				<Route path='/newItem' element={<CreateNewItem/>}></Route>
				<Route path='/item/:pid' element={<ItemPage/>}></Route>
				<Route  path='*' element={<Navigate replace to = '/'/>}/>
			</Routes>
			:<Routes >
				<Route path='/item/:pid' element={<ItemPage/>}></Route>
				<Route path='/' element={<CollectionsPage/>}></Route>
				<Route path='/men' element={<CollectionsPage/>}></Route>
				<Route path='/women' element={<CollectionsPage/>}></Route>
				<Route  exact path='/login' element={<Login/>}></Route>
				<Route  exact path='/signup' element={<Signup/>}></Route>
				<Route exact path='/about'  element={<About/>}/>
				<Route  path='*' element={<Navigate replace to = '/'/>}/>
			</Routes>
		}
		</div>	
	</div>
  );
}
function mapStateToProps(state) {
	// console.log(state.theme.isDarkTheme);
	return {
		user: state.user
	};
  }
export default connect(mapStateToProps)(App);
