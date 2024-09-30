import React from "react";
import { TiTick } from "react-icons/ti";

const SuccessModal = ({msg,onClose}) => {


    return (
        <div className="fixed z-50 inset-0 overflow-y-auto" >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" > &#8203; </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-[300px]">
                    <div className="bg-white">
                        <div className="p-5 w-full text-center">                            
                            
                                <span className="bg-green-600 rounded-full p-1 inline-block text-center">
                                    <TiTick className="text-white text-2xl font-bold" />
                                </span>
                                <span className="block text-center w-full text-green-600">
                                 
                                    {msg}
                                </span>
                           
                        </div>
                        <div className="bg-gray-50 border-t-[1px] p-2 flex justify-center items-center">
                            <div 
                            onClick={onClose}
                            className="px-6 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-gray-500 m-2">
                                Ok
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>   );
};

export default SuccessModal;
