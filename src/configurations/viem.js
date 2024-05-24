import { createPublicClient, http } from 'viem'
import { getChain, getPublicRpc } from './chain'

const publicRpc = getPublicRpc()

export const publicClient = createPublicClient({ 
  chain: getChain(), 
  transport: http(publicRpc), 
}) 