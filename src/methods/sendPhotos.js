import $ from 'jquery'; 
import {useState} from 'react'

export function sendPhotos(file){
	let phArr = []
	const fileListAsArray = Array.from(file.files)
	console.log(fileListAsArray);
	fileListAsArray.map((elem, el)=>{
		var form = new FormData();
		if (el!=='length'&&el!=='item'){
			form.append("image", file.files[el])
			var settings = {
			"url": "https://api.imgbb.com/1/upload?key=ba4ca409ca2b7f81870f232a23f73b79",
			"method": "POST",
			"timeout": 0,
			"processData": false,
			"mimeType": "multipart/form-data",
			"contentType": false,
			"data": form
			};
			
			$.ajax(settings).done(function (response) {
			  console.log(response);
				var jx = JSON.parse(response);
				phArr.push(jx.data.url)
				console.log(response);
				if (phArr.length===fileListAsArray.length)
					return phArr
			})
		}
	})
};



