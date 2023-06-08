import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import GlobalStyles from '~/components/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
    <ToastContainer
        className="on-top"
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </GlobalStyles>
  </React.StrictMode>,
)
