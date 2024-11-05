import React from "react";

const ArrowTop = ({ color = "#F79009", width = "19", height = "19" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 19 19"
    fill="none"
  >
    <path
      d="M9.06787 14.939V4.35986M9.06787 4.35986L3.77832 9.64941M9.06787 4.35986L14.3574 9.64941"
      stroke={color}
      strokeWidth="2.26695"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowTop;
