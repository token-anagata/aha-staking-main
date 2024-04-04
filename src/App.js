import React from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import StakingUI2 from './pages/StakingUI2';

const App = () => {
  return (
    <div className=''>
      <StakingUI2 />

      <ToastContainer position="bottom-left" theme="colored" />
    </div>
  )
}

export default App
