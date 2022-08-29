import React from 'react'
import ReactDOM, { Root } from 'react-dom/client'
import { App } from './App'
import './index.css'

let root: Root | undefined = undefined;

function Bootstrap() {
	const isDev = import.meta.env.DEV;
	return (isDev
		? (<App />)
		: (<React.StrictMode>
			<App />
		</React.StrictMode>))
}

document.addEventListener('DOMContentLoaded', () => {
	if (!root) {
		root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
		root.render(
			<Bootstrap />
		);
	}
})

