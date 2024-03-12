import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/normalize.css';
import './styles/main.css';
import { store } from './store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
      position='top-center'
      autoClose={1500}
      theme='colored'
      pauseOnHover={false}
    />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
