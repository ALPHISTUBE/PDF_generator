import React from "react";

const DotsVertical = ({ color = "#475467", isOpen }) => (
  <svg
    onClick={isOpen}
    className="cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M9.99984 10.8335C10.4601 10.8335 10.8332 10.4604 10.8332 10.0002C10.8332 9.53993 10.4601 9.16683 9.99984 9.16683C9.5396 9.16683 9.1665 9.53993 9.1665 10.0002C9.1665 10.4604 9.5396 10.8335 9.99984 10.8335Z"
      stroke="#98A2B3"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99984 5.00016C10.4601 5.00016 10.8332 4.62707 10.8332 4.16683C10.8332 3.70659 10.4601 3.3335 9.99984 3.3335C9.5396 3.3335 9.1665 3.70659 9.1665 4.16683C9.1665 4.62707 9.5396 5.00016 9.99984 5.00016Z"
      stroke="#98A2B3"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99984 16.6668C10.4601 16.6668 10.8332 16.2937 10.8332 15.8335C10.8332 15.3733 10.4601 15.0002 9.99984 15.0002C9.5396 15.0002 9.1665 15.3733 9.1665 15.8335C9.1665 16.2937 9.5396 16.6668 9.99984 16.6668Z"
      stroke="#98A2B3"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DotsVertical;