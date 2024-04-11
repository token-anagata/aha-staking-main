import { getBalance, writeContract, readContract } from '@wagmi/core'
import { 
    //arbitrum, 
    // bsc, 
    bscTestnet, 
    //mainnet, 
    //polygon 
} from "wagmi/chains";
import { config } from '../../configurations/wagmi'
import { AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS, AHA_STAKING_ABI, AHA_STAKING_ADDRESS } from '../../ahaConfigVariables/ahaConfigVars'

export const CURRENT_EVENT = process.env.REACT_APP_EVENTID
export const DECIMALS = 18

export async function walletBalance(address) {
    const balance = await getBalance(config, {
        address: address,
        token: AHA_TOKEN_ADDRESS
    })

    return balance
}

export async function formattedBalance(address) {
  const balance = await getBalance(config, {
      address: address,
      token: AHA_TOKEN_ADDRESS
  })

  return balance.formatted
}

