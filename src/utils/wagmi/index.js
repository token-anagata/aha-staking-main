import { getBalance } from '@wagmi/core'
import { config } from '../../configurations/wagmi'
import { AHA_TOKEN_ADDRESS } from "../../configurations/address";

/* global BigInt */
export const CURRENT_EVENT = process.env.REACT_APP_EVENTID
export const DECIMALS = BigInt(1_000_000_000_000_000_000);
export const REAL_DECIMALS = 18

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

