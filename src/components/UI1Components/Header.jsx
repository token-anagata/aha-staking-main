import React, { useState, useEffect } from 'react';


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




const Header = ({ openMenu, setOpenMenu }) => {
  
  const [hashedWallet, setHashedWallet] = useState('Connect your wallet')
        // [themeMode, setThemeMode] = useState(JSON.parse(localStorage.getItem("ahaThemeMode")) || 'light'),


  useEffect(() => {
    setModeThemeOnStartUp();
    setHashedWallet('Connect your wallet')
  }, [])


  return (
    <section className={`w-full bg-transparent pt-5 pb-3 px-3 sm:px-0 flex justify-between items-center`}>
      <div className="flex items-center justify-end text-2xl">
        <i className={`fas ${openMenu ? 'fa-close hover:text-red-600 text-3xl' : 'fa-bars-staggered'} cursor-pointer mr-2`} onClick={ ()=> {
          setOpenMenu(!openMenu)
        }}></i>
      </div>

      <a href="/" className="hidden sm:block">
        <img src="./aha_logo.png" alt="Robinos Logo" className="h-16 py-2 -mt-5 -mb-1 sm:-my-10" />
      </a>

      <button className="border-2 border-aha-green-dark dark:border-aha-green-lighter px-2 sm:py-1 rounded-xl text-sm">
        <span className="flex items-center space-x-2">
          <span>{hashedWallet}</span>
          <i className="fas fa-wallet"></i>
        </span>
      </button>
    </section>
  )
}

export default Header