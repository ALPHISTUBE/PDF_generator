import React from "react";

const ExpenseTracker = ({ color = "#98A2B3", width = "32", height = "32" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
  >
    <g clipPath="url(#clip0_4209_33618)">
      <path
        d="M8 12C3.43867 12 0 14.0067 0 16.6667V27.3333C0 29.9933 3.43867 32 8 32C12.5613 32 16 29.9933 16 27.3333V16.6667C16 14.0067 12.5613 12 8 12ZM13.3333 22C13.3333 22.7053 11.308 24 8 24C4.692 24 2.66667 22.7053 2.66667 22V20.2027C4.06133 20.9133 5.91333 21.3333 8 21.3333C10.0867 21.3333 11.9387 20.9133 13.3333 20.2027V22ZM8 14.6667C11.308 14.6667 13.3333 15.9613 13.3333 16.6667C13.3333 17.372 11.308 18.6667 8 18.6667C4.692 18.6667 2.66667 17.372 2.66667 16.6667C2.66667 15.9613 4.692 14.6667 8 14.6667ZM8 29.3333C4.692 29.3333 2.66667 28.0387 2.66667 27.3333V25.536C4.06133 26.2467 5.91333 26.6667 8 26.6667C10.0867 26.6667 11.9387 26.2467 13.3333 25.536V27.3333C13.3333 28.0387 11.308 29.3333 8 29.3333ZM32 6.66667V25.3333C32 29.0093 29.0093 32 25.3333 32H18.6667C17.9293 32 17.3333 31.4027 17.3333 30.6667C17.3333 29.9307 17.9293 29.3333 18.6667 29.3333H25.3333C27.5387 29.3333 29.3333 27.5387 29.3333 25.3333V6.66667C29.3333 4.46133 27.5387 2.66667 25.3333 2.66667H12C9.79467 2.66667 8 4.46133 8 6.66667V8C8 8.736 7.404 9.33333 6.66667 9.33333C5.92933 9.33333 5.33333 8.736 5.33333 8V6.66667C5.33333 2.99067 8.324 0 12 0H25.3333C29.0093 0 32 2.99067 32 6.66667ZM17.3333 13.3333C16.596 13.3333 16 12.736 16 12C16 11.264 16.596 10.6667 17.3333 10.6667H24V8H13.3333V8.66667C13.3333 9.40267 12.7373 10 12 10C11.2627 10 10.6667 9.40267 10.6667 8.66667V8C10.6667 6.52933 11.8627 5.33333 13.3333 5.33333H24C25.4707 5.33333 26.6667 6.52933 26.6667 8V10.6667C26.6667 12.1373 25.4707 13.3333 24 13.3333H17.3333ZM18.6667 24C18.6667 23.264 19.2627 22.6667 20 22.6667H25.3333C26.0707 22.6667 26.6667 23.264 26.6667 24C26.6667 24.736 26.0707 25.3333 25.3333 25.3333H20C19.2627 25.3333 18.6667 24.736 18.6667 24ZM18.6667 18.6667V17.3333C18.6667 16.5973 19.2627 16 20 16C20.7373 16 21.3333 16.5973 21.3333 17.3333V18.6667C21.3333 19.4027 20.7373 20 20 20C19.2627 20 18.6667 19.4027 18.6667 18.6667ZM26.6667 18.6667C26.6667 19.4027 26.0707 20 25.3333 20C24.596 20 24 19.4027 24 18.6667V17.3333C24 16.5973 24.596 16 25.3333 16C26.0707 16 26.6667 16.5973 26.6667 17.3333V18.6667Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_4209_33618">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ExpenseTracker;