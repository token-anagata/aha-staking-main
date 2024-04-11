import { toast } from "react-toastify";
// import { buyTeamToken } from "../../../robinos/src/appCore/web3WriteFunctions";
import { stakingCycles } from "../ahaConfigVariables/stakingCycles";
import { AHA_STAKING_ABI, AHA_STAKING_ADDRESS, AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS } from "../ahaConfigVariables/ahaConfigVars"
import { getConnectedWalletAddress, initContract, web3 } from "./globalFunctions"




export const approveTokenSpend = async () => {
  const connectedWallet = await getConnectedWalletAddress(),
        tokenContract = await initContract(AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS),
        approveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'


  return new Promise((resolve, reject) => {
    tokenContract.methods.approve(AHA_STAKING_ADDRESS, approveAmount)
      .send({
        from: connectedWallet,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      })
      .once("transactionHash", (hash) => {
        console.log("transactionHash", hash);
        toast.info("Your transaction is pending confirmation on the block");
      })
      .on('receipt', (receipt) => {
        toast.success('Approval successfully sent!')
        console.info('Transaction Hash', receipt.transactionHash);

        return resolve(true)
      })
      .on('error', (approveTokenSpendCatchError) => {
        toast.error(approveTokenSpendCatchError.message)
        return reject(false)
      })
  }).catch(approveTokenSpendError => {
    toast.error(approveTokenSpendError.message)
    return false
  })
}





export const unStakeFromCurrentCycle = async (stakingCycle) => {
  const connectedWallet = await getConnectedWalletAddress(),
        stakingContract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
        cycleName = stakingCycles[stakingCycle - 1]

  // console.log(stakingContract.methods);

  return new Promise((resolve, reject) => {
    var encodedData = stakingContract.methods.unstake(cycleName).encodeABI()

    web3.eth.sendTransaction({
      from: connectedWallet,
      to: AHA_STAKING_ADDRESS,
      data: encodedData,
      gas: 200000,
      gasPrice: null,
    })
    .once("transactionHash", (hash) => {
      console.log("transactionHash", hash);
      toast.info("Your unstake transaction is pending confirmation on the block");
    })
    .once('receipt', (receipt) => {
      toast.success("Your unstake transaction receipt is ready! ");
      console.info('transactionReceipt:', receipt);
    })
    .once('confirmation', (receipt) => {
      toast.success("Your unstake transaction is confirmed! ");
      console.info('confirmationReceipt:', receipt);

      return resolve(true);
    })
    .on('error', (unStakeFromCurrentCyclePromiseError) => {
      toast.error(unStakeFromCurrentCyclePromiseError.message)
      console.log(unStakeFromCurrentCyclePromiseError);

      return reject(false)
    })
  }).catch(unStakeFromCurrentCycleError => {
    console.log('unStakeFromCurrentCycleError:', unStakeFromCurrentCycleError);
    toast.error(unStakeFromCurrentCycleError.message)
    return false;
  });
}





export const stakeToken = async(stakeAmount) => { 
  const connectedWallet = await getConnectedWalletAddress(),
        stakingContract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
        amountToStake = web3.utils.toWei(stakeAmount),
        cycleName = stakingCycles[0]

  // console.log(stakingContract.methods);

  return new Promise((resolve, reject) => {
    var encodedData = stakingContract.methods.stake(cycleName, amountToStake).encodeABI()

    web3.eth.sendTransaction({
      from: connectedWallet,
      to: AHA_STAKING_ADDRESS,
      data: encodedData,
      gas: 200000,
      gasPrice: null,
    })
    .once("transactionHash", (hash) => {
      console.log("transactionHash", hash);
      toast.info("Your transaction is pending confirmation on the block");
    })
    .once('receipt', (receipt) => {
      toast.success("Your transaction receipt is ready! ");
      console.info('transactionReceipt:', receipt);
    })
    .once('confirmation', (receipt) => {
      toast.success("Your transaction is confirmed! ");
      console.info('confirmationReceipt:', receipt);

      return resolve(true);
    })
    .on('error', (stakeTokenPromiseError) => {
      toast.error(stakeTokenPromiseError.message)
      console.log(stakeTokenPromiseError);

      return reject(false)
    })
  }).catch(stakeTokenError => {
    console.log('stakeTokenError:', stakeTokenError);
    toast.error(stakeTokenError.message)
    return false;
  });
}