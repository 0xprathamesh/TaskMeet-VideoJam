import React, { useEffect, useState } from "react";
import getContract from "@/utils/getContract";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { BsCheckSquare } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/Navbar";
const Tasks = () => {
  const account = useAccount();
  const [connected, setConnected] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    let contract = await getContract();
    const tx = await contract.addTask(title, content, false);
    setLoading(true);
    await tx.wait();
    setLoading(false);
    await setTitle("");
    await setContent("");
    fetchData();
  };
  const fetchData = async () => {
    let contract = await getContract();
    setConnected(true);
    const data = await contract.getMyTask();
    if (data.length == 0) {
      toast.warn("No Data Found");
    } else {
      setDataExists(true);
      setTasks(data);
    }
  };
  const finishTask = (key) => async () => {
    let contract = await getContract();
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
      toast.warn("Please switch to FileCoin HyperSpace ");
    });
    window.ethereum.on("disconnect", function (accounts) {
      window.location.reload();
      toast.warn("Please connect to your wallet");
    });
    window.ethereum.on("message", function (accounts) {
      window.location.reload();
    });
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex justify-center mt-10  flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10  ">
          <input
            type="text"
            placeholder="Learn Solidity"
            className="w-full md:w-[20%] caret-pink-500 bg-transparent p-3 text-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent border border-fuchsia-500 rounded-md placeholder:text-transparent   placeholder:font-primary placeholder:text-lg focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mappings,Functions etc"
            className="w-full md:w-[20%] caret-pink-500 bg-transparent p-3 text-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent border border-fuchsia-500 rounded-md placeholder:text-transparent  placeholder:font-primary placeholder:text-lg focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="w-full md:w-[20%] px-12 py-3 rounded text-md font-primary text-white  bg-gradient-to-r from-blue-500 to-purple-500 "
            onClick={() => handleAdd()}
          >
            Add Task
          </button>
          <button
            className="w-full md:w-[20%] px-12 py-3 rounded text-md font-primary text-white  bg-gradient-to-r from-blue-500 to-purple-500"
            onClick={fetchData}
          >
            Fetch Your Tasks{" "}
          </button>
        </div>

        {loading && (
          <div class="flex items-center justify-center flex-col">
            <div
              class="inline-block h-20 w-20 mt-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap font-secondary !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}

        {connected && dataExists && !loading && (
          <div>
            <h1 className=" text-4xl m-2 font-secondary items-center text-center mt-16">
              My Tasks 📝
            </h1>

            <div className="flex flex-wrap mt-10">
              {tasks.map((task) => (
                <div className="w-full sm:w-1/3 md:w-1/4 p-4 " key={task.id}>
                  <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-4">
                    <h2 className="text-lg font-primary bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent ">
                      {task.taskTitle}
                    </h2>
                    <p className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2">
                      {task.taskText}
                    </p>
                    <div className="flex flex-row items-center">
                      <button
                        className="bg-green-500 text-white  rounded-lg  mt-3"
                        title="Finish Task"
                        onClick={finishTask(task.id)}
                      >
                        <BsCheckSquare size={30} />
                      </button>
                      <p className="text-white ml-32 mt-1 italic font-primary">
                        Task id:- {task.id._hex}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {connected && !dataExists && (
          <div className="flex items-center justify-center text-center flex-col mt-14 font-secondary ">
            <h1 className="md:text-4xl  md:m-4 text-xl m-2  items-center text-center">
              No Notes Found{" "}
            </h1>
            <h2 className="md:text-4xl  md:m-4 text-xl m-2  items-center text-center">
              Add Notes to get started{" "}
            </h2>
          </div>
        )}
      </div>
<ToastContainer />
    </>
  );
};

export default Tasks;
