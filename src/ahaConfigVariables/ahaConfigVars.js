export const AHA_STAKING_ADDRESS = '0x5c948824f69273735BFD7a57b786a12D011fD505'
// export const AHA_STAKING_ADDRESS = '0x0c38C3625013B2E62a09BCc268891ae70B753b18'
export const AHA_STAKING_ABI = [{
  "inputs": [{
    "internalType": "address",
    "name": "_token",
    "type": "address"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "PlanActivated",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "duration",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "rewardRate",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "minStake",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "maxStake",
    "type": "uint256"
  }],
  "name": "PlanCreated",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "PlanDeactivated",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "Staked",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "Unstaked",
  "type": "event"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "activatePlan",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "duration",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "rewardRate",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "minStake",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "maxStake",
    "type": "uint256"
  }],
  "name": "createPlan",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "deactivatePlan",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "getCalculateReward",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "getCurrentReward",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "getRemainingDuration",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "getRewarPerDay",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getTotalAllUserStaked",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "getTotalStakedAmount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }],
  "name": "getUserStakedPlans",
  "outputs": [{
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "user",
    "type": "address"
  }],
  "name": "getUserTotalStakedBalance",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "stake",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "token",
  "outputs": [{
    "internalType": "contract IERC20",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "planId",
    "type": "uint256"
  }],
  "name": "unstake",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]

export const AHA_TOKEN_ADDRESS = '0x96a128071C02C182a2A373B0C5B0537E8148F749'
export const AHA_TOKEN_ABI = [{
  "inputs": [{
    "internalType": "string",
    "name": "name_",
    "type": "string"
  }, {
    "internalType": "string",
    "name": "symbol_",
    "type": "string"
  }, {
    "internalType": "uint256",
    "name": "maxSupply_",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "mintPointPercent",
    "type": "uint256"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "inputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "canMintAt",
      "type": "uint256"
    }, {
      "internalType": "string",
      "name": "note",
      "type": "string"
    }, {
      "internalType": "uint256",
      "name": "pointOnePercent",
      "type": "uint256"
    }],
    "internalType": "struct AHAToken.MintAllowanceCheckpoint[]",
    "name": "checkpoints_",
    "type": "tuple[]"
  }],
  "name": "addCheckpoints",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "internalType": "uint8",
    "name": "",
    "type": "uint8"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseAllowance",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "getCheckpoints",
  "outputs": [{
    "components": [{
      "internalType": "uint256",
      "name": "canMintAt",
      "type": "uint256"
    }, {
      "internalType": "string",
      "name": "note",
      "type": "string"
    }, {
      "internalType": "uint256",
      "name": "pointOnePercent",
      "type": "uint256"
    }],
    "internalType": "struct AHAToken.MintAllowanceCheckpoint[]",
    "name": "",
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "spender",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "addedValue",
    "type": "uint256"
  }],
  "name": "increaseAllowance",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "mint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "name",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "time",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}]