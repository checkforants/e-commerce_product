export function onSubmit(e){
	e.preventDefault();
	
	const form = document.querySelector('form')
	console.log(form);
	
	const formData = new FormData(form);
	console.log(formData);
	for(let pair of formData.entries()) {
	   console.log(pair); 
	}
}