import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../configurations/wagmi"

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: config,
  projectId: process.env.REACT_APP_WEB3MODAL_PROJECT_ID,
  enableAnalytics: true, 
  enableOnramp: true 
})

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}


