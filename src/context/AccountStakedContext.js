import React, {
  createContext,
  useContext,
  useState
} from 'react';

const AccountStakedContext = createContext();

export const useAccountStaked = () => useContext(AccountStakedContext);

export const AccountStakedProvider = ({
  children
}) => {
  const [amountStaked, setAmountStaked] = useState(0);
  const [rewardStaked, setRewardStaked] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [lastStaked, setLastStaked] = useState('');
  const [currentStake, setCurrentStake] = useState(null);
  const [unclaimedStake, setUnclaimedStake] = useState(0);

  const updateAmountStaked = (newAmount) => {
    setAmountStaked(newAmount);
  };

  const updateRewardStaked = (newReward) => {
    setRewardStaked(newReward);
  };

  const updateTotalStaked = (newTotal) => {
    setTotalStaked(newTotal);
  };

  const updateLastStaked = (newDate) => {
    setLastStaked(newDate);
  };

  const updateCurrentStake = (newPlan) => {
    setCurrentStake(newPlan);
  };

  const updateUnclaimedStake = (newUnclaim) => {
    setUnclaimedStake(newUnclaim);
  };

  return ( <
    AccountStakedContext.Provider value = {
      {
        amountStaked,
        updateAmountStaked,
        rewardStaked,
        updateRewardStaked,
        totalStaked,
        updateTotalStaked,
        lastStaked,
        updateLastStaked,
        currentStake,
        updateCurrentStake,
        unclaimedStake,
        updateUnclaimedStake
      }
    }> 
      {children} 
    </AccountStakedContext.Provider>
  );
};