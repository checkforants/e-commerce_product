import cl from './Loader.module.scss'


import React from 'react';

const Loader = () => {
	return (
		<div className='flex items-center justify-center'>
			<div className = {cl.lds}><div></div><div></div><div></div><div></div></div>
		</div>
	);
};

export default Loader;