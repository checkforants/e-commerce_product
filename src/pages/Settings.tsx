import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../redux/firebase';
import { collection, doc } from 'firebase/firestore';
import { connect } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';

const Settings = (props:any) => {
	console.log(props.user);
	const [loader, setLoader] = useState(false)
	const auth = getAuth();
	console.log(auth.currentUser);
	
	function loadPhoto(file:any){
		setLoader(true)
		const docRef=(doc(collection(db, "items")))
		let photoURL
		let elem = file.files[0]
		const metadata = {
			contentType: 'image/jpeg'
		};
		const storageRef = ref(storage, `user:${props.user.id}/ava`);
		const uploadTask = uploadBytesResumable(storageRef, elem, metadata);
		
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
			photoURL = downloadURL
			
			let user = auth.currentUser
			updateUserProfile((user), {photoURL})
			setLoader(false)
		  });
		}
	  );
	   
	}
	async function  updateUserProfile(user: any, data: any) {
		updateProfile((user), {
			...data
		})
	  }
	return (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='w-8/12 h-6/12 bg-orange-200 flex flex-row rounded shadow-3xl shadow-orange-200'>
				<div className='basis-4/12   m-10'>
					<img className='rounded object-contain mb-4' src="https://firebasestorage.googleapis.com/v0/b/sneakers-36077.appspot.com/o/defaultAva.png?alt=media&token=f2186fcb-adc6-416a-9def-3791d94764ae" alt="" />
					<input onChange={(e)=>{loadPhoto(e.target)}} name='photos' className='hidden ' type="file" id="input_img" accept="image/*"></input>
					<label htmlFor="input_img" className='text-sm md:text-base px-[5px] md:px-12 flex justify-center items-center bg-gray-400 text-black
							hover:shadow-xl hover:bg-gray-200 rounded-md relative box-border w-auto px-[30px]] left-0 top-0 space-x-2'>
							<div>Изменить фотографию</div>
							<img src={require("../images/atta.png")} alt="Выбрать файл" width="25"></img>
					</label>
				</div>
				<div>
					<div>mail</div>
					<div>change password</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};
function mapStateToProps(state:any) {
	return{
		user:state.user
	}
	
}

export default connect(mapStateToProps)(Settings);