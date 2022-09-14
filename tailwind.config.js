/** @type {import('tailwindcss').Config} */ 
module.exports = {
	content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		boxShadow: {
			'3xl': '0 0px 60px 10px rgba(0, 0, 0, 0.3)',
		  }
	  },
	},
	plugins: [],
  }