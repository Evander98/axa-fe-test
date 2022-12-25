import React from "react";

const Button = ({ icon, label, onClick, disabled }) => {
  return (
    <button
      className="cursor-pointer border-2 rounded-xl py-2 px-4 flex items-center"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
