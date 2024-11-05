import React from "react";

const CheckIcon = ({ color = "#17B26A", height = "12", width = "13" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 13 12"
    fill="none"
  >
    <path
      d="M10.5 3L5 8.5L2.5 6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
