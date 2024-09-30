import React from "react";
import { IoIosWarning } from "react-icons/io";

const AlertModal = ({ onConfirm, onCancel }) => {


  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-[300px]">
          <div className="bg-white">
            <div className="p-5 w-full text-center">
              <span className="p-1 inline-block text-center">
                <IoIosWarning className="text-red-600 text-[30px] font-bold" />
              </span>
              <span className="block text-center w-full text-red-500">Are you sure you want to delete this?</span>
            </div>
            <div className="bg-gray-50 border-t-[1px] p-2 flex justify-center items-center">
              <div
                className="px-6 py-1 cursor-pointer bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:bg-gray-500 m-2"
                onClick={onCancel}
              >
                Cancel
              </div>
              <div
                className="px-6 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-gray-500 m-2"
                onClick={onConfirm}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
