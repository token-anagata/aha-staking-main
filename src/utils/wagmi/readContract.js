import { readContract } from '@wagmi/core'
import {
    //arbitrum, 
    // bsc, 
    bscTestnet,
    //mainnet, 
    //polygon 
} from "wagmi/chains";
import { config } from '../../configurations/wagmi'
import { CURRENT_EVENT } from '.';
import { AHA_STAKING_ADDRESS, AHA_TOKEN_ADDRESS } from "../../configurations/address";
import { AHA_STAKING_ABI } from "../../abi/stake";
import { AHA_TOKEN_ABI } from "../../abi/token";

export async function getApproved(address) {
    const result = await readContract(config, {
        abi: AHA_TOKEN_ABI,
        address: AHA_TOKEN_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'allowance',
        args: [
            address,
            AHA_STAKING_ADDRESS,
        ],
        account: address,
    })

    return result
}

export async function getSales() {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'getAllSales',
        account: AHA_STAKING_ADDRESS,
    })

    return result
}

export async function getIsSaleOn() {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'isSaleOn',
        args: [
            CURRENT_EVENT
        ],
        account: AHA_STAKING_ADDRESS
    })

    return result
}

export async function getStakeFromCycle(address) {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'getUserStaked',
        args: [
            CURRENT_EVENT,
            address
        ],
        account: address,
    })

    return result
}

export async function getHasUserUnstaked(address) {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'hasUserUnstaked',
        args: [
            CURRENT_EVENT,
            address
        ],
        account: address,
    })

    return result
}

export async function getUserRewardStaked(address) {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'getTotalUserReward',
        args: [
            CURRENT_EVENT,
            address
        ],
        account: address,
    })

    return result
}

export async function getEventData(address) {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'getEventData',
        args: [
            CURRENT_EVENT
        ],
        account: address,
    })

    return result
}

export async function getEventReward(address) {
    const result = await readContract(config, {
        abi: AHA_STAKING_ABI,
        address: AHA_STAKING_ADDRESS,
        chainId: bscTestnet.id,
        functionName: 'getEventReward',
        args: [
            CURRENT_EVENT
        ],
        account: address,
    })

    return result
}
