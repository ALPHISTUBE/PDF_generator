import React from "react";

const ClipboardList = ({ color = "#667085", height = "12", width = "13" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M14.375 1.25H5.625C3.9 1.25 2.5 2.65 2.5 4.375V16.7187C2.5 17.8375 3.4125 18.75 4.53125 18.75C4.96875 18.75 5.4 18.6062 5.75 18.3437L7.5 17.0312L9.625 18.625C9.84375 18.7937 10.15 18.7937 10.375 18.625L12.5 17.0312L14.25 18.3437C14.6 18.6062 15.0312 18.75 15.4688 18.75C16.5875 18.75 17.5 17.8375 17.5 16.7187V4.375C17.5 2.65 16.1 1.25 14.375 1.25ZM13.125 13.75H6.875C6.53125 13.75 6.25 13.4687 6.25 13.125C6.25 12.7812 6.53125 12.5 6.875 12.5H13.125C13.4688 12.5 13.75 12.7812 13.75 13.125C13.75 13.4687 13.4688 13.75 13.125 13.75ZM13.125 10H6.875C6.53125 10 6.25 9.71875 6.25 9.375C6.25 9.03125 6.53125 8.75 6.875 8.75H13.125C13.4688 8.75 13.75 9.03125 13.75 9.375C13.75 9.71875 13.4688 10 13.125 10ZM13.125 6.25H6.875C6.53125 6.25 6.25 5.96875 6.25 5.625C6.25 5.28125 6.53125 5 6.875 5H13.125C13.4688 5 13.75 5.28125 13.75 5.625C13.75 5.96875 13.4688 6.25 13.125 6.25Z"
      fill="#667085"
    />
  </svg>
);

export default ClipboardList;