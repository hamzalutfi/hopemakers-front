import React from "react";

const InputField = ({ type, placeholder, iconClasses, ...other }) => (
  <div className="flex items-center w-full max-w-sm mb-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
    <input
      {...other}
      type={type}
      placeholder={placeholder}
      className="flex-1 p-3 rounded-lg outline-none border-none focus:ring-0 hover:dark:bg-gray-800 dark:bg-gray-800 dark:text-white"
    />
    <div className="flex items-center pr-3 pointer-events-none rtl:pl-3">
      <i className={iconClasses}></i>
    </div>
  </div>
);

export default InputField;
