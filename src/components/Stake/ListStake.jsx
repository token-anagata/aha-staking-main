import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { unStake } from "../../utils/wagmi/writeContract"
import classNames from "classnames"
import SpinIcon from "../../assets/svg/SpinIcon"
import { getCurrentDate, getStakeDate, getStakeEstimatedMonths, getTimeEstimatedMonths } from "../../utils/date"
import { DECIMALS } from "../../utils/wagmi"
import { getAprPercentage, getCalculateApr, getCalculateMonthByPlanId, getMonthByPlanId } from "../../utils/stake"
import { useAccountStaked } from "../../context/AccountStakedContext"
import { LINK_EXPLORER } from "../../configurations/common"

const ListStake = ({ listStake, loadingList, setLoadingList, address, isDisconnected }) => {
    const [loadingButton, setLoadingButton] = useState(false)
    const {
        updateRewardStaked,
        updateAmountStaked,
        updateTotalStaked,
        updateLastStaked,
        updateCurrentStake,
        updateUnclaimedStake
    } = useAccountStaked();

    useEffect(() => {
        let totalAmountStaked = 0
        let totalRewardStaked = 0
        let currentStake = 0
        let lastStaked = 0
        let unclaimed = 0

        for (let i = 0; i < listStake.length; i++) {
            const estMonth = getTimeEstimatedMonths(listStake[i].args.planId, listStake[i].timestamp);

            if (estMonth < currentStake || currentStake === 0) {
                currentStake = listStake[i].args.planId;
            }

            if (estMonth > lastStaked) {
                lastStaked = estMonth;
            }

            if(estMonth > (new Date).getTime()){
                unclaimed++;
            }

            totalAmountStaked += Number(listStake[i].args.amount / DECIMALS)
            totalRewardStaked += getCalculateApr(getCalculateMonthByPlanId(listStake[i].args.planId), Number(listStake[i].args.amount / DECIMALS))
        }

        updateTotalStaked(listStake.length)
        updateAmountStaked(totalAmountStaked)
        updateRewardStaked(totalRewardStaked)
        updateCurrentStake(currentStake)
        updateLastStaked(lastStaked)
        updateUnclaimedStake(unclaimed)
    }, [listStake])

    const handleUnStake = async (planId) => {
        try {
            // loading button
            setLoadingButton(true)
            const result = await unStake(planId, address)

            if (result) {
                setLoadingButton(false)
                setLoadingList(true)
                toast.success('Unstake have been successfully')
            }
        } catch (e) {
            console.log('unstake', e)
            setLoadingButton(false)
            toast.error("There was an error durring unstake, try again in moment")
        }
    }

    if (loadingList) {
        return (
            <div className="col-span-2 place-self-center">
                <SpinIcon className="animate-spin w-24 h-24 text-aha-green-light" />
            </div>
        )
    }

    return (
        <section className="col-span-2 py-6 space-y-8">
            {
                !loadingList && listStake.map((v, k) => (
                    <div key={k} className="flex flex-col sm:flex-row space-x-4 space-y-8 sm:justify-between px-8 py-2 mx-auto bg-gray-300 rounded-sm shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 bg-opacity-60 dark:bg-opacity-30">
                        <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="./coin.webp" alt="AHA Token" />
                        <div className="text-center space-y-2 sm:text-left">
                            <div className="flex flex-col sm:flex-row space-y-0.5 sm:space-y-0 space-x-0 sm:space-x-2 text-center justify-center">
                                <p className="text-xl text-black dark:text-gray-200 font-semibold">
                                    Stacking Date
                                </p>
                                <p className="text-xl text-black dark:text-gray-200 font-semibold">
                                    {getStakeDate(v.timestamp)} - {getStakeEstimatedMonths(v.args.planId, v.timestamp)}
                                </p>
                                <p className="text-aha-green-light text-xl">{getMonthByPlanId(v.args.planId)} Month</p>
                            </div>
                            <div className="space-y-0.5 text-center">
                                <p className="text-lg text-slate-500 font-semibold">
                                    {Number(v.args.amount / DECIMALS)} AHA
                                </p>
                            </div>
                            <a
                                href={`${LINK_EXPLORER}/tx/${v.transactionHash}`}
                                target="_blank"
                                className="block px-4 py-1 text-md text-white text-ellipsis overflow-hidden font-semibold rounded-full bg-aha-green-light hover:text-white hover:bg-aha-green-dark hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                {v.transactionHash}
                            </a>
                        </div>
                        <div className="flex flex-col text-center sm:text-right pl-4 sm:space-y-2 ">
                            <p className="font-bold text-xl">Cycle Number <span className="text-aha-green-lighter">{Number(v.args.planId)}</span></p>
                            <p className="font-semibold text-xl text-aha-green-light">
                                {getCalculateApr(getCalculateMonthByPlanId(v.args.planId), Number(v.args.amount / DECIMALS))}&nbsp;
                                <i className="text-gray-500">({getAprPercentage(getCalculateMonthByPlanId(v.args.planId), Number(v.args.amount / DECIMALS)) * 100}%)</i>
                            </p>
                            <button
                                className={classNames({
                                    'btn btn rounded-sm py-1.5 px-6': true,
                                    'disabled:bg-aha-green-dark': getStakeEstimatedMonths(v.args.planId, v.timestamp) !== getCurrentDate()
                                })}
                                disabled={loadingButton || getStakeEstimatedMonths(v.args.planId, v.timestamp) !== getCurrentDate()}
                                onClick={() => handleUnStake(v.args.planId)}>
                                {loadingButton ? <><SpinIcon /> Processing</> : 'Unstake'}
                            </button>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}


export default ListStake;