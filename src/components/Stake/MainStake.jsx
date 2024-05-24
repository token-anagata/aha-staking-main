import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { unStake } from "../../utils/wagmi/writeContract"
import classNames from "classnames"
import SpinIcon from "../../assets/svg/SpinIcon"
import { calculateRemainingTime } from "../../utils/date"
import { useAccountStaked } from "../../context/AccountStakedContext"
import { formatNumber } from "../../utils/number"
import ReloadIcon from "../../assets/svg/ReloadIcon"

const MainStake = ({ address, loadingList, setLoadingList }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00',
        minutes: '00', seconds: '00'
    })
    const [loadingButton, setLoadingButton] = useState(false)
    const { amountStaked, rewardStaked, totalStaked, lastStaked, currentStake } = useAccountStaked();

    useEffect(() => {
        // Execute timer every 1 seconds 
        const intervalId = setInterval(() => {
            const remainingTime = calculateRemainingTime(lastStaked)

            setTimeLeft({
                days: remainingTime.days, hours: remainingTime.hours,
                minutes: remainingTime.minutes, seconds: remainingTime.seconds,
            })
        }, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [lastStaked])

    const handleUnStake = async (planId) => {
        try {
            // loading button
            setLoadingButton(true)
            const result = await unStake(planId, address)

            if (result) {
                setLoadingButton(false)
                toast.success('Unstake have been successfully')
            }
        } catch (e) {
            console.log('unstake', e)
            setLoadingButton(false)
            toast.error("There was an error durring unstake, try again in moment")
        }
    }

    return (
        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-sm bg-opacity-60 dark:bg-opacity-30">
            <div className="space-y-2 font-semibold text-justify">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        Amount Staked:
                    </div>
                    <div className="col-span-1 text-right">
                        {formatNumber(Number(amountStaked), 2, 2)} AHA
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        Reward:
                    </div>
                    <div className="col-span-1 text-right">
                        {formatNumber(Number(rewardStaked), 2, 2)} AHA
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        Total:
                    </div>
                    <div className="col-span-1 text-right">
                        {totalStaked} Staked
                    </div>
                </div>
            </div>

            <div className="space-y-4 font-medium text-center">
                <h6 className="text-xs">
                    Unstaking before end of cycle will prevent you from staking again until next cycle
                </h6>

                {
                    lastStaked > 0 ?
                        (
                            <div className="flex items-center justify-between h-12 px-2 font-semibold sm:px-2 bg-aha-green-lighter bg-opacity-30">
                                <div className="col-span-1"> Cycle ends in </div>

                                <div className="col-span-1 text-aha-green-light dark:text-green-400 flex items-center space-x-0.5">
                                    <i className='bx text-3xl bx-stopwatch'></i>

                                    <figure className="flex items-center justify-evenly gap-0.5">
                                        <div className="flex items-center gap-0.5 mr-2">
                                            <label className="text-xl sm:text-2xl"> {timeLeft.days} Days </label>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <label className="text-xl sm:text-2xl"> {timeLeft.hours} </label>
                                            :
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <label className="text-xl sm:text-2xl"> {timeLeft.minutes} </label>
                                            :
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <label className="text-xl sm:text-2xl"> {timeLeft.seconds} </label>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-12 px-2 font-semibold sm:px-16 bg-aha-green-lighter bg-opacity-30">
                                No active cycle to stake on
                            </div>
                        )
                }
            </div>

            <div className="font-medium text-center space-y-4">
                <p className="font-bold text-xl"> Unstake from current cycle </p>

                <button
                    className={classNames({
                        'btn inline-flex btn rounded-sm py-1.5 px-6 text-2xl break-after-column': true
                    })}
                    disabled={loadingButton || currentStake === 0}
                    onClick={() => handleUnStake(currentStake)}>
                    {loadingButton ? <><SpinIcon /> Processing</> : 'Unstake'}
                </button>

            </div>

            <div className="flex justify-center">
                {address && (
                    <button
                        className={classNames({
                            'btn inline-flex btn rounded-full p-4': true,
                        })}
                        onClick={() => setLoadingList(true)}
                    >
                        <ReloadIcon addClassName={classNames({
                            'font-medium w-12 h-12': true,
                            'animate-spin': loadingList
                        })} />
                    </button>
                )}
            </div>
        </section>
    )
}


export default MainStake;