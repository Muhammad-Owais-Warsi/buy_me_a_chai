import { defineChain, getContract } from "thirdweb";
import { AbiConstructor, AbiFunction, AbiEvent, AbiFallback, AbiError } from "thirdweb/utils";
import client from "./web3";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ABI: readonly (AbiConstructor | AbiFunction | AbiEvent | AbiFallback | AbiError)[] = JSON.parse(`[
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]`);

const contract = getContract({
  client: client,
  chain: defineChain(11155111),
  address: CONTRACT_ADDRESS,
  abi: ABI
});

export default contract;