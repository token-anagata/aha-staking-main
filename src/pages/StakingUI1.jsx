import React, { useState } from 'react'
import FlipTimer from '../components/UI1Components/FlipTimer';
import Header from '../components/UI1Components/Header.jsx';
import SideBar from '../components/UI1Components/SideBar';

const StakingUI1 = () => {

  const [openMenu, setOpenMenu] = useState(false)


  return (
    <div className='flex fixed w-screen h-screen overflow-hidden'>
      <SideBar openMenu={openMenu} />

      <div className={`relative ${openMenu ? 'left-6' : 'left-0'} w-full h-screen overflow-auto py-2 px-1 sm:px-5 transition-all duration-500`}>
        <Header setOpenMenu={setOpenMenu} openMenu={openMenu} />

        <section className={`px-4 mx-auto mt-10 mb-20 max-w-4xl`}>
          <FlipTimer endTime={'1655593103'} />

          <section className="grid grid-cols-2 gap-x-24 gap-y-6">
            <div className="col-span-2 sm:col-span-1 bg-aha-green-dark p-2 rounded-xl">
              <figure className="bg-gray-200 bg-opacity-20 rounded-md p-2 pt-8 space-y-4">
                <div className="bg-gray-100 flex justify-between items-center py-1 pr-1 sm:w-5/6 mx-auto rounded">
                  <input type="number" name='buyAmount' className="outline-none rounded p-1.5 text-sm bg-gray-100 text-black w-2/3" value={''} min={0} placeholder="Amount" />

                  <button className={`btn py-1 w-1/3`} onClick={(e) => {
                    e.preventDefault();
                  }}> Approve </button>
                </div>

                <div className="flex justify-between items-center text-sm px-4 sm:px-14 font-semibold text-aha-green-lighter">
                  <span className="cursor-pointer underline">Max</span>
                  <span className="cursor-pointer underline">50%</span>
                  <span className="cursor-pointer underline">30%</span>
                </div>
                <div className="text-white text-right font-medium text-sm">
                  <span className="font-semibold"> Balance: </span>
                  AHA 30,000,000
                </div>
              </figure>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-aha-green-dark p-2 rounded-xl">
              <figure className="bg-gray-200 bg-opacity-20 rounded-md place-items-center grid h-40 sm:h-full">
                <div className="text-center text-white font-medium space-y-4">
                  <p className="font-bold"> Forgot to unstake? Unstake here! </p>

                  <button className={`btn rounded-md py-2 px-8`} onClick={(e) => {
                    e.preventDefault();
                  }}> Unstake </button>
                </div>
              </figure>
            </div>
          </section>

          <section className="mt-8 bg-aha-green-light text-center text-white p-2 rounded-xl">
            <section className="bg-gray-200 bg-opacity-20 rounded-md px-2 py-4">
              <div className="text-xl font-medium space-y-6">
                <div className="">
                  <h5 className="font-black"> Claimable Pool(s): </h5>
                  <h5 className="font-bold"> $ 10,000 </h5>
                  <h5 className="font-medium text-base"> 90,000,000 AHA </h5>
                </div>

                <div className="bg-gray-100 flex justify-between items-center py-1 pr-1 sm:max-w-xs mx-auto rounded text-base">
                  <input type="number" name='buyAmount' className="outline-none rounded p-1.5 text-sm bg-gray-100 text-black w-2/3" value={''} min={0} placeholder="Amount" />

                  <button className={`btn py-1 w-1/3`} onClick={(e) => {
                    e.preventDefault();
                  }}> CLAIM </button>
                </div>
              </div>
            </section>

            <section className="font-black sm:w-2/5 mx-auto text-justify my-3">
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  Amount Staked:
                </div>
                <div className="col-span-1 text-right">
                  90,000,000 AHA
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  APY:
                </div>
                <div className="col-span-1 text-right">
                  55% p.a
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  Current Reward:
                </div>
                <div className="col-span-1 text-right">
                  85,000 AHA
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  )
}

export default StakingUI1