import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadLoggedusermenulist, PageupdateAcessuser } from "../../Redux/AuthReducer/action";
import SuccessModal from "../../model/SuccessModal";
import ErrorModal from "../../model/ErrorModal";
import { GetAllUsersPageAccess, PutUserPageAccessMaster } from "../../Redux/PageAccessMasterReducer/action";

const ListScreen = React.memo(({ selectedUserId, selectedUser, setSelectedUser, allUserPageAccessData, setFinalUpdatedAccessMaster }) => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [errormodel, setErrormodel] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
  // Filter the user data based on selectedUser email
  const selectedUserData = allUserPageAccessData.find(user => user.email === selectedUser);

  useEffect(() => {
    dispatch(LoadLoggedusermenulist(loggeddata?.user?.access?.userId));
  }, [loggeddata?.user?.access?.userId]);

  useEffect(() => {
    if (selectedUserData) {
      const initialCheckedItems = ["Home"]; // Always include "Home"
      Object.entries(selectedUserData.accessMaster).forEach(([key, value]) => {
        if (key !== "userId" && value === "Yes" && key !== "Home") {
          initialCheckedItems.push(key); 
        }
      });
      setCheckedItems(initialCheckedItems);
      setAllChecked(initialCheckedItems.length === Object.keys(selectedUserData.accessMaster).length - 1);
    }
  }, [selectedUser, selectedUserData]);

  const handleCheckboxChange = (screen) => {
    const index = checkedItems.indexOf(screen);
    let updatedCheckedItems = [];

    if (screen === "Home") {
      // "Home" checkbox should always remain checked
      updatedCheckedItems = [...checkedItems];
    } else {
      if (index === -1) {
        updatedCheckedItems = [...checkedItems, screen];
      } else {
        updatedCheckedItems = checkedItems?.filter((pid) => pid !== screen);
      }
    }
    setCheckedItems(updatedCheckedItems);
    setAllChecked(updatedCheckedItems.length === Object?.keys(selectedUserData.accessMaster).length - 1);
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) {
      setErrormodel("Select Email");
      return;
    }

    const updatedAccessMaster = {
      ...Object.fromEntries(
        Object.keys(selectedUserData?.accessMaster)
          .filter(key => key !== "userId") // Exclude "userId"
          .map(key => [
            key,
            checkedItems.includes(key) ? "Yes" : "No"
          ])
      )
    };

    // Log the updated access master object to the console
    setFinalUpdatedAccessMaster(updatedAccessMaster);
 

    try {
      const result = await dispatch(PutUserPageAccessMaster(selectedUserId)(updatedAccessMaster));
      // console.log(result);
      if (result.message === "AccessMaster updated successfully") {
        setsucessmodal("Access updated successfully!");
        setSelectedUser("Select"); // Uncomment if you want to reset the selected user
        dispatch(GetAllUsersPageAccess);
        dispatch(LoadLoggedusermenulist(loggeddata?.user?.access?.userId));
      }
    } catch (error) {
      console.error("Error updating access:", error);
      setErrormodel("Failed to update access.");
    }
  };

  const handleCheckAll = () => {
    if (allChecked) {
      setCheckedItems(["Home"]); 
      setAllChecked(false);
    } else {
      const allScreens = Object?.keys(selectedUserData.accessMaster)?.filter(key => key !== "userId");
      setCheckedItems(allScreens);
      setAllChecked(true);
    }
  };

  const firstUserAccessMaster = allUserPageAccessData?.length > 0 ? allUserPageAccessData[0].accessMaster : {};
  // console.log(selectedUserData?.accessMaster,'hhhiiieeeee')

  return (
    <>
      <div className="w-[100%] overflow-auto max-h-[200px] md:max-h-[100%]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0 border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold ">Master List Of Screens</h6>
        </div>
        {selectedUser === "Select" || !selectedUser ? (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 w-[50px]">
                  S.no
                </th>
                <th className="border border-gray-300 px-4 py-2">Screen</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(firstUserAccessMaster).filter(([key]) => key !== "userId").map(([screenName], index) => (
                <tr key={screenName} className="hover:bg-slate-100">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2">{screenName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 w-[50px]">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleCheckAll}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2 w-[50px]">
                  S.no
                </th>
                <th className="border border-gray-300 px-4 py-2">Screen</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedUserData.accessMaster).filter(([key]) => key !== "userId").map(([key], index) => (
                <tr key={key} className="hover:bg-slate-100">
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(key) || key === "Home"} // Always check "Home"
                      onChange={() => handleCheckboxChange(key)}
                    />
                  </td>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button className="btn btn-primary mt-5 border border-blue-500 bg-blue-500 text-white p-2" onClick={handleSaveChanges}>Update</button>
      {sucessmodel && <SuccessModal msg={sucessmodel} onClose={() => setsucessmodal(null)} />}
      {errormodel && <ErrorModal msg={errormodel} onClose={() => setErrormodel(null)} />}
    </>
  );
});

export default ListScreen;
