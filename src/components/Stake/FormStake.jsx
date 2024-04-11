import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SpinIcon from "../../assets/svg/SpinIcon"
import { formattedBalance } from "../../utils/wagmi"
import { getApproved, getSales } from "../../utils/wagmi/readContract"
import { approve, stake, unStake } from "../../utils/wagmi/writeContract"
import { formattedAmountToAha } from "../../utils/number"
import classNames from "classnames"

const FormStake = ({ address, isDisconnected, saleActive, hasUnstaked }) => {
    const [amountToStake, setAmountToStake] = useState('')
    const [walletBalance, setWalletBalance] = useState(0.00)
    const [tokenApproved, setTokenApproved] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balance = await formattedBalance(address);
                const approved = await getApproved(address);

                if (approved) {
                    setAmountToStake(formattedAmountToAha(approved))
                    setTokenApproved(true)
                }

                setWalletBalance(balance)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        if(address){
            fetchData()
        }else{
            setWalletBalance(0)
        }

    }, [address, isDisconnected])

    const handleApprove = async (e) => {
        e.preventDefault()
        //ensure amount more than 1000 AHA
        if (amountToStake < 1000) {
            toast.warning("Amount is required & more than equal 1000")
            return false
        }

        try {
            // loading button
            setLoadingButton(true)
            // ask to pemitted for approve their balance
            const result = await approve(address, amountToStake)
            // ensure their wallet confirm 
            if (result) {
                setLoadingButton(false)
                setTokenApproved(true)
                toast.success('Approve was successfull')
            }
        } catch (e) {
            console.log('approve', e)
            setLoadingButton(false)
            toast.error("There was an error durring approve, try again in moment")
        }
    }

    const handleStake = async (e) => {
        e.preventDefault()
        try {
            // loading button
            setLoadingButton(true)
            // Ask to permitted for move their funds to contract address
            const result = await stake(address, amountToStake)

            if (result) {
                setLoadingButton(false)
                toast.success('Your funds have been successfully staked')
            }
        } catch (e) {
            console.log('stake', e)
            setLoadingButton(false)
            toast.error("There was an error durring stake, try again in moment")
        }
    }

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
            setLoadingButton(false)
            toast.error("There was an error durring unstake, try again in moment")
        }
    }

    return (
        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:col-span-1 sm:px-4 rounded-xl bg-opacity-60">
            <section className="space-y-4">
                <p className="font-medium">
                    <span className="text-sm font-semibold"> Wallet Balance: </span>
                    AHA {walletBalance}
                </p>

                <div className="flex items-center justify-between w-full max-w-sm py-1 pr-1 mx-auto bg-gray-100 rounded">
                    <input type="number" name='buyAmount' className="outline-none rounded p-1.5 bg-gray-100 text-black w-2/3 placeholder:text-gray-500" min={0} placeholder="Amount" value={amountToStake} onChange={(e) => {
                        if (e.target.value > -1 || e.target.value === "") {
                            setAmountToStake(e.target.value)
                        }
                    }} />

                    <button
                        className={classNames({
                            'btn inline-flex items-center btn py-1 px-2 w-1/3 text-base': true,
                            'bg-opacity-50 pointer-events-none': !saleActive,
                        })}
                        disabled={loadingButton}
                        onClick={!tokenApproved ? handleApprove : handleStake}>
                        {loadingButton ? <><SpinIcon /> Processing</> : (!tokenApproved ? 'Approve' : 'Stake')}
                    </button>

                </div>

                <div className="flex items-center justify-between w-full max-w-xs mx-auto text-sm font-semibold text-aha-green-light">
                    <span className="underline cursor-pointer hover:no-underline" onClick={() => {
                        setAmountToStake(walletBalance)
                    }}>Max</span>

                    <span className="underline cursor-pointer hover:no-underline" onClick={() => {
                        setAmountToStake((walletBalance * 0.5).toFixed(0))
                    }}>50%</span>

                    <span className="underline cursor-pointer hover:no-underline" onClick={() => {
                        setAmountToStake((walletBalance * 0.3).toFixed(0))
                    }}>30%</span>
                </div>
            </section>

            <section className="flex items-center justify-between font-medium">
                <p className="font-bold"> Unstake from most recent cycle </p>

                <button
                    className={classNames({
                        'btn inline-flex btn rounded-sm py-1.5 px-6': true,
                        //'bg-opacity-50 pointer-events-none': !hasUnstaked,
                    })}
                    //disabled={loadingButton}
                    onClick={handleUnStake}>
                    {loadingButton ? <><SpinIcon /> Processing</> : 'UnStake'}
                </button>
            </section>
        </section>
    )
}


export default FormStake;