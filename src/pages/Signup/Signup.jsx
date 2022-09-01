import React, {useContext, useState} from 'react';
import MyInput from '../../components/UI/MyInput/MyInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
// import {Context} from '../../index.js'
import {collection, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";


import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/Alert'
import cl from './Signup.module.scss'


import { connect, useDispatch } from 'react-redux';
// import { setUser } from '../../redux/slices/userSlice';
import { setUser } from './../../redux/actions';

const Signup = (props) => {
	const [userData, setUserData] = useState(
		{email:'',
		password:''})
	const lang = 'eng'
	const [error, setError] = useState('')
	// const {auth, firestore} = useContext(Context)
	
	const dispatch = useDispatch()
	const navigate = useNavigate();

	const handleSignUp = (email, password)=>{
		const auth = getAuth() 
		console.log(email, password);
		createUserWithEmailAndPassword(auth, email, password)
			.then(({user})=>{
				console.log(user.email, user.uid,  user.accessToken);
				dispatch(setUser({
					email:user.email,
					id:user.uid,
					token:user.accessToken,
				}))
				navigate('/')
			})
			.catch(console.error)
			
	}
	return (
		<div className={cl.container}>
			<div className={cl.signup}>
			<div className={cl.title}>
				{/* <img src={require('../../images/icon.png')}></img> */}
				<div className='sneakers'>{lang?'Sign up for sneakers':'Зарегистрироваться'}</div>
			
			</div>
			<form  style={{display:'flex', textAlign:'center', flexDirection:'column', height:'auto', marginTop:'3px', justifyContent:'space-between'}}>
				{/* <MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, login: e.target.value}})} label={lang?'Name':'Имя'}  type='text'></MyInput> */}
				{/* <MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, age: e.target.value}})} label={lang?'Age':'Возраст'}  type='text'></MyInput> */}
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, email: e.target.value}})} label={lang?'Email':"Почта"}  type='text'></MyInput>
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, password: e.target.value}})} label={lang?'Password':'Пароль'} type='password'	></MyInput>
				<button onClick={(e)=>{e.preventDefault(); handleSignUp(userData.email, userData.password)}} className={cl.btn}>{lang?'Sign Up':'Зарегистрироваться'}</button>
				{/* <button onClick={(e)=>{e.preventDefault();handleClick()}}>Войти</button>
				<button onClick={(e)=>{e.preventDefault();handleGoogleClick()}}></button> */}
			</form>
			<Link style={{margin:'10px auto', fontSize:'12px'}} to="/login">{lang?'I already have an acc':'Уже есть аккаунт'}</Link>
				</div>
		</div>
	);
};

// function mapStateToProps(state) {
// 	// console.log(state.theme.isDarkTheme);
// 	return {
// 		lang: state.lang.lang,
// 		isDarkTheme: state.theme.isDarkTheme
// 	};
//   }
  export default Signup;
  