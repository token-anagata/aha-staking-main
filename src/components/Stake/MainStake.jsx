import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getEventData, getEventReward, getUserRewardStaked } from "../../utils/wagmi/readContract"
import { unStake } from "../../utils/wagmi/writeContract"
import { formattedAmountToAha } from "../../utils/number"
import classNames from "classnames"
import SpinIcon from "../../assets/svg/SpinIcon"
import { calculateRemainingTime } from "../../utils/date"

const MainStake = ({ address, isDisconnected, saleOn, saleActive, hasUnstaked, stakedAmount }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00',
        minutes: '00', seconds: '00'
    })
    const [currentReward, setCurrentReward] = useState(false)
    const [loadingButton, setLoadingButton] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            //const currentRewardStaked = await getUserRewardStaked(address);
            const eventData = await getEventData(address)
            const eventReward = await getEventReward(address)

            if (eventData.length > 0) {
                //const reward = currentRewardStaked / stakedAmount * 100;
                const roi = (eventData[0] / eventData[1]) * eventReward
                setCurrentReward(formattedAmountToAha(roi));
            }

            setLoadingButton(false)
        }
        
        if(address){   
            fetchData()
        }else{
            setLoadingButton(false)
            setCurrentReward(0)
        }
    }, [address, isDisconnected])

    useEffect(() => {
        // Execute timer every 1 seconds 
        const intervalId = setInterval(() => {
            const remainingTime = calculateRemainingTime(saleOn[2])

            setTimeLeft({
                days: remainingTime.days, hours: remainingTime.hours,
                minutes: remainingTime.minutes, seconds: remainingTime.seconds,
            })
        }, 1000); 

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [saleOn])

    const handleUnStake = async (e) => {
        e.preventDefault()
        try {
            // loading button
            setLoadingButton(true)
            const result = await unStake(address)

            if (result) {
                setLoadingButton(false)
                toast.success('Unstake have been successfully')
            }
        } catch (e) {
            console.log('unstake', e)
            toast.error("There was an error durring unstake, try again in moment")
        }
    }

    return (
        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-xl bg-opacity-60">
            <section className="space-y-2 font-semibold text-justify">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        Amount Staked:
                    </div>
                    <div className="col-span-1 text-right">
                        {stakedAmount} AHA
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        ROI:
                    </div>
                    <div className="col-span-1 text-right">
                        {currentReward || 0} %
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
                                <i className='bx text-3xl bx-stopwatch'></i>

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

                <button
                    className={classNames({
                        'btn inline-flex btn rounded-sm py-1.5 px-6': true,
                        'bg-opacity-50 pointer-events-none': !hasUnstaked,
                    })}
                    disabled={loadingButton}
                    onClick={handleUnStake}>
                    {loadingButton ? <><SpinIcon /> Processing</> : 'UnStake'}
                </button>
            </section>
        </section>
    )
}


export default MainStake;