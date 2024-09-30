import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import PageAcessMasterForm from "./PageAcessMasterForm";
import {
  PageAcessuserdetails,
  PageupdateAcessuserdetails,
} from "../../Redux/AuthReducer/action";
import { useNavigate } from "react-router-dom";

const ApplicationAcessMaster = () => {
  const [formData, setFormData] = useState({
    firstName: "~",
    lastName: "~",
    email: "~",
    contactNumber: "~",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PageAcessdata = useSelector(
    (state) => state.AuthReducer.PageAcessdetails
  );
  const [loading, setLoading] = useState(false);
  const [editMode, setEditmode] = useState(false);
  const [TempActive, SetTempActive] = useState("");
  const [Singledata, SetSingledata] = useState("");
  const [id, setID] = useState("");
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
  const [currentuserloggedin,setcurrentuserlogin] = useState(loggeddata?.user?.email)

    useEffect(() =>{
      const currentUser = PageAcessdata.find(user => user.email === currentuserloggedin);
      // console.log("currentUser",currentUser)
      const checkstatus = currentUser && currentUser.active === "false"
      // console.log(" inside useEffect checkstatus",checkstatus)
    },[loggeddata?.user?.email])

  useEffect(() => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.contactNumber === ""
    ) {
      setFormData({
        ...formData,
        firstName: "~",
        lastName: "~",
        email: "~",
        contactNumber: "~",
      });
    }
  }, [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.contactNumber,
  ]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      PageAcessuserdetails(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.contactNumber
      )
    )
      .then((res) => {
        //  console.log("res",res)
      })
      .catch((err) => {
        console.log("err", err);
      });
    setLoading(false);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    const regexMap = {
      firstName: /^[a-zA-Z\s]*$/,
      lastName: /^[a-zA-Z\s]*$/,
      email: /^[a-zA-Z\s]*$/,
      contactNumber: /^[\d()-]*$/,
    };

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
    dispatch(
      PageAcessuserdetails(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.contactNumber
      )
    );
  };

  // update part

  const handleGetdatasingle = useCallback(
    (id, email, active) => {
      SetSingledata({ ...Singledata, id });
      SetTempActive(active === true ? "Yes" : "No");
      setEditmode(true);
      setID(id);
    },
    [Singledata]
  );

  const HandleSave = useCallback(() => {
    const payload = {
      userId: id,
      active: TempActive === "Yes" ? true : false,
    };

    dispatch(PageupdateAcessuserdetails(payload))
      .then((res) => {
        // console.log("res", res);
        setEditmode(false);
         if(res.type === "PAGEUPDATEEMPLOYEEACESSSUCCESS"){
             if(res?.payload?.data?.message === "User account deactivated succesfully"){

             }
         }
        dispatch(
          PageAcessuserdetails(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.contactNumber
          )
        );
      })
      .catch((err) => {
        console.log("Error updating data:", err);
        setEditmode(false);
      });
  }, [
    TempActive,
    Singledata.email,
    dispatch,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.contactNumber,
  ]);

  const handleCancel = useCallback(() => {
    SetTempActive(Singledata.Active);
    setEditmode(false);
  }, [Singledata.Active]);



  const myStyle = {
    fontSize: "13px",
  };

  // console.log("isLoading",isLoading)
  //  console.log("===currentuser===",currentuserloggedin)
  // console.log("PageAcessdataPageAcessdata====", PageAcessdata);
  
  return (
    <div style={myStyle}>
      <div className="bg-slate-300 px-4">
        <PageAcessMasterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setEditmode={setEditmode}
        />
      </div>
      <div className="px-4 py-2 w-[100%]">
        <div className="flex p-2 justify-between items-center bg-gray-100 border border-b-0  border-gray-300 rounded-tl-lg rounded-tr-lg">
          <h6 className="font-semibold "> Access Master List </h6>
          <h6 className="font-semibold ">
            {" "}
            No of Records : {PageAcessdata.length}{" "}
          </h6>
        </div>

        <div className="w-[100%] overflow-auto">
          {PageAcessdata === "No Record Found" ? (
            <div className="text-center">No record found</div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">
                    User Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    First Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Last Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Email Id</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Contact No
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Active</th>
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
                    </tr>
                  ))
                ) : PageAcessdata.length > 0 ? (
                  PageAcessdata.map((el, i) => (
                    <tr key={i} className="hover:bg-slate-100">
                      <td className="border px-4 py-2">{el.username}</td>
                      <td className="border px-4 py-2">{el.firstName}</td>
                      <td className="border px-4 py-2">{el.lastName}</td>
                      <td className="border px-4 py-2">{el?.email}</td>
                      <td className="border px-4 py-2 text-center">
                        {el?.contactNumber}
                      </td>
                      <td className="border px-4 py-2 w-[60px] text-center">
                        {editMode && id === el._id ? (
                          <select
                            value={TempActive}
                            onChange={(e) => SetTempActive(e.target.value)}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        ) : (
                          <span>{el.active === true ? "Yes" : "No"}</span>
                        )}
                      </td>
                      <td className="border px-4 py-2 w-[100px]" align="center">
                        <div className="flex items-center justify-center">
                          {editMode && id === el._id ? (
                            <>
                              <button
                                onClick={HandleSave}
                                className="text-green-600 hover:text-green-800"
                              >
                                <TiTick
                                  className="text-green-500 font-extrabold text-2xl"
                                  title="Update"
                                />
                              </button>
                              <span>|</span>
                              <button
                                onClick={handleCancel}
                                className="text-red-600 hover:text-red-800"
                              >
                                <IoClose
                                  className="text-red-600 font-extrabold text-2xl"
                                  title="Cancel"
                                />
                              </button>
                            </>
                          ) : (
                            <FaEdit
                              className="cursor-pointer"
                              title="Edit/Update"
                              onClick={() =>
                                handleGetdatasingle(el._id, el.email, el.active)
                              }
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-300 px-4 py-2 text-center"
                      colSpan="5"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationAcessMaster;
