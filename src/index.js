import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from "./Auth";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const auth = ReactDOM.createRoot(document.getElementById('auth'));

auth.render(
    <React.StrictMode>
      <Auth />
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
