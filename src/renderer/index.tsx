import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './app/App'



// ReactDOM.render(<App />, document.getElementById('root'))
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
