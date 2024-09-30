import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="h-screen bg-gray-800 text-white overflow-y-auto">
      <div className="p-2">
        <ul className="">
          {[...Array(8)].map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="py-2  px-2  m-1 cursor-pointer rounded">
                <div className="w-50 h-10 bg-gray-600 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
