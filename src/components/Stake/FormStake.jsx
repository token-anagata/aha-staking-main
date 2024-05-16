import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SpinIcon from "../../assets/svg/SpinIcon"
import { SUCCESS_STATUS, formattedBalance, getTransactionConfirmed } from "../../utils/wagmi"
import { getApproved } from "../../utils/wagmi/readContract"
import { approve, stake } from "../../utils/wagmi/writeContract"
import { formatNumber, formattedAmountToAha } from "../../utils/number"
import classNames from "classnames"
import { getCurrentDate, getEstimatedMonths } from "../../utils/date"
import { STAKE_MONTH, getAprPercentage, getCalculateApr, getPlanId } from "../../utils/stake"

const FormStake = ({ address, isDisconnected, setLoadingList }) => {
    const [amountToStake, setAmountToStake] = useState(0)
    const [walletBalance, setWalletBalance] = useState(0)
    const [currentApr, setCurrentApr] = useState(-1)
    const [planId, setPlanId] = useState(0)
    const [apr, setApr] = useState(0)
    const [estimatedApr, setEstimatedApr] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balance = await formattedBalance(address);
                const approved = await getApproved(address);

                if (approved) {
                    setAmountToStake(formattedAmountToAha(approved))
                }

                setWalletBalance(balance)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (address) {
            fetchData()
        } else {
            setWalletBalance(0)
        }

    }, [address, isDisconnected])

    function calculateApr(duration, amount) {
        const currentApr = getAprPercentage(Number(duration), Number(amount));
        const calculateApr = getCalculateApr(Number(duration), Number(amount));
        const plan = getPlanId(Number(duration), Number(amount));

        setPlanId(plan)
        setApr(currentApr)
        setEstimatedApr(calculateApr)
    }

    const handleChangeAmount = (e) => {
        const { value } = e.target;

        if (value > -1 || value === "") {
            if (/^\d*$/.test(value)) {
                calculateApr(currentApr, Number(value));
                setAmountToStake(value)
            }
        }
    }

    const handleKeyDownAmount = (e) => {
        const controlKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
        ];
        if (!controlKeys.includes(e.key) && !/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleInputAmount = (e) => {
        switch (e.target.dataset.key) {
            case '1':
                setAmountToStake((walletBalance * 0.75).toFixed(0))
                break;
            case '2':
                setAmountToStake((walletBalance * 0.5).toFixed(0))
                break;
            case '3':
                setAmountToStake((walletBalance * 0.25).toFixed(0))
                break;

            default:
                setAmountToStake(walletBalance)
                break;
        }
    }

    const handleStake = async (e) => {
        e.preventDefault()
        //ensure amount more than 20,000 AHA
        if (amountToStake < 20000) {
            toast.warning("Amount is required & minimum stake is more than equal 20000")
            return false
        }

        if (planId < 1) {
            toast.warning("Please choose a month first")
            return false
        }

        try {
            // loading button
            setLoadingButton(true)
            // ask to pemitted for approve their balance
            const hashApprove = await approve(address, amountToStake)

            if (hashApprove) {
                toast.success('Approve was successfull')
                // check transaction has confirmed
                const receipt = await getTransactionConfirmed(hashApprove);

                if (receipt.status === SUCCESS_STATUS) {
                    // Ask to permitted for move their funds to contract address
                    const result = await stake(address, planId, amountToStake)

                    if (result) {
                        // update list 
                        setLoadingList(true)
                        setLoadingButton(false)

                        toast.success('Your funds have been successfully staked')
                    }
                }
            }
        } catch (e) {
            console.log('stake', e)
            setLoadingButton(false)
            toast.error("There was an error durring stake, try again in moment")
        }
    }

    const handleDuration = (e) => {
        setCurrentApr(e.target.dataset.key)
        calculateApr(e.target.dataset.key, amountToStake)
    }

    return (
        <section className="col-span-2 grid sm:grid-rows-1 px-2 py-2 space-y-3 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-sm bg-opacity-60 dark:bg-opacity-30">
            <div className="flex flex-col">
                <p className="font-medium text-lg text-right py-4">
                    <span className="font-semibold"> Wallet Balance: </span>
                    {formatNumber(Number(walletBalance), 0, 3)} AHA
                </p>

                <div className="flex justify-between w-full max-w-sm text-md font-semibold text-aha-green-light">
                    {
                        ['Max', '75%', '50%', '25%'].map((v, k) => (
                            <span
                                key={k}
                                className="underline cursor-pointer hover:no-underline text-lg"
                                data-key={k}
                                onClick={handleInputAmount}
                            >
                                {v}
                            </span>
                        ))
                    }
                </div>

                <div className="flex rounded-lg shadow-sm">
                    <input
                        type="number"
                        name='buyAmount'
                        className="pe-11 block w-2/3 outline-none rounded-l-sm py-2 px-2 text-xl bg-gray-100 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 placeholder:dark:text-gray-200"
                        min={20000}
                        placeholder="Amount"
                        value={amountToStake}
                        onChange={handleChangeAmount}
                        onKeyDown={handleKeyDownAmount}
                    />
                    <button
                        className={classNames({
                            'btn items-center min-w-fit w-1/3 btn py-1 px-2 gap-x-2 text-xl text-center rounded-r-sm': true,
                            //'bg-opacity-50 pointer-events-none': !saleActive,
                            'inline-flex': loadingButton
                        })}
                        disabled={loadingButton}
                        onClick={handleStake}>
                        {loadingButton ? <><SpinIcon /> Processing</> : 'Approve & Stake'}
                    </button>


                </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-0 gap-y-2 rounded-lg shadow-sm">
                {
                    STAKE_MONTH.map((v, k) => (
                        <button
                            key={k}
                            type="button"
                            className={classNames({
                                "w-full px-2 py-4 items-center text-xl sm:text-sm first:rounded-s-lg rounded-sm text-white": true,
                                "border-b-0 border-r-2 last:border-r-0 focus:border-0 font-medium dark:border-gray-200": true,
                                "bg-aha-green-light hover:bg-aha-green-lighter": k !== Number(currentApr),
                                "bg-aha-green-dark": k === Number(currentApr)
                            })}
                            data-key={k}
                            onClick={handleDuration}
                        >
                            {v} Month
                        </button>
                    ))
                }
            </div>

            <div className="flex flex-col justify-between p-2 gap-2">
                <h4 className="font-bold text-xl px-2 py-2">Summary</h4>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Stacking Date</div>
                    <div className="text-right">{getCurrentDate()} - {currentApr < 0 ? getCurrentDate() : getEstimatedMonths(STAKE_MONTH[currentApr])}</div>
                </div>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>Estimated annual yield</div>
                    <div className="text-right">{(estimatedApr || 0).toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-2 border-b-2 border-gray-400 text-lg px-2">
                    <div>APR</div>
                    <div className="text-right">{(apr * 100) || 0}%</div>
                </div>
                <p className="text-md self-end">Not working?&nbsp;
                    <a href="https://t.me/AnagataGlobal" className="font-bold text-aha-green-lighter hover:text-[#22c55e]">
                        Contact support
                    </a>
                </p>
            </div>
        </section>
    )
}


export default FormStake;