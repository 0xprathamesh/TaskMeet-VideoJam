import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end mb-1 "
          onClick={() => onClose()}
        >
          <AiOutlineCloseCircle />
        </button>
        <div className="bg-[#121214] p-2 rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
