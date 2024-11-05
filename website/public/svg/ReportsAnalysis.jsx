import React from "react";

const ReportsAnalysis = ({
  color = "#7F56D9",
  width = "32",
  height = "32",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 39 36"
    fill="none"
  >
    <path
      d="M19.4438 25.1111V34M19.4438 25.1111L30.1105 34M19.4438 25.1111L8.77713 34M35.4438 2V16.5778C35.4438 19.5647 35.4438 21.0582 34.8625 22.1991C34.3512 23.2026 33.5353 24.0185 32.5317 24.5298C31.3909 25.1111 29.8974 25.1111 26.9105 25.1111H11.9771C8.99018 25.1111 7.49671 25.1111 6.35584 24.5298C5.35231 24.0185 4.53642 23.2026 4.02509 22.1991C3.44379 21.0582 3.44379 19.5647 3.44379 16.5778V2M12.3327 12.6667V18M19.4438 9.11111V18M26.5549 16.2222V18M37.2216 2H1.66602"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ReportsAnalysis;
