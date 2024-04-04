import { AHA_STAKING_ABI, AHA_STAKING_ADDRESS, AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS } from "../ahaConfigVariables/ahaConfigVars"
import { stakingCycles } from "../ahaConfigVariables/stakingCycles";
import { getConnectedWalletAddress, initContract } from "./globalFunctions";




export const isTokenApproved = async () => {
	try {
		const connectedAddress = await getConnectedWalletAddress(),
					tokenContract = await initContract(AHA_TOKEN_ABI, AHA_TOKEN_ADDRESS),
					isApproved = await tokenContract.methods.allowance(connectedAddress, AHA_STAKING_ADDRESS).call()

		return (parseInt(isApproved) === 0) ? false : true;
	} catch (isTokenApprovedError) {
		console.info('isTokenApprovedError:', isTokenApprovedError.message);
	}
}




export const getStakingCycleInfo = async () => {
  try {
    const stakingContract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
          saleInfo = await stakingContract.methods.isSaleOn(stakingCycles[0]).call()
    
    // console.log(stakingContract.methods);
    return saleInfo;
  } catch (getStakingCycleInfoError) {
    console.log('getStakingCycleInfoError:', getStakingCycleInfoError);
  }
}





export const getUserStakingInfo = async (connectedAddress) => {
	try {
		const contract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
					amountStaked = await contract.methods.getUserStaked(stakingCycles[0], connectedAddress).call(),
          userEarning = await contract.methods.getTotalUserReward(stakingCycles[0], connectedAddress).call()

    // console.log('getUserStakingInfo', userEarning / 1e18);
		
		return {
      amountStaked: amountStaked / 1e18,
      userEarning: userEarning / 1e18
    }
	} catch (getUserStakingInfoError) {
		console.log('getUserStakingInfoError:', getUserStakingInfoError.message);
	}
}






export const getEventStakeInfo = async () => {
  try {
    const contract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
          totalStaked = await contract.methods.getEventTotalStaked(stakingCycles[0]).call(),
          totalReward = await contract.methods.getEventReward(stakingCycles[0]).call(),
          eventData = await contract.methods.getEventData(stakingCycles[0]).call(),
          eventReward = await contract.methods.getEventReward(stakingCycles[0]).call()


    return {
      eventAPR: ((eventData[0] / eventData[1]) * totalReward) / 1e18,
      allStaking: totalStaked / 1e18,
      allReward: totalReward / 1e18,
      eventReward: eventReward
    }
  } catch (getEventStakeInfoError) {
    console.log('getEventStakeInfoError:', getEventStakeInfoError.message);
  }
}




export const checkForUnstakedPastPool = async () => {
  try {
    let rewardToken = []
    const contract = await initContract(AHA_STAKING_ABI, AHA_STAKING_ADDRESS),
          connectedAddress = await getConnectedWalletAddress()

    for (let cycleIndex = 0; cycleIndex < stakingCycles.length; cycleIndex++) {
      let unclaimedToken = await contract.methods.getCurrentUserReward(stakingCycles[cycleIndex], connectedAddress).call()
      
      if (unclaimedToken > 0) {
        // rewardToken.push(stakingCycles[cycleIndex])
        rewardToken.push(cycleIndex + 1)
        // console.log(`unclaimedToken on ${cycleIndex}`, unclaimedToken / 1e18);
    // console.log(await contract.methods.hasUserUnstaked(stakingCycles[cycleIndex], connectedAddress).call());
      }
    }
    return rewardToken
  } catch (checkForUnstakedPastPoolError) {
    console.log('checkForUnstakedPastPoolError:', checkForUnstakedPastPoolError.message);
  }
}