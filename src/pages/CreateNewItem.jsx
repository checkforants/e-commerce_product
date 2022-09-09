import React, { useState } from 'react';
// import {sendPhotos, useSendingPhotos } from '../methods/sendPhotos.js';
import { onSubmit } from '../methods/sendItem';
import { useDispatch, connect } from 'react-redux';
import { addItem } from '../redux/actions';
import itemsArr from '../items';
import { IProduct } from '../models';
import { useFirestore } from 'react-redux-firebase'
import { doc, setDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { db } from '../redux/firebase.js';
import { collection } from 'firebase/firestore';
import Modal from './../components/Modal';

import $ from 'jquery'; 
import Loader from '../components/UI/loader/Loader';
import {storage} from '../redux/firebase'
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import MySelect from './../components/UI/MySelect/MySelect';
const CreateNewItem = (props) => {
	// function sendPhotos(file){	
	// 	let phArr = []
	// 	const fileListAsArray = Array.from(file.files)
	// 	console.log(fileListAsArray);
	// 	fileListAsArray.map((elem, el)=>{
	// 		var form = new FormData();
	// 		if (el!=='length'&&el!=='item'){
	// 			form.append("image", file.files[el])
	// 			var settings = {
	// 			"url": "https://api.imgbb.com/1/upload?key=ba4ca409ca2b7f81870f232a23f73b79",
	// 			"method": "POST",
	// 			"timeout": 0,
	// 			"processData": false,
	// 			"mimeType": "multipart/form-data",
	// 			"contentType": false,
	// 			"data": form
	// 			};
				
	// 			$.ajax(settings).done(function (response) {
	// 				var jx = JSON.parse(response);
	// 				phArr.push(jx.data.url)
	// 				console.log(response);
	// 				console.log(phArr.length==fileListAsArray.length);
	// 				if (phArr.length==fileListAsArray.length){
	// 					setLoader(false)
	// 					console.log('pharr', phArr);
	// 					setNewItem(prev=>
	// 						{return {...prev, photos:phArr}
	// 						})
	// 					return phArr

	// 				}
	// 			})
	// 		}
	// 	})
	// };

	const [chosenPhotos, setChosenPhotos] =  useState([]);
	const [ready, setReady] =  useState(false);

	const [loader, setLoader] = useState(false);
	const [newItem, setNewItem] = useState({
		pid:'',
		company: '',
		collection:'',
		name:'',
		description:'',
		price:0,
		discount:0,
		sex:'',
		amount:0,
		photos:[]
	})
	const onSubmit = async (e) =>{
		
		e.preventDefault()
		setLoader(true)
		const docRef=(doc(collection(db, "items")))
		const fileListAsArray = Array.from(chosenPhotos.files)
		console.log(fileListAsArray);
		const photosURLs = []
		let counter = 0
		const metadata = {
			contentType: 'image/jpeg'
		  };
		for (let elem in fileListAsArray){
			console.log(elem);
			const storageRef = ref(storage, `${docRef.id}/${chosenPhotos.files[elem].name}`);
			const uploadTask = uploadBytesResumable(storageRef, chosenPhotos.files[elem], metadata);
			
			uploadTask.on('state_changed',
				(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					
					// console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
						console.log('Upload is paused');
						break;
						case 'running':
						console.log('Upload is running');
						break;
					}
					}, 
				(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case 'storage/unauthorized':
					// User doesn't have permission to access the object
					break;
					case 'storage/canceled':
					// User canceled the upload
					break;
			
					// ...
			
					case 'storage/unknown':
					// Unknown error occurred, inspect error.serverResponse
					break;
				}
			}, 
			
			() => {
			  // Upload completed successfully, now we can get the download URL
			  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				photosURLs.push(downloadURL)
				counter+=1
				console.log(photosURLs, elem, fileListAsArray.length);
				if (counter == fileListAsArray.length){
					const res = {...newItem, pid:docRef.id, photos: [...photosURLs]}
					console.log(res);
					dispatch(addItem(res));
					setLoader(false)
					setDoc(docRef, res)
				}
			  });
			}
		  );
	}

	}
	const onChange = (e, number=false)=>{

		console.log(e.target.value);
		console.log(newItem);
		if (number){
			setNewItem(prev=>{return({...prev, [e.target.name]:+e.target.value})})
		}else
			setNewItem(prev=>{return({...prev, [e.target.name]:e.target.value})})
	} 
	const dispatch = useDispatch()
	const it = itemsArr[0]


	return (
		<div className='relative h-5/6 mt-[20px] flex flex-col items-center justify-center '>
			<form className='flex flex-col justify-between h-full md:h-[400px] w-full'>
				{/* {loader&& <Modal>{<Loader></Loader>}</Modal>} */}
				<input type="text" placeholder='company' name='company'  onChange={(e)=>{onChange(e)}}/>
				<input type="text" placeholder='collection' name='collection' onChange={(e)=>{onChange(e)}}/>
				<input type="text" 	placeholder='name' name='name' onChange={(e)=>{onChange(e)}}/>
				<div className='grid grid-rows-2 gap-2 grid-cols-2 md:flex md:flex-row md:space-x-5 w-full'>
					<input type="text" placeholder='price' name='price' onChange={(e)=>{onChange(e, true)}}/>
					<input type="text" placeholder='discount' name='discount' onChange={(e)=>{onChange(e, true)}}/>
					<select type="text" placeholder='sex'  name='sex' onChange={(e)=>{onChange(e)}}>
						<option selected disabled>sex</option>
						<option>male</option>
						<option>female</option>
						<option>uni</option>
					</select>
					<input type="text" placeholder='amount' name='amount' onChange={(e)=>{onChange(e, true)}}/>
				</div>
				<textarea className='h-[70px] md:h-[70px] overflow-hidden'  placeholder='description' name='description' onChange={(e)=>{onChange(e)}}/>
				<div className='mt-2 md:mt-5 flex flex-row justify-between w-full h-[60px]'>
			
							<input name='photos' className='hidden ' type="file" multiple id="input_img"
								onChange={(e)=>{setChosenPhotos(e.target)}}
								accept="image/*">
							</input>
							<label htmlFor="input_img" className='text-sm md:text-base px-[5px] md:px-12 flex justify-center items-center bg-gray-400 text-black
									hover:shadow-xl hover:bg-gray-200 rounded-md relative box-border w-auto px-[30px]] left-0 top-0 space-x-2'>
									<div>Загрузить фотографии</div>
									<img src={require("../images/atta.png")} alt="Выбрать файл" width="25"></img>
							</label>
					{loader&&<Loader/>}
					<button  disabled={loader} onClick={(e)=>onSubmit(e)} className='text-sm md:text-base items-center justify-center text-white rounded-md bg-orange-600 px-[5px] md:px-7 py-[2px]
								hover:shadow-xl hover:bg-orange-300 hover:shadow-orange-100'>Создать страничку товара</button>
				</div>
			</form>
		</div>
	);
};

function mapStateToProps(state) {

	return {
		items: state.items
	};
  }
export default connect(mapStateToProps)(CreateNewItem);