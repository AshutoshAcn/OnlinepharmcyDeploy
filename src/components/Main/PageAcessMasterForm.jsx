import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const PageAcessMasterForm = React.memo(
  ({ formData, handleChange, handleSubmit }) => {
    // useEffect(() =>{
    //  console.log("helllo")
    // },[])

    return (
      <form
        onSubmit={handleSubmit}
        className="sm:flex sm:flex-row sm:space-x-4 sm:items-center py-2 sm:justify-center"
      >
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="itemName"
            value={formData.itemName === "~" ? "" : formData.itemName}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="city"
            value={formData.city === "~" ? "" : formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode === "~" ? "" : formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName === "~" ? "" : formData.supplierName}
            onChange={handleChange}
            placeholder="Supplier Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="text-center sm:flex-none">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            <FaSearch title="Search" />
          </button>
        </div>
      </form>
    );
  }
);

export default PageAcessMasterForm;
