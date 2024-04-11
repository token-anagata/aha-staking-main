import React, { useState, useEffect } from 'react';
//import { checkIfMetamaskIsInstalled, getConnectedWalletAddress } from '../../appCore/globalFunctions';
import { useAccount } from 'wagmi'

// const switchThemeMode = (setThemeMode) => {
//   if (JSON.parse(localStorage.getItem("ahaThemeMode")) === 'dark') {
//     localStorage.setItem("ahaThemeMode", JSON.stringify('light'));
//     setThemeMode('light')
//     document.documentElement.classList.remove('dark')
//     return
//   } else {
//     localStorage.setItem("ahaThemeMode", JSON.stringify('dark'));
//     setThemeMode('dark')
//     document.documentElement.classList.add('dark')
//     return
//   }
// }



const setModeThemeOnStartUp = () => {
  if (JSON.parse(localStorage.getItem("ahaThemeMode")) === 'dark' || (!('ahaThemeMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    return
  }

  document.documentElement.classList.remove('dark')
  return
}

const Header = ({ handleConnect, address }) => {
  //const [hashedWallet, setHashedWallet] = useState('Connect to wallet')
  // [themeMode, setThemeMode] = useState(JSON.parse(localStorage.getItem("ahaThemeMode")) || 'light'),


  // useEffect(() => {
  //   setModeThemeOnStartUp();

  //   checkIfMetamaskIsInstalled().then(installed => {
  //     if (installed === true) {
  //       return getConnectedWalletAddress().then(account => {
  //         console.log(account)
  //         if (typeof account !== 'boolean') {
  //           setHashedWallet(`${account.slice(0, 6)}........${account.slice(account.length - 4, account.length)}`.toLowerCase());
  //         }
  //       })
  //     }

  //     // setOpenMetamaskWarning(true)
  //     return;
  //   })
  // }, [])


  return (
    <section className={`w-full bg-transparent pt-5 pb-3 px-3 sm:px-0 flex justify-between items-center`}>

      <a href="/" className="">
        <img src="./aha_logo.png" alt="Robinos Logo" className="h-16 py-2 -mt-3 -mb-1 sm:-my-8" />
      </a>

      <button className="border-2 border-aha-green-dark dark:border-aha-green-lighter px-2 sm:py-1 rounded-xl text-sm" onClick={handleConnect} >
        <span className="flex items-center space-x-2">
          <span>{address ? `${address.slice(0, 6)}........${address.slice(address.length - 4, address.length)}`.toLowerCase() : 'Connect to wallet'}</span>
          <i className="fas fa-wallet"></i>
          {/* <i class='bx bx-xs bx-wallet'></i> */}
        </span>
      </button>
    </section>
  )
}

export default Header