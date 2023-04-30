import { ethers } from "ethers";
import { newaddress, abi } from "./abi";
export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(newaddress, abi, signer);
  return contract;
}
