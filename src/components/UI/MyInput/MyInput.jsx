import React, {useState} from 'react';
import cl from './MyInput.module.scss'
const MyInput = ({visible, label, ...props}) => {
	
	const [clicked, setClicked] = useState(true);
	const [value, setValue] = useState('');
	const rootClasses = [cl.myinput]
	if (clicked){
		rootClasses.push(cl.clicked)
	}
	return (
		<div className={rootClasses.join(' ')}>
			<label htmlFor={cl.idd}>{label}</label>
			<input {...props} id = {cl.idd} onFocus={(e)=>setClicked(true)} onBlur={(e)=>{if(!e.target.value){setClicked(false)}}}>
			</input>
		</div>
	);
};

export default MyInput;