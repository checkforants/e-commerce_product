import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import  {removeItemFromCart} from '../redux/slices/userSlice';
import { db } from '../redux/firebase';

const CartItem = (props:any) => {

	const dispatch=useDispatch()
	let newArr = props.items.filter((item:any)=>item.pid==props.pid);

	async function removeItem (){		
		dispatch(removeItemFromCart({pid:props.pid}));
		const res = props.cart.filter((el:any)=>el.pid!=props.pid)
		console.log(res);
		console.log(props.user);
		
		const ref = doc(db, 'users', props.user.id);
		await updateDoc(ref, {
			cart: res
		});
	}

	return (
		<div className='flex'>
			<Link to={`/item/${newArr?.[0]?.pid}`} className='w-[93%] mb-2 h-auto flex tracking-wide'>

				<img className='w-[23%] rounded mr-2' src={newArr?.[0]?.photos?.[0]} alt="pizda" />
				<div className='self-center w-[77%]'>
					<div className='mb-1'>{newArr?.[0]?.name.length>20?newArr?.[0]?.name.slice(0,20)+'...':newArr?.[0]?.name}</div>
					<span className='mr-2'>{'$'+newArr?.[0]?.price*(1-newArr?.[0]?.discount/100)+'x'+props.amount}</span>
					<span className='font-bold text-lg'>${(newArr?.[0]?.price*(1-newArr?.[0]?.discount/100 )*props.amount).toFixed(2)}</span>
				</div>
			</Link>
			<div  onClick={()=>removeItem()} className='self-center p-4' >
				<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fillRule="nonzero" xlinkHref="#a"/></svg>
			</div>
		</div>

		// props.ca<rt?.map((item:any)=><img src={props.items.filter((el:any)=>el.pid == item.pid).photos}></img>)
	);
};
function mapStateToProps(state:any) {

	return {
		cart:  state.user.cart,
		items: state.items,
		user: state.user
	};
  }
export default connect(mapStateToProps)(CartItem);
