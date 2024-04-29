import {
    AHA_STAKING_ADDRESS,
} from "../../configurations/address";
import {
    AHA_STAKING_ABI
} from "../../abi/stake";

import {
    publicClient
} from '../../configurations/viem';

export async function getListStakeByAddress(address) {
    const blockNumber = await publicClient.getBlockNumber()
    const logs = await publicClient.getContractEvents({
        address: AHA_STAKING_ADDRESS,
        abi: AHA_STAKING_ABI,
        eventName: 'Staked',
        args: {
            from: address,
            to: AHA_STAKING_ADDRESS
        },
        fromBlock: 'earliest',
        toBlock: blockNumber
    })

    for (let i = 0; i < logs.length; i++) {
        const block = await publicClient.getBlock({
            blockHash: logs[0].blockHash
        })

        logs[i].timestamp = Number(block.timestamp)
    }
    
    return logs
}