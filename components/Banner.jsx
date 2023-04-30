import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const { address } = useAccount();

  const handleClick = (e) => {
    if (!address) {
      e.preventDefault();
      const result = toast.warn("Please connect to a wallet first!");
      if (!result) {
        e.stopPropagation();
      }
    }
  };

  return (
    <section className="bg-[#121214] text-white h-[80vh] flex justify-center items-center">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mx-auto text-center">
          <h1 className="lg:text-[70px] font-secondary bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl text-transparent font-bold">
            Organize Your Meeting{" "}
            <span className="sm:block mt-4">Tasks Effortlessly</span>
          </h1>
          <p className="mx-auto mt-4 font-primary  sm:text-xl sm:leading-relaxed">
            TaskMeet is a task management tool for online meetings. Add,
            organize, and track tasks assigned to you with ease. Powered by
            Huddle01, TaskMeet enables seamless audio and video communication
            between users, making collaboration easy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              onClick={handleClick}
              href={`/room/${address}`}
              className="block w-full rounded px-12 py-3 text-md font-medium font-secondary text-white sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-125"
            >
              Start Meet
            </Link>
            <Link
              href="/tasks"
              className="block w-full rounded px-12 py-3 text-md font-medium font-secondary text-white sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-125"
            >
              Add Tasks
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </section>
  );
};

export default Banner;

