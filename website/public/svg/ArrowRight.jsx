import React from "react";

const ArrowRight = ({ color = "#D0D5DD", width = "25", height = "24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
  >
    <path
      d="M9.375 18L15.625 12L9.375 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowRight;
