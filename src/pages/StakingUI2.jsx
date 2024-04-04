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
        [unclaimedCycle, setUnclaimedCycle] = useState([]),
        [walletBalance, setWalletBalance] = useState(0.00),
        [tokenApproved, setTokenApproved] = useState(false),
        [saleActive, setSaleActive] = useState(false),
        [networkSwitched, setNetworkSwitched] = useState(false)
  




  const fetchWalletAndContractInfo = () => {
    getConnectedWalletAddress().then(connectedWallet => {
      if (typeof connectedWallet !== 'boolean') {
        checkWalletChainAndSwitch().then(switched => {
          setNetworkSwitched(switched);
          if (switched === true) {
            getConnectedWalletBalance().then(balance => setWalletBalance(balance) );
            isTokenApproved().then(isApproved => setTokenApproved(isApproved) );
            getUserStakingInfo(connectedWallet).then(StakingInfo => {
              setStakedAmount(StakingInfo.amountStaked)
            })

            getEventStakeInfo().then(stakingInfo => {
              setCycleAPR(stakingInfo.eventAPR);
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



  useEffect(() => {
    checkIfMetamaskIsInstalled().then(installed => {
      if (installed === true) {
        fetchWalletAndContractInfo()
      }

      return
    })
  }, [])





  return (
    <>
      <div className="sm:px-6">
        <Header />
      </div>

      <div className='grid w-full grid-cols-2 px-2 pt-8 pb-20 mx-auto gap-x-5 gap-y-10 max-w-7xl sm:px-10'>
        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-xl bg-opacity-60">
          <section className="space-y-2 font-semibold text-justify">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Amount Staked:
              </div>
              <div className="col-span-1 text-right">
                {stakedAmount.toFixed(0)} AHA
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                ROI:
              </div>
              <div className="col-span-1 text-right">
                {cycleAPR - cycleAPR === 0 ? cycleAPR.toFixed(2) : 0} %
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                Reward:
              </div>
              <div className="col-span-1 text-right">
                USDT
              </div>
            </div>
          </section>
          
          <section className="space-y-4 font-medium text-center">
            <h6 className="text-xs">
              Unstaking before end of cycle will prevent you from staking again until next cycle
            </h6>

              {
                saleActive === false ? 
                  <div className="flex items-center justify-center h-12 px-2 font-semibold sm:px-16 bg-aha-green-lighter bg-opacity-30">
                    No active cycle to stake on
                  </div>
                :
                  <div className="flex items-center justify-between h-12 px-2 font-semibold sm:px-16 bg-aha-green-lighter bg-opacity-30">
                    <div className="col-span-1"> Cycle ends in </div>
                    
                    <div className="col-span-1 text-aha-green-light flex items-center space-x-1.5">
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

          <section className="font-medium text-center">
            <p className="font-bold"> Unstake from current cycle </p>

            <button className={`btn rounded-sm py-1.5 px-6`} onClick={(e) => {
              e.preventDefault();
              unStakeFromCurrentCycle(1).then(response => {
                response === true && fetchWalletAndContractInfo()
              })
            }}> Unstake </button>
          </section>
        </section>

        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-xl bg-opacity-60">
          <section className="space-y-4">
            <p className="font-medium">
              <span className="text-sm font-semibold"> Wallet Balance: </span>
              AHA {walletBalance.toFixed(2)}
            </p>

            <div className="flex items-center justify-between w-full max-w-sm py-1 pr-1 mx-auto bg-gray-100 rounded">
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
                          fetchWalletAndContractInfo()
                        }, 15000);
                        return
                      }

                      return
                    })
                  }}> Stake </button>
              }
            </div>

            <div className="flex items-center justify-between w-full max-w-xs mx-auto text-sm font-semibold text-aha-green-light">
              <span className="underline cursor-pointer hover:no-underline" onClick={ () => {
                setAmountToStake(walletBalance.toFixed(0))
              }}>Max</span>

              <span className="underline cursor-pointer hover:no-underline" onClick={ () => {
                setAmountToStake((walletBalance * 0.5).toFixed(0))
              }}>50%</span>

              <span className="underline cursor-pointer hover:no-underline" onClick={ () => {
                setAmountToStake((walletBalance * 0.3).toFixed(0))
              }}>30%</span>
            </div>
          </section>

          <section className="flex items-center justify-between font-medium">
            <p className="font-bold"> Unstake from most recent cycle </p>

            <button className={`btn rounded-sm py-1.5 px-6 ${stakingCycles.length <= 1 && 'bg-opacity-50 pointer-events-none'}`} onClick={(e) => {
              e.preventDefault();
              unStakeFromCurrentCycle(2).then(response => {
                response === true && fetchWalletAndContractInfo()
              })
            }}> Unstake </button>
          </section>
        </section>

        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:px-4 rounded-xl bg-opacity-60">
          <div className="flex flex-col items-center sm:flex-row justify-evenly">
            <section className="font-medium">
              <h6 className="font-semibold"> Forgot to unstake from a previous cycle? We got you! </h6>
              <p className="mt-1">
                <span className="text-sm"> Unclaimed Cycle: </span>
                {
                  unclaimedCycle?.length ? unclaimedCycle.toString() : 'None'
                }
              </p>
            </section>

            <section className="flex items-center justify-between w-full max-w-sm py-1 pr-1 bg-gray-100 rounded">
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