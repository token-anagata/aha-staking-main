import Web3 from 'web3/dist/web3.min.js';
import { toast } from 'react-toastify';
import { AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS } from "../ahaConfigVariables/ahaConfigVars"
import { NETWORK_ID } from "../ahaConfigVariables/defaultNetwork";

export const chainName = {
    "0x1": "Ethereum Main Network",
    "0x3": "Ropsten Test Network",
    "0x4": "Rinkeby Test Network",
    "0x5": "Goerli Test Network",
    "0x2a": "Kovan Test Network",
    "0x89": "Polygon Mainnet",
    "0x13881": "Matic Mumbai Testnet",
    "0x38": "BSC Mainnet",
    "0x61": "BSC Testnet",
    "0x28": "Telos EVM Mainnet",
  },
  web3 = new Web3(Web3.givenProvider || "https://polygon-rpc.com/");

export const initContract = async (ABI, ADDRESS) => {
  try {
    const contract = new web3.eth.Contract(ABI, ADDRESS);
    return contract;
  } catch (initContractError) {
    console.log("initContractError: ", initContractError);
  }
};

export const initTokenContract = async (team) => {
  try {
    const contract = new web3.eth.Contract(team.tokenABI, team.tokenAddress);

    return contract;
  } catch (initTokenError) {
    console.log("initTokenError => ", initTokenError);
  }
};

export const getConnectedWalletAddress = async () => {
  try {
    const account = await web3.eth.getAccounts();
    if (account.length > 0) {
      return account[0];
    }

    console.log("Not connected");
    return false;
  } catch (walletAddressError) {
    console.log("walletAddressError: ", walletAddressError.message);
  }
};

export const getConnectedWalletBalance = async () => {
  try {
    const connectedWallet = await getConnectedWalletAddress(),
      contractInfo = await initContract(AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS),
      walletBalance = await contractInfo.methods
        .balanceOf(connectedWallet)
        .call();

    return parseFloat(walletBalance) / Math.pow(10, 18);
  } catch (getWalletBalanceError) {
    console.log("getWalletBalanceError", getWalletBalanceError.message);
    return;
  }
};

export const checkWalletChain = async () => {
  const chainIdHex = await web3.eth.net.getId();
  // console.log(`0x${chainIdHex.toString(16)}`);

  return chainIdHex;
};

export const checkWalletChainAndSwitch = async () => {
  const chainToSwitchTo = String(NETWORK_ID).startsWith("0x")
    ? NETWORK_ID
    : `0x${NETWORK_ID.toString(16)}`;
  const chainIdHex = await checkWalletChain();
  const chainInfo = {
    "0x89": {
      chainId: "0x89",
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },

    "0x38": {
      chainId: "0x38",
      chainName: "BSC Mainnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },

    "0x28": {
      chainId: "0x28",
      chainName: "Telos EVM Mainnet",
      nativeCurrency: {
        name: "TLOS",
        symbol: "TLOS",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.telos.net/evm"],
      blockExplorerUrls: ["https://teloscan.io/"],
    },
  };

  console.info("Current Network:", chainToSwitchTo);

  if (parseInt(chainIdHex) !== parseInt(chainToSwitchTo)) {
    // WALLET IS NOT ON PROPER NETWORK
    console.info("Switch to:", chainInfo[chainToSwitchTo].chainName);

    return new Promise((resolve, reject) => {
      // SWITCH WALLET NETWORK TO PROPER
      web3.currentProvider
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainToSwitchTo }],
        })
        .then((chain) => {
          // SWITCHED SUCCESSFULLY
          toast.success(
            `Wallet chain successfully changed to ${chainName[chainToSwitchTo]}`
          );
          return resolve(true);
        })
        .catch((switchToProperChainError) => {
          if (switchToProperChainError.code === 4902) {
            // Unrecognized chain ID
            toast.info(
              `${chainInfo[chainToSwitchTo].chainName} is not found on your wallet`
            );
            // NETWORK NOT FOUND ON WALLET, ADD IT
            window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [chainInfo[chainToSwitchTo]],
              })
              .then((chain) => {
                // ADDED SUCCESSFULLY
                toast.success(
                  `${chainName[chainToSwitchTo]} successfully added to your wallet`
                );
                return resolve(true);
              })
              .catch((addProperChainError) => {
                console.info("addProperChainError", addProperChainError);
                toast.error(addProperChainError.message);
                return reject(false);
              });
          }

          if (switchToProperChainError.code === 4001) {
            // USER REJECTED SWITCH REQUEST
            toast.error(switchToProperChainError.message);
          }
          console.info("switchToProperChainError", switchToProperChainError);
          return reject(false);
        });
    }).catch((checkWalletChainError) => {
      console.info("checkWalletChainError", checkWalletChainError);
      toast.error(checkWalletChainError.message);
      return false;
    });
  }

  return true;
};

export const checkIfMetamaskIsInstalled = async () => {
  if (typeof window.ethereum === "undefined") {
    // USER DOES NOT HAVE METAMASK INSTALLED
    // toast.error("Uh Oh! You do not have metamask installed")
    return false;
  }

  return true;
};

export const connectToMetamask = async () => {
  if (typeof window.ethereum === "undefined") {
    // USER DOES NOT HAVE METAMASK INSTALLED
    // setOpenMetamaskWarning(true);
    toast.error("Uh Oh! You do not have metamask installed");
    return true;
  }

  let hashedWallet = "",
    connectedAccount = await window.ethereum.request({
      method: "eth_accounts",
    });

  if (connectedAccount && connectedAccount.length > 0) {
    // METAMASK IS ALREADY CONNECTED
    hashedWallet = `${connectedAccount[0].slice(
      0,
      6
    )}........${connectedAccount[0].slice(
      connectedAccount[0].length - 4,
      connectedAccount[0].length
    )}`;

    // await checkWalletChainAndSwitch(chainId)

    sessionStorage.removeItem("RBNWallet");
    return {
      hashedAccount: hashedWallet,
    };
  } else {
    // METAMASK IS NOT CONNECTED
    return new Promise((resolve, reject) => {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // checkWalletChainAndSwitch(chainId)

          hashedWallet = `${accounts[0].slice(0, 6)}........${accounts[0].slice(
            accounts[0].length - 4,
            accounts[0].length
          )}`;

          toast.success("Wallet Connected");
          return resolve({
            hashedAccount: hashedWallet,
          });
        })
        .catch((error) => {
          let errorMessage =
            error.code === 4001 ? "You rejected the connection" : error.message;
          reject(toast.error(errorMessage));
          return;
        });
    }).catch((error) => {
      toast.error(error.message);
      return;
    });
  }
};

export const calculateTimeLeft = async (saleEndDate) => {
  let difference = +(saleEndDate * 1000) - +new Date();

  let timeLeft = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  // console.log(timeLeft);
  return timeLeft;
};
