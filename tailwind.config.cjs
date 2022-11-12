/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{j,t}sx"
	],
	theme: {
		extend: {
			fontFamily: {
				main: 'Rubik, sans-serif'
			},
		},
	},
	plugins: [],
}
