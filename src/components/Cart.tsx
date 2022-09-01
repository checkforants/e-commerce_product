import React from 'react';
import { connect } from 'react-redux';

interface ICartProps{
	pid:number,
	amount:number
}
// 
const Cart = (props:any) => {
	console.log(props.cart);
	
	return (
		<div className='w-[300px] top-10 h-[200px] bg-white absolute z-3 right-0 rounded-md  flex flex-col pt-5 shadow-[0_0px_60px_-5px_rgba(0,0,0,0.3)]
		'>
			<div className='px-5 w-full border-b-2 border-grey-100 basis-1/4'>Cart</div>
			<div className='basis-3/4 flex flex-col overflow-y-scroll'>{
			props.cart.length!==0
				?props.cart.map((item:ICartProps)=><div className='w-full h-full'>{item.pid}{item.amount}</div>)
				:<div className='w-full h-full'>Your Card</div>}</div>
		</div>
	);
};
function mapStateToProps(state:any) {
	return {
		cart:  state.currentUser.cart,
	};
  }
export default connect(mapStateToProps)(Cart);
