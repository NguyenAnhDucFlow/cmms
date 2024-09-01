import React from "react";
import classNames from "classnames";

const Button = ({ children, className, ...props }) => {
    return (
    <button
      className={classNames(
        "bg-green-600 text-white px-4 py-2 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
