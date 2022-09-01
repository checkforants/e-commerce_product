import React from 'react';
import Thumbnail from './Thumbnail';

const PhotoGallery = () => {
	const photosArr = ["image-product-1.jpg", "image-product-2.jpg",
	"image-product-3.jpg","image-product-4.jpg"]
	return (
		<div className='box-border w-4/12 h-4/12 relative flex flex-col space-y-8 '>
			<img className="rounded-md object-cover" src={require("../images/image-product-1.jpg")} alt="img"/>
			<div className='box-border flex justify-between'>
				{photosArr.map((photo, index)=>
					<img className='relative basis-1/5 rounded-xl' 
					src={require(`../images/${photo}`)} alt="" />
					)}
			</div>
		</div>
	);
};

export default PhotoGallery;