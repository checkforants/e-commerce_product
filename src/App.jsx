import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Navigator from './components/Navigator/Navigator';
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
import { init } from './redux/actions';
import {addItem} from './redux/slices/itemsSlice'
import {setUser} from './redux/slices/userSlice'


import { useDispatch, connect, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { query } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';


import { useAuthState } from 'react-firebase-hooks/auth';
import { where } from 'firebase/firestore';
import Settings from './pages/Settings';

function App(props) {
	//  const [items, itemsLoading, itemsSnap, itemsError] = useCollectionData(
	// 	collection(db, 'items')
	// )
	// console.log(items);
	
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// const user = useSelector()
	const auth = getAuth() 
	const [user, loading, error] = useAuthState(auth);


	const getItems =async ()=>{
		const q = query(collection(db, 'items'))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			// console.log(doc.data());
			dispatch(addItem(doc.data()))
		  });
		  
	}
	const getUserDetails=async(us)=>{
		const q = query(collection(db, 'users'), where("uid", "==", us.uid))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			dispatch(setUser({
				email:us.email,
				id:us.uid,
				token:us.accessToken,
				cart:doc.data().cart,
				wishList:doc.data().wishList,
				image:us.photoURL
			}))
		  });
	}
	useEffect(()=>{
		getItems()
		
	},[])
	
	
	
	useEffect(() => {
		if (user){
			const q = query(collection(db, 'items'))
			getUserDetails(user)
			
			// navigate('/')
			console.log(user);
		}

	}, [user]);

  return (
	<div className='app w-4/5 h-full mx-auto box-border relative '>
		<Navigator/>
		
		<div className='relative w-11/12 md:w-10/12  box-border mx-auto h-screen pt-[70px] md:pt-[90px] md:py-10 md:flex md:flex-col justify-center items-center'>
		{props.user.email?
			<Routes >
				<Route path='/' element={<CollectionsPage/>}></Route>
				<Route path='/men' element={<CollectionsPage/>}></Route>
				<Route path='/women' element={<CollectionsPage/>}></Route>
				<Route path='/about' element={<About/>}></Route>
				<Route path='/newItem' element={<CreateNewItem/>}></Route>
				<Route path='/item/:pid' element={<ItemPage/>}></Route>
				<Route path='/settings' element={<Settings></Settings>}></Route>
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
		user: state.user,
		burger:state.modal.burger
	};
  }
export default connect(mapStateToProps)(App);
