import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { GetSuppliernameData } from "../../../Redux/SupplyReducer/action";
import { GetSPECIFICSuppliernameData } from "../../../Redux/SpecificReducer/action";

const DisplaySpecificSupplydata = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const GetSupplydataaa = useSelector(
    (state) => state.SpecificReducer.GetSpecificSupplydataaa
  );
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25)
  const [loading, setLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "~",
    supplierName: "~",
    cost: "~",
    contactNumber: "~",
    PageIndex: 1,
  });
  const [searchData, setSearchData] = useState({
    itemName: "~",
    supplierName: "~",
    cost: "~",
    contactNumber: "~",
    PageIndex: 1,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(GetSPECIFICSuppliernameData(
      formData.itemName,
      formData.supplierName,
      formData.cost,
      formData.contactNumber,
      formData.PageIndex,
      pageSize
    )
  );
    setLoading(false);
  }, [dispatch,formData,pageSize]);

   console.log("----GetSupplydataaa---",GetSupplydataaa)

  // useEffect(() => {
  //   if (GetSupplydataaa && GetSupplydataaa.length > 0) {
  //     setEmployeesData(GetSupplydataaa);
  //     const totalEntries = GetSupplydataaa[0].Rowscount;
  //     const totalPages = Math.ceil(totalEntries / pageSize);
  //     // Update currentPage if it exceeds totalPages
  //     if (currentPage > totalPages) {
  //       setCurrentPage(totalPages);
  //     }
  //   } else {
  //     setEmployeesData([]);
  //   }
  // }, [GetSupplydataaa, currentPage, pageSize]);

  const handleSubmit = (e) => {
    dispatch(
      GetResumeDetails(
        searchData.itemName,
        searchData.supplierName,
        searchData.cost,
        searchData.contactNumber,
        searchData.PageIndex,
        pageSize
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (trimmedValue || trimmedValue === "") {
      setSearchData((prevFormData) => ({
        ...prevFormData,
        [name]: trimmedValue === "" ? "~" : trimmedValue,
      }));
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setFormData((prevFormData) => ({
      ...prevFormData,
      PageIndex: 1, // Update PageIndex in form data
    }));
    // setCurrentPage(1);
    dispatch(
      GetSPECIFICSuppliernameData(
       formData.itemName,
      formData.supplierName,
      formData.cost,
      formData.contactNumber,
      formData.PageIndex,
      pageSize
      )
    ); // Reset to first page when page size changes
  };

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  // Calculate total pages
  const AlltotalPages = GetSupplydataaa?.pagination?.totalPages;

  //  console.log("===AlltotalPages",AlltotalPages)


  return (
    <div>


      <div className="px-4 py-2 w-[100%] text-[13px]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0  border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold "> Specific Master List </h6>
          <h6 className="font-semibold ">
            {" "}
            No of Records : {GetSupplydataaa.length}{" "}
          </h6>
        </div>

        <div className="w-[100%] overflow-auto h-[70vh] ">
          {GetSupplydataaa === "No Record Found" ? (
            <div className="text-center">No record found</div>
          ) : (
            <table className="table-auto w-full ">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Supplier Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">ItemName</th>
                  <th className="border border-gray-300 px-4 py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 20 }, (_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : GetSupplydataaa.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="border px-4 py-2 text-center">
                      No Records
                    </td>
                  </tr>
                ) : (
                  GetSupplydataaa.length > 0 &&
                  GetSupplydataaa?.map((el, i) => (
                    <tr key={i} className="hover:bg-slate-100 text-center">
                      <td className="border px-4 py-2">{el.SupplierName}</td>
                      <td className="border px-4 py-2">{el.Description}</td>

                      <td className="border px-4 py-2">{el.ItemName}</td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el.Cost}
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

        {/* {employeesData.length === 0 ? (
            <div></div>
          ) : (
            <div className="flex  p-1 justify-between items-center bg-gray-100 border border-t-0 border-gray-300">
              <div>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="75">75 per page</option>
                  <option value="100">100 per page</option>
                </select>
              </div>
              <div>
                <span>
                  <span>{formData.PageIndex}</span> / <span>{totalPages}</span>
                </span>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={formData.PageIndex === 1}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <FaFastBackward />
                </button>

                <button
                  onClick={() => handlePageChange(formData.PageIndex - 1)}
                  disabled={formData.PageIndex === 1}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <FaCaretLeft />
                </button>

                <button
                  onClick={() => handlePageChange(formData.PageIndex + 1)}
                  disabled={formData.PageIndex === totalPages}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <FaCaretRight />
                </button>

                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={formData.PageIndex === totalPages}
                  className="border border-gray-300 px-2 py-1 rounded-md"
                >
                  <FaFastForward />
                </button>
              </div>
            </div>
          )} */}
    </div>
  );
};

export default DisplaySpecificSupplydata;
