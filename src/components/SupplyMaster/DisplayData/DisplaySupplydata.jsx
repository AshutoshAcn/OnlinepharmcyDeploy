import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { GetSuppliernameData } from "../../../Redux/SupplyReducer/action";
import Editmodel from "../Editmodal/Editmodel";

const DisplaySupplydata = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const GetSupplydataaa = useSelector(
    (state) => state.SupplyReducer.GetSupplydataaa
  );
  const [editmodalopen, seteditmodalopen] = useState(false);
  const [sigledataId, setsingleDataId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [formData, setFormData] = useState({
    itemName: "~",
    supplierName: "~",
    cost: "~",
    contactNumber: "~",
    PageIndex: 1,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(GetSuppliernameData);
    setLoading(false);
  }, []);

  const handleGetdatasingle = (id) => {
    localStorage.setItem("suppliersingleid", id);
    setsingleDataId(id);
    seteditmodalopen(true);
  };

  // console.log("GetSupplydataaa", GetSupplydataaa);

  return (
    <div>
      <div className="px-4 py-2 w-[100%] text-[13px]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0  border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold "> Supplier List </h6>
          <h6 className="font-semibold ">
            {" "}
            No of Records : {GetSupplydataaa.length}{" "}
          </h6>
        </div>

        <div className="w-[100%] overflow-auto">
          {GetSupplydataaa === "No Record Found" ? (
            <div className="text-center">No record found</div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    Supplier Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact Person Name
                  </th>

                  <th className="border border-gray-300 px-4 py-2">
                    Contact Email
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact No
                  </th>
                  <th className="border border-gray-300 px-4 py-2">state</th>
                  <th className="border border-gray-300 px-4 py-2">City</th>
                  <th className="border border-gray-300 px-4 py-2">street</th>
                  <th className="border border-gray-300 px-4 py-2">zipCode</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Product Categories
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Tax Identification Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    License Number
                  </th>

                  <th className="border border-gray-300 px-4 py-2">Action</th>
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
                    <tr key={i} className="hover:bg-slate-100">
                      <td className="border px-4 py-2">{el.SupplierName}</td>
                      <td className="border px-4 py-2">
                        {el.ContactPersonName}
                      </td>
                      <td className="border px-4 py-2">{el?.ContactEmail}</td>
                      <td className="border px-4 py-2">{el.ContactPhoneNo}</td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.Address?.street}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.Address?.city}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.Address?.state}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.Address?.zipCode}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el.ProductCategoriesSupplied[0]?.itemName}+1
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.TaxIdentificationNumber}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {el?.LicenseNumber}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        <FaEdit
                          className="cursor-pointer"
                          title="Edit/Update"
                          onClick={() => handleGetdatasingle(el._id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {editmodalopen && (
        <Editmodel
          sigledataId={sigledataId}
          seteditmodalopen={seteditmodalopen}
        />
      )}

    
    </div>
  );
};

export default DisplaySupplydata;
