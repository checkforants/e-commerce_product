import React, { ReactNode } from 'react';
interface IModalProps{
	children: React.ReactNode
}
const Modal = ({children}:IModalProps) => {

	return (
		<div className='modal bg-black/30 top-0 right-0 left-0 bottom-0 fixed flex  content-center items-center justify-center z-50'>
				{children}
		</div>
	);
};

export default Modal;