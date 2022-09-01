import React, {useContext, useState} from 'react';
import MyInput from '../../components/UI/MyInput/MyInput';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
// import {Context} from '../../index.js'
import {collection, doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";


import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/Alert'
import cl from './Signup.module.scss'


import { connect } from 'react-redux';

const Signup = (props) => {
	const [userData, setUserData] = useState(
		{email:'',
		password:'',
		login:'',
		age:''})
	const lang = 'eng'
	const [error, setError] = useState('')
	// const {auth, firestore} = useContext(Context)
	
	const handleSignUp=async(e)=>{
		// e.preventDefault()
		// console.log('hope')
		// try{
		// 	// const tasksRef = doc(firestore, "tasks", `${user.user.uid}`);
		// 	// setDoc(tasksRef, {})
		// 	await createUserWithEmailAndPassword(auth, userData.email, userData.password).then(async(user)=>{
		// 	console.log(user)
		// 	const arra = {name:userData.login, 
		// 		email:userData.email, 
		// 		uid:user.user.uid, 
		// 		age:userData.age,
		// 		phone: '', 
		// 		photo: 'https://i.ibb.co/YRHhgDn/ava.png',
		// 		tasks: {}}
		// 	// console.log(arra)

		// 	const ref = doc(firestore, 'users', `${user.user.uid}`);
		// 	await setDoc(ref, arra)
		// 	const tasksRef = doc(firestore, "tasks", `${user.user.uid}`)
		// 	await setDoc(tasksRef, [])
		// })
		// }catch(error){
		// 	// console.log(error.message)
		// 	setError(error.message)
		// }
		
		// setUserData({email:'',
		// password:'',
		// login:''})
	}
	return (
		<div className={cl.container}>
			<div className={cl.signup}>
			<div className={cl.title}>
				{/* <img src={require('../../images/icon.png')}></img> */}
				<div className=''>{lang?'Sign up for sneakers':'Зарегистрироваться'}</div>
			
			</div>
			<form  style={{display:'flex', textAlign:'center', flexDirection:'column', height:'auto', marginTop:'3px', justifyContent:'space-between'}}>
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, login: e.target.value}})} label={lang?'Name':'Имя'}  type='text'></MyInput>
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, age: e.target.value}})} label={lang?'Age':'Возраст'}  type='text'></MyInput>
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, email: e.target.value}})} label={lang?'Email':"Почта"}  type='text'></MyInput>
				<MyInput visible={true} onChange={(e)=>setUserData(prev=>{return {...prev, password: e.target.value}})} label={lang?'Password':'Пароль'} type='password'	></MyInput>
				<button onClick={(e)=>{e.preventDefault(); handleSignUp()}} className={cl.btn}>{lang?'Sign Up':'Зарегистрироваться'}</button>
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
  