import { render } from 'inferno';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
