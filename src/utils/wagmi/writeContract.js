import { writeContract } from '@wagmi/core'
// import { 
//     //arbitrum, 
//     // bsc, 
//     bscTestnet, 
//     //mainnet, 
//     //polygon 
// } from "wagmi/chains";
import { config } from '../../configurations/wagmi'
import { CURRENT_EVENT, DECIMALS } from '.';
import { AHA_STAKING_ABI, AHA_STAKING_ADDRESS, AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS } from '../../ahaConfigVariables/ahaConfigVars';

export async function approve(address, amount) {
    const result = await writeContract(config, {
        abi: AHA_TOKEN_ABI,
        address: AHA_TOKEN_ADDRESS,
        functionName: 'approve',
        args: [
            AHA_STAKING_ADDRESS,
            parseInt(amount) * (10 ** DECIMALS),
        ],
        account: address
    })

    return result
}

export async function stake(address, amount) {
    const result = await writeContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        functionName: 'stake',
        args: [
            CURRENT_EVENT,
            amount * (10 ** DECIMALS),
        ],
        account: address
    })

    return result
}

export async function unStake(address) {
    try {

        const result = await writeContract(config, {
            abi: AHA_STAKING_ABI,
            address: AHA_STAKING_ADDRESS,
            functionName: 'unstake',
            args: [
                CURRENT_EVENT
            ],
            account: address,
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error.data)
    }
}