import React, { useState, useEffect } from 'react'
import { stakingCycles } from '../ahaConfigVariables/stakingCycles';
import { calculateTimeLeft, checkIfMetamaskIsInstalled, checkWalletChainAndSwitch, getConnectedWalletAddress, getConnectedWalletBalance } from '../appCore/globalFunctions';

import {
  checkForUnstakedPastPool,
  getEventStakeInfo,
  getUserStakingInfo,
  getStakingCycleInfo,
  isTokenApproved
} from '../appCore/web3ReadFunctions';

import { approveTokenSpend, stakeToken, unStakeFromCurrentCycle } from '../appCore/web3WriteFunctions';
import Header from '../components/UI2Components/Header';

const StakingUI2 = () => {

  const [timeLeft, setTimeLeft] = useState({
          days: '00', hours: '00',
          minutes: '00', seconds: '00'
        }),
        [amountToStake, setAmountToStake] = useState(''),
        [previousCycleNumber, setPreviousCycleNumber] = useState(''),
        [stakedAmount, setStakedAmount] = useState(0),
        [cycleAPR, setCycleAPR] = useState(0),
        // [baseRate, setBaseRate] = useState(0),
        [unclaimedCycle, setUnclaimedCycle] = useState([]),
        [walletBalance, setWalletBalance] = useState(0.00),
        [tokenApproved, setTokenApproved] = useState(false),
        [saleActive, setSaleActive] = useState(false),
        [refreshPage, setRefreshPage] = useState(false),
        [networkSwitched, setNetworkSwitched] = useState(false)
  



  useEffect(() => {
    checkIfMetamaskIsInstalled().then(installed => {
      if (installed === true) {
        getConnectedWalletAddress().then(connectedWallet => {
          if (typeof connectedWallet !== 'boolean') {
            checkWalletChainAndSwitch('0x89').then(switched => {
              setNetworkSwitched(switched);
              if (switched === true) {
                console.log('Rerender Page:', refreshPage);
                getConnectedWalletBalance().then(balance => setWalletBalance(balance) );
                isTokenApproved().then(isApproved => setTokenApproved(isApproved) );
                getUserStakingInfo(connectedWallet).then(StakingInfo => {
                  setStakedAmount(StakingInfo.amountStaked)
                })

                getEventStakeInfo().then(stakingInfo => {
                  setCycleAPR(stakingInfo.eventAPR);
                  // setBaseRate(stakingInfo.allReward / stakingInfo.allStaking);
                })
                getStakingCycleInfo().then(saleInfo => {
                  setSaleActive(saleInfo.saleActive)

                  const timerID = setInterval(() => {
                    calculateTimeLeft(parseInt(saleInfo.saleEnd)).then(remainingTime => {
                      setTimeLeft({
                        days: remainingTime.days, hours: remainingTime.hours,
                        minutes: remainingTime.minutes, seconds: remainingTime.seconds,
                      })
                    })
                  }, 50);

                  return () => clearInterval(timerID);
                })
                checkForUnstakedPastPool().then(unclaimedCycleArray => setUnclaimedCycle(unclaimedCycleArray))
              }
            })
          }
        })
      }

      return
    })
  }, [refreshPage])




  return (
    <>
      <div className="sm:px-6">
        <Header />
      </div>

      <div className='grid grid-cols-2 gap-x-5 gap-y-10 w-full max-w-7xl mx-auto pb-20 pt-8 px-2 sm:px-10'>
        <section className="col-span-2 sm:col-span-1 px-2 sm:px-4 py-6 space-y-8 rounded-xl bg-gray-300 bg-opacity-60 shadow-xl">
          <section className="font-semibold space-y-2 text-justify">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Amount Staked:
              </div>
              <div className="col-span-1 text-right">
                {stakedAmount.toFixed(0)} <sup className="">GATA</sup>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                ROI:
              </div>
              <div className="col-span-1 text-right">
                {cycleAPR - cycleAPR === 0 ? cycleAPR.toFixed(2) : 0}%
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Reward:
              </div>
              <div className="col-span-1 text-right">
                {/* {userReward - userReward === 0 ? userReward.toFixed(2) : 0}
                <sup className="ml-0.5">RBN</sup> */}
                USDC
              </div>
            </div>
          </section>
          
          <section className="font-medium text-center space-y-4">
            <h6 className="text-xs">
              Unstaking before end of cycle will prevent you from staking again until next cycle
            </h6>

              {
                saleActive === false ? 
                  <div className="flex items-center justify-center px-2 sm:px-16 font-semibold bg-aha-green-lighter bg-opacity-30 h-12">
                    No active cycle to stake on
                  </div>
                :
                  <div className="flex items-center justify-between px-2 sm:px-16 font-semibold bg-aha-green-lighter bg-opacity-30 h-12">
                    <div className="col-span-1"> Cycle ends in </div>
                    
                    <div className="col-span-1 text-aha-green-light flex items-center space-x-1.5">
                      {/* <i class="fa-solid fa-stopwatch text-2xl"></i> */}
                      <i class='bx text-3xl bx-stopwatch'></i>

                      <figure className="flex items-center justify-evenly gap-0.5">
                        <div className="flex items-center gap-0.5">
                          <label className="text-2xl"> {timeLeft.days} </label>
                          :
                        </div>
                        <div className="flex items-center gap-0.5">
                          <label className="text-2xl"> {timeLeft.hours} </label>
                          :
                        </div>
                        <div className="flex items-center gap-0.5">
                          <label className="text-2xl"> {timeLeft.minutes} </label>
                          :
                        </div>
                        <div className="flex items-center gap-0.5">
                          <label className="text-2xl"> {timeLeft.seconds} </label>
                        </div>
                      </figure>
                    </div>
                  </div>
              }
          </section>

          <section className="text-center font-medium">
            <p className="font-bold"> Unstake from current cycle </p>

            <button className={`btn rounded-sm py-1.5 px-6`} onClick={(e) => {
              e.preventDefault();
              unStakeFromCurrentCycle(1).then(response => {
                response === true && setRefreshPage(!refreshPage)
              })
            }}> Unstake </button>
          </section>
        </section>

        <section className="col-span-2 sm:col-span-1 px-2 sm:px-4 py-6 space-y-8 rounded-xl bg-gray-300 bg-opacity-60 shadow-xl">
          <section className="space-y-4">
            <p className="font-medium">
              <span className="font-semibold text-sm"> Wallet Balance: </span>
              GATA {walletBalance.toFixed(2)}
            </p>

            <div className="bg-gray-100 flex justify-between items-center py-1 pr-1 rounded w-full max-w-sm mx-auto">
              <input type="number" name='buyAmount' className="outline-none rounded p-1.5 bg-gray-100 text-black w-2/3 placeholder:text-gray-500" min={0} placeholder="Amount" value={amountToStake} onChange={(e) => {
                if (e.target.value > -1 || e.target.value === "") {
                  setAmountToStake(e.target.value)
                }
              }} />

              {
                tokenApproved === false ?
                  <button className={`btn py-1 w-1/3 text-base ${!networkSwitched && 'bg-opacity-50 pointer-events-none'}`} onClick={(e) => {
                    e.preventDefault();
                    approveTokenSpend().then(approved => {
                      if (approved === true) { setTokenApproved(true) }

                      return
                    })
                  }}> Approve </button>
                :
                  <button className={`btn py-1 w-1/3 text-base ${!saleActive && 'bg-opacity-50 pointer-events-none'}`} onClick={(e) => {
                    e.preventDefault();
                    stakeToken(amountToStake).then(staked => {
                      if (staked === true) {
                        setAmountToStake('')
                        setWalletBalance(walletBalance - amountToStake)
                        setStakedAmount(parseFloat(stakedAmount) + parseFloat(amountToStake))
                        setTimeout(() => {
                          setRefreshPage(!refreshPage)
                        }, 15000);
                        return
                      }

                      return
                    })
                  }}> Stake </button>
              }
            </div>

            <div className="flex justify-between items-center font-semibold text-sm text-aha-green-light w-full max-w-xs mx-auto">
              <span className="cursor-pointer underline hover:no-underline" onClick={ () => {
                setAmountToStake(walletBalance.toFixed(0))
              }}>Max</span>

              <span className="cursor-pointer underline hover:no-underline" onClick={ () => {
                setAmountToStake((walletBalance * 0.5).toFixed(0))
              }}>50%</span>

              <span className="cursor-pointer underline hover:no-underline" onClick={ () => {
                setAmountToStake((walletBalance * 0.3).toFixed(0))
              }}>30%</span>
            </div>
          </section>

          {/* <section className="">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Pool Number:
              </div>
              <div className="col-span-1 text-right">
                {stakingCycles.length}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Base Rate:
              </div>
              <div className="col-span-1 text-right">
                {baseRate - baseRate === 0 ? baseRate.toFixed(4) : 0}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Reward:
              </div>
              <div className="col-span-1 text-right">
                USDC
              </div>
            </div>
          </section> */}

          <section className="flex justify-between items-center font-medium">
            <p className="font-bold"> Unstake from most recent cycle </p>

            <button className={`btn rounded-sm py-1.5 px-6 ${stakingCycles.length <= 1 && 'bg-opacity-50 pointer-events-none'}`} onClick={(e) => {
              e.preventDefault();
              unStakeFromCurrentCycle(2).then(response => {
                response === true && setRefreshPage(!refreshPage)
              })
            }}> Unstake </button>
          </section>
        </section>

        <section className="col-span-2 px-2 sm:px-4 py-6 space-y-8 rounded-xl bg-gray-300 bg-opacity-60 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-evenly">
            <section className="font-medium">
              <h6 className="font-semibold"> Forgot to unstake from a previous cycle? We got you! </h6>
              <p className="mt-1">
                <span className="text-sm"> Unclaimed Cycle: </span>
                {
                  unclaimedCycle?.length ? unclaimedCycle.toString() : 'None'
                }
              </p>
            </section>

            <section className="bg-gray-100 flex justify-between items-center py-1 pr-1 rounded w-full max-w-sm">
              <input type="number" name='buyAmount' className="outline-none rounded p-1.5 bg-gray-100 text-black w-2/3 placeholder:text-gray-500" min={0} placeholder="Cycle Number" value={previousCycleNumber} onChange={ (event) => {
                if (event.target.value > -1 || event.target.value === "") {
                  setPreviousCycleNumber(event.target.value)
                }
              } } />

              <button className={`btn py-1 w-1/3 ${!unclaimedCycle?.length && 'bg-opacity-50 pointer-events-none'}`} onClick={(e) => {
                e.preventDefault()
                unStakeFromCurrentCycle(previousCycleNumber).then(response => {
                  response === true && setPreviousCycleNumber('')
                })
              }}> Claim </button>
            </section>
          </div>
        </section>
      </div>
    </>
  )
}

export default StakingUI2