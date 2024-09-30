import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { GetSPECIFICSuppliernameData } from "../../../Redux/SpecificReducer/action";
import CostAnalysisForm from "./CostAnalysisForm";

const DisplaySpecificSupplydata = ({ setActiveonlineTab }) => {
  const dispatch = useDispatch();
  const GetSupplydataaa = useSelector(
    (state) => state.SpecificReducer.GetSpecificSupplydataaa
  );
  const [pageSize] = useState(25); // Keeping pageSize fixed for now
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ItemName: "~",
    supplierName: "~",
    cost: "~",
    PageIndex: 1,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(
      GetSPECIFICSuppliernameData(
        formData.ItemName,
        formData.supplierName,
        formData.cost,
        pageSize,
        formData.PageIndex
      )
    );
    setLoading(false);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    // Fetch the data based on the form data
    dispatch(
      GetSPECIFICSuppliernameData(
        formData.ItemName,
        formData.supplierName,
        formData.cost,
        pageSize,
        formData.PageIndex
      )
    ).finally(() => {
      setLoading(false); // Hide loading spinner after the fetch is complete
    });
  };

  // console.log("GetSupplydataaa",GetSupplydataaa)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    const regexMap = {
      ItemName: /^[a-zA-Z\s]*$/,
      supplierName: /^[a-zA-Z\s]*$/,
      cost: /^[0-9\s]*$/,
    };
    if (regexMap[name]?.test(trimmedValue) || trimmedValue === "") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: trimmedValue === "" ? "~" : trimmedValue,
      }));
    }
  }, []);

  return (
    <div>
      <div className="bg-slate-300 px-4 ">
        <CostAnalysisForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="px-4 py-2 w-[100%] text-[13px]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0 border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold"> Specific Master List </h6>
          <h6 className="font-semibold">
            {" "}
            No of Records : {GetSupplydataaa?.length}{" "}
          </h6>
        </div>

        <div className="w-[100%] overflow-auto h-[70vh]">
          {GetSupplydataaa === "No Record Found" ? (
            <div className="text-center">No record found</div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ItemName</th>

                  <th className="border border-gray-300 px-4 py-2">
                    Supplier Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
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
                ) : GetSupplydataaa?.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="border px-4 py-2 text-center">
                      No Records
                    </td>
                  </tr>
                ) : (
                  GetSupplydataaa?.length > 0 &&
                  GetSupplydataaa?.map((el, i) => (
                    <tr key={i} className="hover:bg-slate-100 text-center">
                      <td className="border px-4 py-2">{el.ItemName}</td>
                      <td className="border px-4 py-2">{el.SupplierName}</td>
                      <td className="border px-4 py-2">{el.Description}</td>
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
    </div>
  );
};

export default DisplaySpecificSupplydata;
