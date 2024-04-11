import React from 'react'

const SideBar = ({ openMenu }) => {


  return (
    <div className={`${openMenu ? 'w-4/5 sm:w-1/5' : 'sm:w-11 w-11'} min-h-screen bg-aha-green-dark text-white rounded-r-2xl pb-2 transition-all duration-500`}>

      <section className={`flex flex-col h-full`}>
        <div className="bg-white bg-opacity-60">
          <a href="/" className="w-full flex items-center justify-center">
            <img src="./aha_logo.png" alt="Robinos Logo" className="h-20 py-2" />
          </a>
        </div>

        <div className="flex-grow flex items-center">
          <div className="grid font-medium w-full">
            <div class="py-2 pl-3">
              <a href="/" title='Dashboard' className="flex items-center gap-3 py-1">
                <i className="fas fa-layer-group text-xl"></i>
                Dashboard
              </a>
            </div>
            <div class="py-2 pl-3">
              <a href="/" title='Staking' className="flex items-center gap-3 py-1">
                <i class="fas fa-database text-xl"></i>
                Staking
              </a>
            </div>
            <div class="py-2 pl-3">
              <a href="/" title='Pools' className="flex items-center gap-3 py-1">
                <i class="fas fa-water-ladder text-xl"></i>
                Pools
              </a>
            </div>
            <div class="py-2 pl-3">
              <a href="/" title='Validators' className="flex items-center gap-3 py-1">
                <i class="fas fa-user-shield text-xl"></i>
                Validators
              </a>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:block flex-shrink text-center">
          &copy; Anagata
        </div> */}
      </section>
    </div>
  )
}

export default SideBar