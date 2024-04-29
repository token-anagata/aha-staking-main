import { createPublicClient, http } from 'viem'
import { bscTestnet } from 'viem/chains'
 
export const publicClient = createPublicClient({ 
  chain: bscTestnet, 
  transport: http('https://endpoints.omniatech.io/v1/bsc/testnet/public'), 
}) 