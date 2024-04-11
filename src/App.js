import React from 'react'
import { Web3ModalProvider } from './providers/web3modal';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StakingUI2 from './pages/StakingUI2';

const App = () => {
  return (
    <Web3ModalProvider>
      <div className=''>
        <StakingUI2 />
        <ToastContainer position="bottom-left" theme="colored" />
      </div>
    </Web3ModalProvider>
  )
}

export default App
