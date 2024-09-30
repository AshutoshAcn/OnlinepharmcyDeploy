import React, { useEffect, useState } from "react";
import OnboardingInterviewprocess from "../assets/OnboardingInterviewprocess.png";
import OnlinePharmcy from "../assets/Pharmcy.jpg";
// import OnlinePharmcy from "../assets/Pharmacy.jpg"
import ApplicationAcessMaster from "../AcessControl/Page/ApplicationAcessMaster";
import SupplyMasterForm from "../components/SupplyMaster/Form/SupplyMasterForm";
import ItemsMasterScreen from "../components/ItemsMaster/ItemsMasterScreen";
import SpecificSupplyMasterForm from "../components/SpecificSupply/SpecificSupplyMasterForm";
import PageScreenAcess from "../AcessControl/Master/PageScreenAcess";
import FinalReportScreen from "../components/Main/FinalReportScreen";



const Dashboard = ({ activeTab, setEmployeeId, employeeId, setActiveTab }) => {
  const [edit, SetEdit] = useState(false);


  
  return (
    <div className="flex-grow overflow-y-auto pt-[62px]">
      {activeTab === "home" && <Homelandingpage />}

      {activeTab === "pageaccessmaster" && (
        <div>
          <PageScreenAcess />
        </div>
      )}

      {activeTab === "accessmaster" && (
        <div>
          <ApplicationAcessMaster setActiveTab={setActiveTab} />
        </div>
      )}

      {activeTab === "supplierportfolio" && (
        <div>
          <SupplyMasterForm setActiveTab={setActiveTab} />
        </div>
      )}

      {activeTab === "suppliercostanalysis" && (
        <div>
         <SpecificSupplyMasterForm setActiveTab={setActiveTab} />
        </div>
      )}

    {activeTab === "productinventory" && (
        <div>
          <ItemsMasterScreen setActiveTab={setActiveTab} />
        </div>
      )}

      {activeTab === "reports" && (
        <div>
          {/* <SpecificSupplyMasterForm setActiveTab={setActiveTab} /> */}
          <FinalReportScreen setActiveTab={setActiveTab}/>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

function Homelandingpage() {
  return (
    <div className="w-[100%] flex-row  justify-center items-center">
      {/* <h1 className="text-center text-2xl font-extrabold text-blue-400 p-8">
        Online Pharmcy
      </h1> */}
      <div className="text-center py-10">
        <img
          src={OnlinePharmcy}
          className="max-w-[1200px] w-[100%] inline-block"
        />
      </div>
    </div>
  );
}
