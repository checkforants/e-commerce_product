import React from 'react';

const About = () => {
	return (
		<div className='h-full'>
			<div className="w-full h-full m-auto flex flex-col md:flex-row justify-center items-center space-x-2 text-3xl border-b-4 md:border-orange-300">
				<div>Challenge by </div>
				<a className='aboutA'href="https://www.frontendmentor.io?ref=challenge" target="_blank">{" "}Frontend Mentor</a>
				<div>Coded by</div> 
				<a className='aboutA' target='_blank' href="https://github.com/checkforants">{" "} CFA</a>
			</div>
		</div>
	);
};

export default About;