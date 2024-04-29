import { writeContract } from '@wagmi/core'
// import { 
//     //arbitrum, 
//     // bsc, 
//     bscTestnet, 
//     //mainnet, 
//     //polygon 
// } from "wagmi/chains";
import { config } from '../../configurations/wagmi'
import { AHA_STAKING_ADDRESS, AHA_TOKEN_ADDRESS } from "../../configurations/address";
import { AHA_STAKING_ABI } from "../../abi/stake";
import { AHA_TOKEN_ABI } from "../../abi/token";
import { DECIMALS } from '.';

/* global BigInt */
export async function approve(address, amount) {
    const result = await writeContract(config, {
        abi: AHA_TOKEN_ABI,
        address: AHA_TOKEN_ADDRESS,
        functionName: 'approve',
        args: [
            AHA_STAKING_ADDRESS,
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}

export async function stake(address, planId, amount) {
    const result = await writeContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        functionName: 'stake',
        args: [
            BigInt(planId),
            BigInt(amount) * DECIMALS,
        ],
        account: address
    })

    return result
}

export async function unStake(planId, address) {
        const result = await writeContract(config, {
            abi: AHA_STAKING_ABI,
            address: AHA_STAKING_ADDRESS,
            functionName: 'unstake',
            args: [
                planId
            ],
            account: address,
        })
        
        return result

}