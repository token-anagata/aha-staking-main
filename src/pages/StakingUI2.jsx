import React, { useState, useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Header from "../components/UI2Components/Header";
import { useAccount } from "wagmi";
import { formattedAmountToAha } from "../utils/number";
import FormStake from "../components/Stake/FormStake";
import MainStake from "../components/Stake/MainStake";
import UnstakeCycle from "../components/Stake/UnstakeCycle";
import ListStake from "../components/Stake/ListStake";
import { getListStakeByAddress } from "../utils/wagmi/watchEvent";

const StakingUI2 = () => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [hasUnstaked, setHasUnstaked] = useState(0);
  const [listStake, setListStake] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

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
      const list = await getListStakeByAddress(address)
      
      if(list){
        setListStake(list)
        setLoadingList(false)
      }
    };

    if (address) {
      fetchData()
    } else {
      setStakedAmount(0);
      setListStake([]);
      setLoadingList(false)
    }
  }, [address, isDisconnected, loadingList]);

  return (
    <>
      <Header handleConnect={handleConnect} address={address} />

      <main className="grid grid-cols-2 w-full max-w-screen-xl sm:px-8 px-4 pt-8 pb-20 mx-auto gap-x-5 gap-y-10 ">
        {/** Component main stake get information connected current user */}
        <MainStake
          address={address}
          isDisconnected={isDisconnected}
          stakedAmount={stakedAmount}
        />

        {/** Component form stake connected current user */}
        <FormStake
          address={address}
          isDisconnected={isDisconnected}
          setLoadingList={setLoadingList}
        />

        {/** List user stake */}
        <ListStake
          address={address}
          isDisconnected={isDisconnected}
          listStake={listStake}
          loadingList={loadingList}
          setLoadingList={setLoadingList}
        />

        {/** Component Unstake cycle from connected current user */}
        <UnstakeCycle address={address} />
      </main>
    </>
  );
};

export default StakingUI2;
