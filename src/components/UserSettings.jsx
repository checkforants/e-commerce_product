import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/actions';
// import { removeUser } from '../redux/slices/userSlice.js';

const UserSettings = () => {
	const dispatch = useDispatch() 
	// 
	return (
		<div className='w-auto top-10 border-box h-auto bg-white absolute z-3 right-0 rounded-md  flex flex-col space-y-3 py-3 shadow-[0_0px_60px_-5px_rgba(0,0,0,0.3)]'>
			<div className='px-5 w-full'>
				<div onClick={()=>dispatch(removeUser())} className='px-10 border-b-2 inline-block w-auto py-3 cursor-pointer'>Sign Out</div>
				<div className='px-11 py-3 cursor-pointer'>Settings</div>

			</div>

		</div>
	);
};

export default UserSettings;