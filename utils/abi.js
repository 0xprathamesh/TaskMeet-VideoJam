export const contractAddress = "0x866761881A3f949e2c9855C3bAb7983f2608f8d9";
export const newaddress = "0xBb1Cd5bc7f1B1BDeD691a655d840b67Dbdf11b02";
//  0x08aF4feef088e5367c9E65a17EfaB0d2751837c7
export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "taskTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "taskText",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
    ],
    name: "addTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
    ],
    name: "AddTask",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
    ],
    name: "deleteTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
    ],
    name: "DeleteTask",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "taskTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "taskText",
        type: "string",
      },
    ],
    name: "updateTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "taskTitle",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "taskText",
        type: "string",
      },
    ],
    name: "UpdateTask",
    type: "event",
  },
  {
    inputs: [],
    name: "getMyTask",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "taskTitle",
            type: "string",
          },
          {
            internalType: "string",
            name: "taskText",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isDeleted",
            type: "bool",
          },
        ],
        internalType: "struct TaskContract.Task[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
