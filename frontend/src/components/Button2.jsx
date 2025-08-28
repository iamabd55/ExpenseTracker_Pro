import React from "react";
import { Link } from "react-router-dom";

const Button2 = ({ text, to }) => {
  return (
    <Link to={to}>
      <button
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 
        focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm 
        px-5 py-3 mb-2 w-36 cursor-pointer"
      >
        {text}
      </button>
    </Link>
  );
};

export default Button2;
