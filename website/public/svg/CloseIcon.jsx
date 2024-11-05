import React from "react";

const CloseIcon = ({
  color = "#98A2B3",
  width = "24",
  height = "24",
  onClose,
}) => (
  <svg
    className="cursor-pointer"
    onClick={onClose}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
