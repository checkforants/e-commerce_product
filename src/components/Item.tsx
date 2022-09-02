import React from 'react';
import { Link } from 'react-router-dom';
interface IData{
	info:{
		pid:number,
		company: string,
		collection:string,
		name:string,
		description:string,
		price:number,
		discount:number,
		sex:string,
		amount:number,
		photos:string[]
	}
}
const Item = ({info}:IData) => {
	// console.log(info);
	
	return (
			<Link to={`/item/${info.pid}`} className='flex flex-row justify-between border-b-2 py-2 basis-1/3 shrink-0'>
				<div className='flex justify-center items-center w-2/12 '>
					<img src={info.photos?.[0]} alt="" className='object-contain rounded-md'/> 
				</div>
				<div className='flex flex-col justify-around basis-7/12'>
					<div className='text-xl font-bold'>{info.name}</div>
					<div>{info.description}</div>
				</div>
				<div className='flex flex-col items-center justify-center space-y-1 basis = 2/12'>
					<div className='flex items-center justify-start space-x-4 basis-5/12'>
						<div className='text-gray-400 text-lg font-bold line-through'>
							${info.price.toFixed(2)}
						</div>
						<div className='text-orange-600 text-md rounded font-bold bg-orange-200 text-xs py-[2px] px-[5px]'>
							{info.discount}%
						</div>
					</div>
					<div className=" text-3xl font-bold basis-6/12">
						${(info.price*(1-info.discount/100)).toFixed(2)}
					</div>
				</div>

			</Link>

	);
};

export default Item;