import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { LoadLoggedusermenulist } from "../../Redux/AuthReducer/action";
import Navbar from "../../components/Navbar";

const HomeControl = () => {
  const [activeonlineTab, setActiveonlineTab] = useState("home");
  const [employeeId, setEmployeeId] = useState(null);
  const [navbartoggle, setNavbartoggle] = useState(false);
  const dispatch = useDispatch();
  const Loadusermenulist = useSelector(
    (state) => state.AuthReducer.LOGGEDUSERMENULIST
  );
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));

  useEffect(() => {
    dispatch(LoadLoggedusermenulist(loggeddata?.user?.access?.userId));
  }, [loggeddata?.user?.access?.userId]);

  // console.log("===Loadusermenulist===", Loadusermenulist);

  useEffect(() => {
    const savedTab = localStorage.getItem("localmpid");
    if (savedTab) {
      setEmployeeId(savedTab);
    }
  }, []);

  return (
    <>
      <Sidebar
        Loadusermenulist={Loadusermenulist}
        setActiveonlineTab={setActiveonlineTab}
        activeonlineTab={activeonlineTab}
        navbartoggle={navbartoggle}
        setNavbartoggle={setNavbartoggle}
      />

      <div className="md:w-[100%-200px] md:ms-[200px] relative">
        {navbartoggle === false ? (
          ""
        ) : (
          <div
            className="fixed w-[100%] h-screen bg-black opacity-40 left-0 top-0 z-20 transition-all  md:hidden"
            onClick={() => setNavbartoggle(false)}
          ></div>
        )}

        <Navbar navbartoggle={navbartoggle} setNavbartoggle={setNavbartoggle} />

        <Dashboard
          activeonlineTab={activeonlineTab}
          setActiveonlineTab={setActiveonlineTab}
          setEmployeeId={setEmployeeId}
          employeeId={employeeId}
        />
      </div>
    </>
  );
};

export default HomeControl;
