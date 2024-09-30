import { useNavigate } from "react-router-dom";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import AllRoutes from "./Routes/AllRoutes";

const BrowserWarning = () => (
  <div className="p-5 text-center py-10">
    <img src={Browserlogo} alt="Browser Warning" className="m-auto" />
  </div>
);

function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (/MSIE|Trident/.test(userAgent)) {
    return "Internet Explorer";
  } else if (/Edg/.test(userAgent)) {
    return "Edge";
  } else {
    return "Other";
  }
}

function App() {
  const [unsupportedBrowser, setUnsupportedBrowser] = useState(false);
  const navigate = useNavigate();
  const sessionTimeoutRef = useRef(null);
  const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
  const handleSessionTimeout = useCallback(() => {
    const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
    if (loggeddata !== null) {
      sessionTimeoutRef.current = setTimeout(() => {
        localStorage.clear();
        navigate("/login");
        alert("Session expired. Please log in again.");
      }, 3600000);
    }
  }, [loggeddata, navigate]);

  const clearSessionTimeout = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
      sessionTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const browser = detectBrowser();
    if (browser === "Internet Explorer" || browser === "Edge") {
      setUnsupportedBrowser(true);
    }
    if (loggeddata !== null) {
      handleSessionTimeout();
    }
    // handleSessionTimeout();
    return () => clearSessionTimeout();
  }, [handleSessionTimeout, loggeddata]);

  useEffect(() => {
    const browser = detectBrowser();
    if (browser === "Internet Explorer" || browser === "Edge") {
      setUnsupportedBrowser(true);
    }
    if (loggeddata !== null) {
      handleSessionTimeout();
    }
    return () => clearSessionTimeout();
  }, [handleSessionTimeout, loggeddata]);

  useEffect(() => {
    if (loggeddata === null) {
      clearSessionTimeout();
    }
  }, [loggeddata]);

  return (
    <>
      <AllRoutes/>
    </>
  );
}

export default App;
