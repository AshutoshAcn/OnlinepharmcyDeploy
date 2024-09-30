import React, { useEffect, useState } from "react";
import ListScreen from "./ListScreen";
import PageListUser from "./PageListUser";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsersPageAccess } from "../../Redux/PageAccessMasterReducer/action";
import "./style.css";

const PageScreenAcess = () => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allUserPageAccessData, setAllUserPageAccessData] = useState([]);
  const [userEmailPageAccessData, setUserEmailPageAccessData] = useState([]);
  const [finalUpdatedAccessMaster, setFinalUpdatedAccessMaster] = useState([]);
  const GetAllUsersPageAccessData = useSelector(
    (state) => state.PageAccessMasterReducer.getAllUsersPageAccessData
  );

  useEffect(() => {
    // setLoading(true); 
    dispatch(GetAllUsersPageAccess)
      .then((res) => {
      
        if (res.type === "GETALLUSERSPAGEACCESSSUCCESS") {
          //setLoading(false); // Stop loading if there is data
        } else {
          //setLoading(false); // Also stop loading if no data is received
        }
      })
      .catch((error) => {
        //console.error("Error fetching user access data:", error);
        // setLoading(false); 
      });
  }, [dispatch]);


  useEffect(() => {
    // setLoading(true);
    if (GetAllUsersPageAccessData && GetAllUsersPageAccessData.length > 0) {
      setAllUserPageAccessData(GetAllUsersPageAccessData);
      // setLoading(false);
    }
    //setLoading(false);
  }, [GetAllUsersPageAccessData]);
  useEffect(() => {
    const transformedData = allUserPageAccessData.map((user) => {
      return {
        email: user.email,
        userId: user._id,
      };
    });

    setUserEmailPageAccessData(transformedData);
  }, [allUserPageAccessData]);

  const [selectedUser, setSelectedUser] = useState("");

  const PageAcessEmailDropdown = useSelector(
    (state) => state.AppReducer.PageAcessEmailDropdown
  );
  const pageAcesslistSCreen = useSelector(
    (state) => state.AppReducer.PageAcessListScreen
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const selectedEmail = e.target.value;
    setSelectedUser(selectedEmail); // Update the selected user

    // Find the corresponding userId based on the selected email
    const selectedUser = userEmailPageAccessData.find(
      (user) => user.email === selectedEmail
    );

    if (selectedUser) {
      setSelectedUserId(selectedUser.userId);
      console.log("User ID:", selectedUser.userId); // Log the userId to console
    }
  };

  const selectedUserData = allUserPageAccessData.find(
    (user) => user.email === selectedUser
  );

  const myStyle = {
    fontSize: "13px",
  };
  return (
    <div style={myStyle}>
      <div className="bg-slate-300 px-4 py-2 flex">
        <form onSubmit={handleSubmit}>
          <select
            className="block w-[250px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={selectedUser}
            onChange={handleChange}
          >
            <option value={"Select"}>Select </option>
            {userEmailPageAccessData?.map((user, i) => (
              <option key={i} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </form>
        {/* <button onClick={handleSave}>Update</button> */}
      </div>

      <div className="md:flex md:gap-2 px-4 py-2">
        <div className="md:w-[30%]">
          {selectedUser === " " ? (
            <ListScreen
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              allUserPageAccessData={allUserPageAccessData}
              setFinalUpdatedAccessMaster={setFinalUpdatedAccessMaster}
              selectedUserId={selectedUserId}
            />
          ) : (
            <ListScreen
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              allUserPageAccessData={allUserPageAccessData}
              setFinalUpdatedAccessMaster={setFinalUpdatedAccessMaster}
              selectedUserId={selectedUserId}
            />
          )}
        </div>
        <div className="md:w-[70%] md:mt-0 mt-2">
          <PageListUser allUserPageAccessData={allUserPageAccessData} />
        </div>
   
      </div>
    </div>
  );
};

export default PageScreenAcess;
