import React from "react";

const ArrowDownForTable = ({
  color = "#475467",
  width = "16",
  height = "16",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.00016 3.3335V12.6668M8.00016 12.6668L12.6668 8.00016M8.00016 12.6668L3.3335 8.00016"
      stroke={color}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowDownForTable;
