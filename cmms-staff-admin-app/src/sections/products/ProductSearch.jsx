import React from "react";
const ProductSearch = ({ onSearch }) => {
  return (
    <div class="relative max-w-xl">
      <input
        class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-1"
        type="search"
        placeholder="Search"
      />
      <button class="absolute inset-y-0 right-0 flex items-center rounded-r-md border border-gray-300 bg-gray-100 px-4 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-1">
        <svg
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductSearch;
