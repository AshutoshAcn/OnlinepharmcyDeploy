import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { GetAllUsersPageAccess } from "../../Redux/PageAccessMasterReducer/action";

const PageListUser = React.memo(({ allUserPageAccessData }) => {
  const dispatch = useDispatch();
  // const [allUserPageAccessData, setAllUserPageAccessData] = useState([]);
  const [finalAllUserPageAccessData, setFinalAllUserPageAccessData] = useState(
    []
  );
  const activeusers = useSelector((state) => state.AppReducer.PageScreencheck);
  const [loading, setLoading] = useState(false);
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));

 useEffect(() => {
    const transformedData = allUserPageAccessData.map((user) => {
      const accessData = Object.entries(user.accessMaster).filter(
        ([key]) => key !== "userId"
      ); 

      const accessMasterScreens = accessData.reduce((acc, [key, value]) => {
        acc[key] = value; 
        return acc;
      }, {});

      return {
        email: user.email,
        accessMasterScreens,
      };
    });

    setFinalAllUserPageAccessData(transformedData);
    //console.log(finalAllUserPageAccessData, "tttttt"); // Log the transformed data
  }, [allUserPageAccessData]);

  // console.log(allUserPageAccessData)


  const myStyle = {
    fontSize: "13px",
  };
  // console.log("useractive", finalAllUserPageAccessData);
  
  return (
    <div style={myStyle}>
      <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0  border-gray-300 rounded-tl-lg rounded-tr-lg">
        <h6 className="font-semibold ">Users Page Access List</h6>
        <h6 className="font-semibold ">
          {" "}
          No of Record :{finalAllUserPageAccessData.length}{" "}
        </h6>
      </div>

      {/*  */}

      <div className="w-[100%] overflow-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 w-[60px]">
                S.no
              </th>
              <th className="border border-gray-300 px-4 py-2">Email Id</th>
              {finalAllUserPageAccessData?.[0]?.accessMasterScreens &&
                Object.keys(
                  finalAllUserPageAccessData[0].accessMasterScreens
                ).map((_, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from(
                  { length: finalAllUserPageAccessData.length },
                  (_, index) => (
                    <tr key={index} className="animate-pulse">
                      {[...Array(12)].map((_, tdIndex) => (
                        <td
                          key={tdIndex}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <div className="h-4 w-4 bg-gray-300 rounded"></div>
                        </td>
                      ))}
                    </tr>
                  )
                )
              : finalAllUserPageAccessData?.map((user, index) => (
                  <tr key={index} className="hover:bg-slate-100">
                    <td className="border text-center px-2 py-2">
                      {index + 1}
                    </td>
                    <td className="border text-left px-2 py-2">{user.email}</td>

                    {/* Map through the access master screens */}
                    {Object.keys(user.accessMasterScreens).map(
                      (screenKey, i) => (
                        <td key={i} className="border text-center px-2 py-2">
                          <div className="flex justify-center">
                            {user.accessMasterScreens[screenKey] === "Yes" && (
                              <TiTick className="text-green-500 text-[25px]" />
                            )}
                          </div>
                        </td>
                      )
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default PageListUser;
