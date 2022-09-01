import React, {useContext, useState} from 'react';
// import { AuthContext } from '../context';
import cl from './Login.module.scss'
import firebase from 'firebase/compat/app';
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import MyInput from './../../components/UI/MyInput/MyInput';
import { connect, useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Alert } from '@mui/material';
// import { setUser } from '../../redux/slices/userSlice';
import { setUser } from './../../redux/actions';


	
const Login = (props) => {
	// const {isAuth, setIsAuth} = useContext(AuthContext);
	const [error, setError] = useState(false);
	const [userData, setUserData] = useState(
		{email:'',
		password:''})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const lang = 'eng'
	const handleLogin=(email, password)=>{
		const auth = getAuth() 
		console.log(auth);
		signInWithEmailAndPassword(auth, email, password)
			.then(({user})=>{
				console.log(user.email, user.uid,  user.accessToken);
				dispatch(setUser({
					email:user.email,
					id:user.uid,
					token:user.accessToken,
				}))
				navigate('/')
			})
			.catch(e=>alert(e.message))
	}
	
	const [nextClicked, setNextClicked]=useState(false)
	



	// if (nextClicked){}
	return  (
		<div className={cl.container}>
			<div  className={cl.login}>
					{error?<Alert severity="warning">{error}</Alert>:''}
				<div className={cl.title}>
					{/* <img src={require('../../images/icon.png')}></img> */}
					<div className='sneakers'>{lang?'Log in to sneakers':'Зайти'}</div>
			
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
				<button onClick={(e)=>{e.preventDefault(); if(nextClicked){handleLogin(userData.email, userData.password)}else{setNextClicked(true)}}} className={cl.next}>{nextClicked?lang?'Sign In':'Зайти':lang?'Next':'Дальше'}</button>
				</form>
				<Link style={{margin:'10px auto', fontSize:'12px'}} to="/signup">{lang?"Still don't have an acc?":'До сих пор нет аккаунта?'}</Link>
			</div>
		</div>

	);
};

  export default Login;
