import React, { useEffect, useState } from "react";
import getContract from "@/utils/getContract";
import { newaddress, abi } from "@/utils/abi";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/elements/Modal";
const Tasks = () => {
  const account = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    address: newaddress,
    abi: abi,
    signerOrProvider: signer || provider,
  });
  const [connected, setConnected] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    const tx = await contract.addTask(title, content, false);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    await setTitle("");
    await setContent("");
    fetchData();
  };
  const fetchData = async () => {
    setConnected(true);
    const data = await contract.getMyTask();
    if (data.length == 0) {
      toast.warn("No Data Found");
    } else {
      setDataExists(true);
      setTasks(data);
    }
  };
  const completeTask = async () => {
    const tx = await contract.deleteTask(key);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    fetchData();
  };

  useEffect(() => {
    console.log("tasks");
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    window.ethereum.on("chainChanged", function (accounts) {
      toast.warn("Please switch to Polygon Mumbai or Goerli TestNet ");
    });
    window.ethereum.on("disconnect", function (accounts) {
      window.location.reload();
      toast.warn("Please connect to your wallet");
    });
    window.ethereum.on("message", function (accounts) {
      window.location.reload();
    });
  });

  return <></>;
};

export default Tasks;
