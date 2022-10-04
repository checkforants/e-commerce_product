import React, { useEffect, useState } from 'react';
import Thumbnail from '../components/Thumbnail';
import Modal from '../components/Modal';
import PhotoGallery from '../components/PhotoGallery';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import Loader from './../components/UI/loader/Loader';
import { addItemToCart } from './../redux/slices/userSlice';
import { setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../redux/firebase';



const ItemPage = (props:any) => {
	
	const [currentImg, setCurrentImg]=useState(0)  
	const [modal, setModal] = useState(false)
	const [amount, setAmount] = useState(0)
	const {pid} = useParams()
	const navigate= useNavigate()
	const dispatch = useDispatch()
	let data=[]

	

	if (pid){

		data = props.items.filter((it:any) =>it.pid==pid)[0]

	}
	const arr =	data?.photos
	

	async function AddingItemToCart(pid:any,amount:number){
		if (!props.user.cart){
			let question = window.confirm('Перейти на страницу log in?')
			if (question){
				navigate('/login')
			}
		}
		if (props.user.cart && props.user.cart.filter((it:any)=>it.pid==pid).length==0){
		
			const res = {pid, amount}
			const ref = doc(db, 'users', props.user.id);
			console.log(res, props.user.id);
			
			await updateDoc(ref, {
				cart: arrayUnion(res)
			});
			dispatch(addItemToCart( res ))
		}
		if (props.user.cart && props.user.cart.filter((it:any)=>it.pid==pid).length!=0){
			let question = window.confirm('Товар уже в корзине. Хотите изменить количество товара в корзине?')
			if (question){
				const res = props.user.cart
				const ref = doc(db, 'users', props.user.id);
				res.forEach((el:any) => {
					if(el.pid==pid){
						el.amount = amount
					}
				console.log(res);
				
				});
				await updateDoc(ref, {
					cart: res
				});
				// navigate('/login')
			}
		}
	}
	// const arr = 
	useEffect(()=>{
		// const element = document.body
		window.scrollTo(0,0)
		
	},[])
	
	return (
			<div className='py-5'>
				{modal?
				<div className='hidden md:block'>
					<Modal>
						<div className="flex flex-col space-y-8 basis-[28%] my-auto relative">
				
				
							<div onClick={()=>setModal(false)} className="absolute top-[-5px] right-[0px]">
								<svg className='orangeHoverSvg' fill='white' width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fillRule="evenodd"/></svg>
							</div>
							<button onClick={()=>setCurrentImg(prev=>(prev+1)%arr.length)} className="absolute top-[33%] right-[-20px] rounded-full bg-white w-[35px] h-[35px] flex flex-col justify-center">
								<svg className='nextprev m-auto ' stroke='black' width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg>
							</button>
							<button onClick={()=>setCurrentImg(prev=>(prev-1+arr.length)%arr.length)} className="absolute top-[33%] left-[-20px] rounded-full bg-white w-[35px] h-[35px] flex flex-col justify-center">
								<svg className='nextprev m-auto' stroke='black'width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg>
							</button>
							<div className='w-full h-full py-auto bg-white'>
								<img className="rounded-lg object-contain top-0 my-auto" src={arr[currentImg]} alt="img"/>
							</div>
							<Thumbnail setModal={setModal} classN="mx-4" currentImg={currentImg} chooseImg={setCurrentImg} photosArr={arr}></Thumbnail>
						</div>
					</Modal>
				</div>
				:''}
				<div className=' md:top-0 flex flex-col md:flex-row justify-between items-center'>
					<div className="relative flex flex-col md:basis-[40%] lg:basis-[36%] justify-center items-center">
						{/* <div className=''> */}
							<img className="md:hidden mb-8 rounded-lg top-0 w-full  md:max-h-[60vh]" src={arr?.[modal?0:currentImg]} alt="img"/>
							<img className="hidden md:block mb-8 rounded-lg top-0 w-full  md:max-h-[60vh]" src={arr?.[0]} alt="img"/>

							<button onClick={()=>setCurrentImg(prev=>(prev+1)%arr.length)} className="md:hidden absolute right-[0px]  rounded-full bg-white w-[35px] h-[35px] flex flex-col justify-center">
								<svg className='nextprev m-auto ' stroke='black' width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg>
							</button>
							<button onClick={()=>setCurrentImg(prev=>(prev-1+arr.length)%arr.length)} className=" md:hidden absolute  left-[0px] rounded-full bg-white w-[35px] h-[35px] flex flex-col justify-center">
								<svg className='nextprev m-auto' stroke='black'width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" strokeWidth="3" fill="none" fillRule="evenodd"/></svg>
							</button>
						{/* </div> */}
						<Thumbnail classN='hidden md:flex' setModal={setModal} currentImg={currentImg} chooseImg={setCurrentImg} photosArr={arr}></Thumbnail>
					</div>
					<div className='basis-[50%] flex flex-col my-10 space-y-4 justify-around'>
						<div className="text-orange-500 font-bold uppercase text-xs">
							{data?.company}
						</div>
						<div className="text-black mb-5 font-bold text-4xl">
							{data?.name}
						</div>
						<div className="text-gray-600 text-sm mb-3 font-bold">
							{data?.description}
						</div>
						<div className='flex flex-row items-center md:items-start justify-between md:justify-left md:flex-col'>
							<div className='flex items-center justify-left space-x-4 mt-3'>
								<div className=" text-4xl font-bold mb-2">
									${(data?.price*(1-data?.discount/100)).toFixed(2)}
								</div>

								<div className='text-orange-600 rounded font-bold bg-orange-200 text-xs py-[2px] px-[5px]'>
									{data?.discount}%
								</div>
							</div>
							<div className='text-gray-400 text-lg font-bold line-through'>
									${data?.price.toFixed(2)}
							</div>
				
						</div>
						<div className='flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between relative box-border h-[100px] md:h-[45px]'>
							<div className='flex flex-row justify-between basis-1/2 md:basis-4/12'>
								<div className='flex basis-10/12 md:basis-full content-center items-center py-[6px] px-3 bg-gray-200 rounded-md font-bold justify-between'>
									<button onClick={()=>setAmount(prev=>prev-1)} className="text-orange-400 mb-[2px]' text-2xl">-</button>
									<div className='pt-[2px]'>{amount}</div>
									<button onClick={()=>setAmount(prev=>prev+1)} className="text-orange-400 mb-[2px]' text-2xl">+</button>
								</div>
								<img className='md:hidden w-[45px] basis-1/12 md:basis-0 rounded-md bg-orange-600 cursor-pointer
										hover:shadow-xl hover:bg-orange-300 hover:shadow-orange-100 p-3' src={require('../images/wishHeart.png')} alt="heart" />
							</div>
							<button onClick={()=>{AddingItemToCart(pid, amount)}}
									className='flex basis-1/2 md:basis-6/12 space-x-3 h-[65px] md:h-auto items-center justify-center text-white rounded-md bg-orange-600
									px-7 py-[6px] hover:shadow-xl hover:bg-orange-300 hover:shadow-orange-100'>

									<svg className="cart mt-[3px]" width="18" viewBox="0 0 22 20" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fillRule="nonzero"/></svg>
									<div>Add to cart</div>

							</button>
							<img className='hidden md:block basis-1/12 h-full w-auto rounded-md bg-orange-600 cursor-pointer
										hover:shadow-xl hover:bg-orange-300 hover:shadow-orange-100 p-3' src={require('../images/wishHeart.png')} alt="heart" />
						</div>
					</div>
				</div>
			</div>

	);
};
function mapStateToProps(state:any) {

	return {
		items: state.items,
		user: state.user,
	};
  }
export default connect(mapStateToProps)(ItemPage);
// export default ItemPage;