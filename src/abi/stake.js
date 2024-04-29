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