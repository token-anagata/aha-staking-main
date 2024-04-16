import React, { useState, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Header from "../components/UI2Components/Header";
import { useAccount } from "wagmi";
import { formattedAmountToAha } from "../utils/number";
import FormStake from "../components/Stake/FormStake";
import {
  getHasUserUnstaked,
  getIsSaleOn,
  getSales,
  getStakeFromCycle,
} from "../utils/wagmi/readContract";
import MainStake from "../components/Stake/MainStake";
import UnstakeCycle from "../components/Stake/UnstakeCycle";

const StakingUI2 = () => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [hasUnstaked, setHasUnstaked] = useState(0);
  const [saleActive, setSaleActive] = useState(false);
  const [saleOn, setSaleOn] = useState([])

  const { open } = useWeb3Modal();
  const { address, isDisconnected } = useAccount();

  const handleConnect = (e) => {
    e.preventDefault();
    if (address) {
      open({ view: "Account" });
    } else {
      open({ view: "Connect" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sales = await getSales();
      const saleOn = await getIsSaleOn();

      
      if (sales.length > 0) {
        setSaleActive(true);
      }
      console.log(saleOn)
      // set end cycle date
      if (saleOn) {
        setSaleOn(saleOn);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currentStaked = await getStakeFromCycle(address);
      const hasUnstaked = await getHasUserUnstaked(address);

      if (currentStaked > 0) {
        setHasUnstaked(hasUnstaked);
        setStakedAmount(formattedAmountToAha(currentStaked));
      }
    };

    if (address) {
      fetchData();
    } else {
      setStakedAmount(0);
    }
  }, [address, isDisconnected]);

  return (
    <>
      <div className="sm:px-6">
        <Header handleConnect={handleConnect} address={address} />
      </div>

      <div className="grid w-full grid-cols-2 px-2 pt-8 pb-20 mx-auto gap-x-5 gap-y-10 max-w-7xl sm:px-10">
        {/** Component main stake get information connected current user */}
        <MainStake
          address={address}
          isDisconnected={isDisconnected}
          saleOn={saleOn}
          saleActive={saleActive}
          hasUnstaked={hasUnstaked}
          stakedAmount={stakedAmount}
        />

        {/** Component form stake connected current user */}
        <FormStake
          address={address}
          isDisconnected={isDisconnected}
          saleActive={saleActive}
          hasUnstaked={hasUnstaked}
        />

        {/** Component Unstake cycle from connected current user */}
        <UnstakeCycle address={address} hasUnstaked={hasUnstaked} />
      </div>
    </>
  );
};

export default StakingUI2;
