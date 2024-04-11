import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { http } from '@wagmi/core'

import { 
    //arbitrum, 
    // bsc, 
    bscTestnet, 
    //mainnet, 
    //polygon 
} from "wagmi/chains";

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const projectId = process.env.REACT_APP_WEB3MODAL_PROJECT_ID;
const chains = [bscTestnet];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  transports: {
    [bscTestnet.id]: http(),
  },
  //...wagmiOptions 
})
