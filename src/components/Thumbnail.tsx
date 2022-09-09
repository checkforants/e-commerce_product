import React from 'react';
interface ThumbnailProps{
	photosArr:string[],
	chooseImg: (img:number)=>void,
	currentImg:number,
	classN?:string,
	setModal:(modal:boolean)=>void
}
const Thumbnail = ({photosArr,chooseImg, currentImg, classN, setModal}:ThumbnailProps) => {
	return (
		<div className={classN+' thumbnail flex justify-center space-x-5'}>
			{photosArr?.map((photo, index)=>{
				return(
					<div key={index} className={` relative basis-1/5 ${classN} ${(currentImg==index)?'rounded-md border-4 border-orange-400':''}`} onClick={()=>{chooseImg(index); setModal(true)}}  >
						<img className={''} src={photo} alt="" />
						<div className={(currentImg==index)?'absolute top-0 bottom-0 left-0 right-0 bg-white opacity-50 z-55':''}></div>					
					</div>
				)}
			)}
		</div>
	);
};

export default Thumbnail;