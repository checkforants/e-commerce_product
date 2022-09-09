import React from 'react';
import { connect } from 'react-redux';

const CartItem = (props:any) => {
	console.log(props.pid);
	
	console.log(props.cart);
	console.log(props.items);

	let newArr = props.items.filter((item:any)=>item.pid==props.pid);
	console.log();
		

	return (
		<div className='w-full mb-2 flex tracking-wide'>
			<img className='w-[23%] rounded mr-3' src={newArr[0].photos[0]} alt="pizda" />
			<div className='self-center mr-3'>
				<div className='mb-2'>{newArr[0].name.length>22?newArr[0].name.slice(0,22)+'...':newArr[0].name}</div>
				<span className='mr-3'>{'$'+newArr[0].price+'x'+props.amount}</span>
				<span className='font-bold text-xl'>${newArr[0].price*props.amount}</span>
			</div>
			<div className='self-center'>
				<svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlinkHref="#a"/></svg>
			</div>
		</div>
		// props.cart?.map((item:any)=><img src={props.items.filter((el:any)=>el.pid == item.pid).photos}></img>)
	);
};
function mapStateToProps(state:any) {

	return {
		cart:  state.currentUser.cart,
		items: state.items,
		currentUser: state.currentUser,
	};
  }
export default connect(mapStateToProps)(CartItem);
