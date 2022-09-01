import React, {useContext, useState} from 'react';
// import { AuthContext } from '../context';
import cl from './Login.module.scss'
import firebase from 'firebase/compat/app';
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import MyInput from './../../components/UI/MyInput/MyInput';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Alert } from '@mui/material';


	
const Login = (props) => {
	// const {isAuth, setIsAuth} = useContext(AuthContext);
	const [error, setError] = useState(false);
	const [userData, setUserData] = useState(
		{email:'',
		password:''})
	const lang = 'eng'
	// const {auth, firestore} = useContext(Context)
	const handleGoogleClick = async ()=>{	
		// const provider= new firebase.auth.GoogleAuthProvider()
		// auth.signInWithPopup(provider).then(res=>{
		// 	if (res.additionalUserInfo.isNewUser){
		// 		const arra = {name:res.user.displayName, 
		// 			email:res.user.email, 
		// 			uid:res.user.uid, 
		// 			phone: res.user.phoneNumber, 
		// 			photo: res.user.photoURL?res.user.photoURL:'https://i.ibb.co/YRHhgDn/ava.png'}
		// 		// console.log(arra)
	
		// 		const ref = doc(firestore, 'users', `${res.user.uid}`);
		// 		setDoc(ref, arra)
		// 	}else{
		// 		// console.log('ne tuda')
		// 	}
		// })
	}
	const handleClick = ()=>{
		// console.log(userData.email, userData.password)
		// signInWithEmailAndPassword(auth, userData.email, userData.password)  
		// .then((userCredential) => {
		// 	// Signed in 
		// 	const user = userCredential.user;
		// 	// console.log(user.uid)
		//   })
		//   .catch((error) => {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	setError(error.message)
		//   });
	}
	// onAuthStateChanged(auth, (user) => {
	// 	// console.log(user)
	// 	if (user) {
	// 	  // User is signed in, see docs for a list of available properties
	// 	  console.log(user.uid, 'signedIn')
	// 	  // https://firebase.google.com/docs/reference/js/firebase.User
		  
	// 	  // ...
	// 	} else {
	// 	  // User is signed out
	// 	  // ...
	// 	//   console.log(user.uid,'signedOut')
	// 	}
	//   });


	const [nextClicked, setNextClicked]=useState(false)
	



	// if (nextClicked){}
	return  (
		<div className={cl.container}>
			<div  className={cl.login}>
					{error?<Alert severity="warning">{error}</Alert>:''}
				<div className={cl.title}>
					{/* <img src={require('../../images/icon.png')}></img> */}
					<div>{lang?'Log in to sneakers':'Зайти'}</div>
			
				</div>
				<form  style={{display:'flex',flex:'0 1 50%', textAlign:'center', flexDirection:'column', height:'auto', marginTop:'3px', justifyContent:'space-between'}}>
			
					<MyInput  onChange={(e)=>setUserData(prev=>{return {...prev, email: e.target.value}})} label={lang?'Email':'Почта'}  type='text'></MyInput>
			
					<div className={cl.accordion}>
						<div className={cl.accordionItem}>
							<div className={nextClicked?cl.content+' '+cl.active:cl.content}>
								<div className={nextClicked?cl.contentInner+' '+cl.active:cl.contentInner}>
									<MyInput  onChange={(e)=>setUserData(prev=>{return {...prev, password: e.target.value}})} label={lang?'Password':'Пароль'} type='password'></MyInput>
								</div>
							</div>
						</div>
					</div>
				<button onClick={(e)=>{e.preventDefault(); if(nextClicked){handleClick()}else{setNextClicked(true)}}} className={cl.next}>{nextClicked?lang?'Sign In':'Зайти':lang?'Next':'Дальше'}</button>
				</form>
				<Link style={{margin:'10px auto', fontSize:'12px'}} to="/signup">{lang?"Still don't have an acc?":'До сих пор нет аккаунта?'}</Link>
			</div>
		</div>

	);
};

  export default Login;
