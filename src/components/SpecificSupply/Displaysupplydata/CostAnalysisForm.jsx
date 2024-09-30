import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const CostAnalysisForm = React.memo(
  ({ formData, handleChange, handleSubmit }) => {
 

    return (
      <form
        onSubmit={handleSubmit}
        className="sm:flex sm:flex-row sm:space-x-4 sm:items-center py-2 sm:justify-center"
      >
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="firstName"
            value={formData.firstName === "~" ? "" : formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="lastName"
            value={formData.lastName === "~" ? "" : formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="email"
            value={formData.email === "~" ? "" : formData.email}
            onChange={handleChange}
            placeholder="email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 sm:mb-0 sm:flex-1">
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber === "~" ? "" : formData.contactNumber}
            onChange={handleChange}
            placeholder="contactNumber"
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

export default CostAnalysisForm;
