import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import AlertModal from "../model/AlertModal";
import { LoadLoggedusermenulist } from "../Redux/AuthReducer/action";

const Sidebar = React.memo(
  ({
    setActiveonlineTab,
    activeonlineTab,
    Loadusermenulist,
    navbartoggle,
    setNavbartoggle,
  }) => {
    const [alertModel, setAlertModel] = useState(null);
    const [changeTab, setChangeTab] = useState("");
    const dispatch = useDispatch();
    const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
    
  useEffect(() => {
    dispatch(LoadLoggedusermenulist(loggeddata?.user?.access?.userId));
  }, [loggeddata?.user?.access?.userId]);

    useEffect(() => {
      dispatch(LoadLoggedusermenulist(loggeddata?.user?.access?.userId));
      const savedTab = localStorage.getItem("activeonlineTab");
      if (savedTab) {
        setActiveonlineTab(savedTab);
      }
    }, [Loadusermenulist]);
    // console.log("Loadusermenulist", Loadusermenulist);

    const handleTabClick = (tab) => {
      if (localStorage.activeonlineTab === "interview phase viewHr") {
        setAlertModel("Are you sure you want to exit this phase?");
        setChangeTab(tab);
      } else {
        localStorage.removeItem("secondphaseempid");
        localStorage.removeItem("secondphaseemail");

        setActiveonlineTab(tab);
        localStorage.setItem("activeonlineTab", tab);
      }
    };

    const handleYesAlertModal = () => {
      setAlertModel(null);

      setActiveonlineTab(changeTab);
      localStorage.setItem("activeonlineTab", changeTab);
    };
    const handleNoAlertModal = () => {
      setAlertModel(null);
    };

    const myStyle = {
      fontSize: "13px",
    };

    return (
      <div
        style={myStyle}
        className={`h-screen bg-gray-800 text-white w-[200px] fixed z-30 transition-all   md:ms-0 ${
          navbartoggle === true ? "" : "-ms-[200px]"
        }`}
      >
        {navbartoggle === true ? (
          <IoCloseSharp
            onClick={() => setNavbartoggle(false)}
            className="md:hidden absolute -right-[50px] top-5 text-white bg-red-600 p-2 rounded text-[35px] cursor-pointer"
          />
        ) : (
          ""
        )}

        <div className="py-2">
          <hr className="mt-2 border-gray-600" />
          <ul>
            {Loadusermenulist?.length > 0 ? (
              Loadusermenulist?.map((menuItem, index) => (
                menuItem.Access === "Yes" ? 
                <li
                  key={index}
                  className={`py-2 px-4 cursor-pointer hover:bg-slate-700 transition-colors duration-300 border-b border-dashed border-gray-500 ${
                    activeonlineTab === menuItem?.PageName.toLowerCase()
                      ? "bg-gray-600"
                      : ""
                  }`}
                  onClick={() =>
                    handleTabClick(menuItem?.PageName.toLowerCase())
                  }
                >
                  <span className="flex justify-start items-center">
                    <IoMdArrowRoundForward className="me-[10px] text-[12px]" />{" "}
                    <span>{menuItem.Access === "Yes" ? menuItem.PageName : ""}</span>
                  </span>
                </li>:""
              ))
            ) : (
              <div className="h-screen bg-gray-800 text-white overflow-y-auto">
                <div className="p-2">
                  <ul className="">
                    {[...Array(8)].map((_, index) => (
                      <li key={index} className="animate-pulse">
                        <div className="py-2  px-2  m-1 cursor-pointer rounded">
                          <div className="w-50 h-10 bg-gray-600 rounded"></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </div>

        {alertModel && (
          <AlertModal
            msg={alertModel}
            onYes={handleYesAlertModal}
            onNo={handleNoAlertModal}
          />
        )}
      </div>
    );
  }
);

export default Sidebar;
