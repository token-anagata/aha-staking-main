import { bsc, bscTestnet } from "viem/chains";
import { CHAIN_NETWORK } from "./common";

export function getChain(){
    if(CHAIN_NETWORK === 'bsc'){
        return bsc
    }else{
        return bscTestnet
    }
}

export function getPublicRpc(){
    if(CHAIN_NETWORK === 'bsc'){
        return 'https://binance.llamarpc.com'
    }else{
        return 'https://endpoints.omniatech.io/v1/bsc/testnet/public'
    }
}