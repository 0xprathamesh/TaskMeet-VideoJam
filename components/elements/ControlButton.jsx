import React from "react";

const ControlButton = ({ label, disabled, onClick }) => {
  return (
    <div className="hover:text-black">
      <ul className="cursor-pointer" disabled={disabled} onClick={onClick} >
          <li className="mx-2 font-primary">{label}</li>
      </ul>
    </div>
  );
};

export default ControlButton;
