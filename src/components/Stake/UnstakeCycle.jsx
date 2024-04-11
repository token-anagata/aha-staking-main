import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SpinIcon from "../../assets/svg/SpinIcon"
import classNames from "classnames"
import { unStakeFromCurrentCycle } from "../../appCore/web3WriteFunctions"
import { unStake } from "../../utils/wagmi/writeContract"

const UnstakeCycle = ({ address, hasUnstaked }) => {
    const [previousCycleNumber, setPreviousCycleNumber] = useState('')
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()

    }, [])

    const handleUnStake = (e) => {
        e.preventDefault()
        unStake(address)
    }

    return (
        <section className="col-span-2 px-2 py-6 space-y-8 bg-gray-300 shadow-xl sm:px-4 rounded-xl bg-opacity-60">
            <div className="flex flex-col items-center sm:flex-row justify-evenly">
                <section className="font-medium">
                    <h6 className="font-semibold"> Forgot to unstake from a previous cycle? We got you! </h6>
                    <p className="mt-1">
                        <span className="text-sm"> Unclaimed Cycle: </span>
                        None
                        {
                            // unclaimedCycle?.length ? unclaimedCycle.toString() : 'None'
                        }
                    </p>
                </section>

                <section className="flex items-center justify-between w-full max-w-sm py-1 pr-1 bg-gray-100 rounded">
                    <input type="number" name='buyAmount' className="outline-none rounded p-1.5 bg-gray-100 text-black w-2/3 placeholder:text-gray-500" min={0} placeholder="Cycle Number" value={previousCycleNumber} onChange={(event) => {
                        if (event.target.value > -1 || event.target.value === "") {
                            setPreviousCycleNumber(event.target.value)
                        }
                    }} />

                    <button
                        className={classNames({
                            'btn inline-flex btn rounded-sm py-1.5 px-6': true,
                            'bg-opacity-50 pointer-events-none': !hasUnstaked,
                        })}
                        disabled={loadingButton}
                        onClick={handleUnStake}>
                        {loadingButton ? <><SpinIcon /> Processing</> : 'Clain'}
                    </button>
                </section>
            </div>
        </section>
    )
}


export default UnstakeCycle;