import React from 'react'
import { Web3ModalProvider } from './providers/web3modal';
import { DarkModeProvider } from './context/DarkModeContext';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StakingUI2 from './pages/StakingUI2';
import { AccountStakedProvider } from './context/AccountStakedContext';

const App = () => {
  return (
    <DarkModeProvider>
      <AccountStakedProvider>
        <Web3ModalProvider>
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
            <StakingUI2 />
            <ToastContainer position="bottom-left" theme="colored" />
          </div>
        </Web3ModalProvider>
      </AccountStakedProvider>
    </DarkModeProvider>
  )
}

export default App
