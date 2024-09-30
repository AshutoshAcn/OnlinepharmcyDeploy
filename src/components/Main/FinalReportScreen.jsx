import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSupplierReportData } from "../../Redux/ReportReducer/action";
import PageAcessMasterForm from "./PageAcessMasterForm";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

const FinalReportScreen = ({ setActiveTab }) => {
  const [editMode, setEditmode] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "~",
    city: "~",
    zipCode: "~",
    supplierName: "~",
  });
  const dispatch = useDispatch();
  const getreportdata = useSelector(
    (state) => state.ReportReducer.GetSupplierReportdataaa
  );
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25); // Default page size

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    const regexMap = {
      itemName: /^[a-zA-Z\s]*$/, 
      city: /^[a-zA-Z\s]*$/, 
      zipCode: /^[0-9\s]*$/, // Allow 5-digit or 9-digit (with hyphen) zip codes
      supplierName: /^[a-zA-Z\s]*$/, // Allow letters and spaces
    };

    // If the field has a regex and it passes validation or is empty
    if (regexMap[name]?.test(trimmedValue) || trimmedValue === "") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: trimmedValue === "" ? "~" : trimmedValue,
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditmode(false);
    fetchData(pageIndex); // Fetch data for the current page
  };

  useEffect(() => {
    fetchData(pageIndex); // Fetch data when page index changes
  }, [dispatch, pageIndex, pageSize]); // Add pageSize to dependencies

  const fetchData = async (page) => {
    setLoading(true);
    await dispatch(
      GetSupplierReportData(
        formData.itemName,
        formData.city,
        formData.zipCode,
        formData.supplierName,
        pageSize,
        page
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    if (
      formData.itemName === "" ||
      formData.city === "" ||
      formData.zipCode === "" ||
      formData.supplierName === ""
    ) {
      setFormData({
        itemName: "~",
        city: "~",
        zipCode: "~",
        supplierName: "~",
      });
    }
  }, [formData]);

  const suppliers = getreportdata?.suppliers || [];
  const recordsCount = getreportdata?.pagination?.total || 0; // Get total count from pagination
  const totalPages = Math.ceil(recordsCount / pageSize);

  const handlePageChange = (direction) => {
    setPageIndex((prev) => {
      if (direction === "next" && prev < totalPages) {
        return prev + 1;
      } else if (direction === "prev" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(1); // Reset to first page when page size changes
  };

  return (
    <div>
      <div className="bg-slate-300 px-4">
        <PageAcessMasterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setEditmode={setEditmode}
        />
      </div>
      <div className="px-4 py-2 w-full text-[13px]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0 border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold">Supplier List</h6>
          <h6 className="font-semibold">No of Records: {recordsCount}</h6>
        </div>

        <div className="w-full overflow-auto">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : recordsCount === 0 ? (
            <div className="text-center">No record found</div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Item Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Supplier Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact Person Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    City
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                  Zip Code
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact No
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Cost</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tax Identification Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    License Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((el, i) => (
                  <tr key={i} className="hover:bg-slate-100">
                    <td className="border px-4 py-2 text-center">
                      {el.ProductCategories && el.ProductCategories.length > 0
                        ? el.ProductCategories.map((category, index) => (
                            <div key={index}>{category.itemName}</div>
                          ))
                        : "N/A"}
                    </td>
                    <td className="border px-4 py-2">{el.SupplierName}</td>
                    <td className="border px-4 py-2">{el.ContactPersonName}</td>
                    <td className="border px-4 py-2">{el?.Address?.city}</td>
                    <td className="border px-4 py-2">{el?.Address?.zipCode}</td>
                    <td className="border px-4 py-2">{el.ContactEmail}</td>
                    <td className="border px-4 py-2">{el.ContactPhoneNo}</td>
                    <td className="border px-4 py-2 text-center">
                      {el.ProductCategories && el.ProductCategories.length > 0
                        ? el.ProductCategories.map((category, index) => (
                            <div key={index}>{category.Cost}</div>
                          ))
                        : "N/A"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {el.ProductCategories && el.ProductCategories.length > 0
                        ? el.ProductCategories.map((category, index) => (
                            <div key={index}>{category.Description}</div>
                          ))
                        : "N/A"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {el.TaxIdentificationNumber}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {el.LicenseNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4">
          <div className="flex items-center">
            <button
              className={`px-4 py-2 mr-2 bg-gray-200 text-black rounded-l ${
                pageIndex === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPageIndex(1)} // Set to first page
              disabled={pageIndex === 1}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button
              className={`px-4 py-2 bg-gray-200 text-black rounded-l ${
                pageIndex === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange("prev")}
              disabled={pageIndex === 1}
            >
              <MdKeyboardArrowLeft />
            </button>
          </div>

          <div className="flex items-center mx-4">
            {" "}
            {/* Added mx-4 for spacing between divs */}
            <label htmlFor="pageSize" className="mr-2">
              Page Size:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded p-1"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </select>
          </div>

          <span className="mx-4">
            Page {pageIndex} of {totalPages}
          </span>

          <div className="flex items-center">
            <button
              className={`px-4 py-2  mr-2 bg-gray-200 text-black rounded-r ${
                pageIndex === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange("next")}
              disabled={pageIndex === totalPages}
            >
              <MdKeyboardArrowRight />
            </button>
            <button
              className={`px-4 py-2  mr-2 bg-gray-200 text-black rounded-r ${
                pageIndex === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setPageIndex(totalPages)} // Set to last page
              disabled={pageIndex === totalPages}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReportScreen;
