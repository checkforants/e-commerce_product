import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


import CartItem from './CartItem';

interface ICartProps{
	pid:number,
	amount:number
}
// 
const Cart = (props:any) => {
	const dispatch = useDispatch
	console.log(props.user.email);
	console.log(props?.cart);
	
	return (
		
			<div className='w-[330px] top-10 h-[250px] right-[-60px] bg-white absolute z-3 rounded-md  flex flex-col  shadow-[0_0px_60px_-5px_rgba(0,0,0,0.3)]'>
				<div className='block px-5 w-full border-b-2 py-5 border-grey-100 basis-3/12'>Cart</div>
				{props.user.email
					?<div className=' basis-3/4 flex flex-col  px-5 py-3'>
						{props.cart && props.cart.length!==0
							?<div className='scrollElem overflow-y-auto overflow-x-hidden flex h-[110px] flex-col mb-3'>{props.cart?.map((item:ICartProps)=><CartItem key={item.pid} className='w-full basis-1/12' pid={item.pid} amount={item.amount}/>)}</div>
							:<div className='w-full basis-6/12'>Your Card</div>}
						<button className='flex basis-2/12   md:h-auto items-center justify-center text-white rounded-md bg-orange-600
								px-auto py-[7px] hover:shadow-xl hover:bg-orange-300 hover:shadow-orange-100'>
								Checkout  	

						</button>	
					</div>
					:<Link className='self-center' to={'/login'}>Вам нужно залогиниться</Link>
				}
			</div>
		
	);
};
function mapStateToProps(state:any) {
	return {
		cart: state.user.cart,
		items: state.items,
		user:state.user
		
	};
  }
export default connect(mapStateToProps)(Cart);
