export const AHA_STAKING_ABI = [{
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "constant": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "created",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "apr",
        "type": "uint256"
    }],
    "name": "Staked",
    "payable": false,
    "type": "event"
}, {
    "constant": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "interest",
        "type": "uint256"
    }],
    "name": "Unstaked",
    "payable": false,
    "type": "event"
}, {
    "constant": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "UpdateStakeAPR",
    "payable": false,
    "type": "event"
}, {
    "constant": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "UpdateStakeMonth",
    "payable": false,
    "type": "event"
}, {
    "constant": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
    }],
    "name": "UpdateStakeRangeAmount",
    "payable": false,
    "type": "event"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeIndex",
        "type": "uint256"
    }],
    "name": "calculateInterest",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeAmount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeMonth",
        "type": "uint256"
    }],
    "name": "getApr",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "getIndex",
    "outputs": [{
        "internalType": "int256",
        "name": "",
        "type": "int256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeMonth",
        "type": "uint256"
    }],
    "name": "stake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "token",
    "outputs": [{
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "stakeIndex",
        "type": "uint256"
    }],
    "name": "unstake",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256[6][6]",
        "name": "newAPR",
        "type": "uint256[6][6]"
    }],
    "name": "updateAPR",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256[6]",
        "name": "newMinAmounts",
        "type": "uint256[6]"
    }, {
        "indexed": false,
        "internalType": "uint256[6]",
        "name": "newMaxAmounts",
        "type": "uint256[6]"
    }],
    "name": "updateMinMaxAmounts",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256[6]",
        "name": "newStakeMonths",
        "type": "uint256[6]"
    }],
    "name": "updateStakeMonths",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]