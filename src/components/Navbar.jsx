import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUTSUCCESS } from "../Redux/AuthReducer/actiotypes";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";


const Navbar = ({ navbartoggle, setNavbartoggle }) => {
  const dispatch = useDispatch();
  const tokendta = useSelector((state) => state.AuthReducer.isAuthenticated);
  const token = useSelector((state) => state.AuthReducer.token);
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
  const [loading, SetLoading] = useState(false);


  useEffect(() => {
    SetLoading(false);
  }, []);

  const handleLogout = () => {
    dispatch({ type: LOGOUTSUCCESS });
    localStorage.clear();
  };

  

  return (
    <nav className="bg-slate-50 shadow w-[100%] h-[62px] right-0 top-0 fixed z-10 flex justify-between items-center px-2">
      <div>
        <FaBars
          className="text-2xl cursor-pointer text-gray-700 md:hidden"
          onClick={() => setNavbartoggle(true)}
        />
      </div>
      <div className="flex space-x-4 items-center">
         {loggeddata?.user && (
          <h2 className="flex items-center">
            <FaUser className="me-2" /> {loggeddata.user.firstName}
          </h2>
        )}
        <div>|</div>
        <div onClick={handleLogout}>
          <Link
            to={"/login"}
            className="rounded bg-red-600 block p-2 text-yellow-200 font-extrabold hover:opacity-80 hover:text-white"
          >
            {tokendta ? (
              <FiLogOut className="text-[20px]" title="LogOut" />
            ) : (
              <FiLogOut className="text-[20px]" title="LogOut" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
