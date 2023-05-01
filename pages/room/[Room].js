import { HuddleIframe } from "@huddle01/huddle01-iframe";
import React, { useEffect, useState } from "react";
import getContract from "@/utils/getContract";
import Modal from "@/components/elements/Modal";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/czh-xciy-zub",
  height: "700px",
  width: "80%",
  noBorder: true, // false by default
};
const Meet = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const { Room } = router.query;
  const { address } = useAccount();
  const handleAdd = async () => {
    let contract = await getContract();
    const tx = await contract.addTask(title, content, false);
    await tx.wait();
    await setTitle("");
    await setContent("");
  };
  useEffect(() => {
    if (address) {
      router.replace(`/room/${address}`);
    }
  }, [address]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-[#121214] h-auto">
        <div className="flex justify-center items-center mx-auto rounded-xl ">
          <HuddleIframe config={iframeConfig} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {showButton && (
            <div
              onClick={() => setShowModal(true)}
              className="block w-full rounded px-12 py-3 text-md font-medium font-secondary text-white sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 "
            >
              Add Tasks
            </div>
          )}
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-3 px-3 lg:px-4 text-center">
          <h3 className=" font-primary mb-2 text-2xl  bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Add Your Task
          </h3>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Enter Task Title"
                className="w-[70%] caret-pink-500 bg-transparent p-3 text-xl bg-gradient-to-r from-green-300 via-blue-500 font-primary to-purple-600 bg-clip-text text-transparent border border-fuchsia-500 rounded-md placeholder:text-transparent mx-auto my-4 placeholder:font-primary focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 "
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Enter Task Info"
                className="w-[70%] caret-pink-500 bg-transparent p-3 text-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent border border-fuchsia-500 rounded-md placeholder:text-transparent mx-auto my-4 placeholder:font-primary focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 font-primary "
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mx-auto">
              <button
                type="submit"
                className="w-[70%] px-12 py-3  rounded text-md font-primary text-white  bg-gradient-to-r from-blue-500 to-purple-500 "
              >
                Add Tasks
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Meet;
