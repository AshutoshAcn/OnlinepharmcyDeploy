import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSupplierReportData } from "../../Redux/ReportReducer/action";

const FinalReportScreen = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const getreportdata = useSelector(
    (state) => state.ReportReducer.GetSupplierReportdataaa
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(GetSupplierReportData);
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const suppliers = getreportdata?.suppliers || [];
  const recordsCount = suppliers?.length;

  return (
    <div>
      <div className="px-4 py-2 w-full text-sm">
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
                  <th className="border border-gray-300 px-4 py-2">itemName</th>
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
                    <td className="border px-4 py-2">{el.SupplierName}</td>
                    <td className="border px-4 py-2">{el.ContactPersonName}</td>
                    <td className="border px-4 py-2">{el.ContactEmail}</td>
                    <td className="border px-4 py-2">{el.ContactPhoneNo}</td>
                    {/* <td className="border px-4 py-2 text-center">
                      {el.ProductCategories && el.ProductCategories.length > 0
                        ? el.ProductCategories.map((category, index) => (
                            <>
                              <div key={index}>{category.itemName}</div>
                              <div key={index}>{category.itemName}</div>
                              <div key={index}>{category.itemName}</div>
                            </>
                          ))
                        : "N/A"}
                    </td> */}
                    <td className="border px-4 py-2 text-center">
                      {el.ProductCategories && el.ProductCategories.length > 0
                        ? el.ProductCategories.map((category, index) => (
                            <div key={index}>{category.itemName}</div>
                          ))
                        : "N/A"}
                    </td>
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
      </div>
    </div>
  );
};

export default FinalReportScreen;
