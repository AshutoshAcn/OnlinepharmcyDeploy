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



const Dashboard = ({ activeonlineTab, setEmployeeId, employeeId, setActiveonlineTab }) => {
  const [edit, SetEdit] = useState(false);


  
  return (
    <div className="flex-grow overflow-y-auto pt-[62px]">
      {activeonlineTab === "home" && <Homelandingpage />}

      {activeonlineTab === "page access master" && (
        <div>
          <PageScreenAcess />
        </div>
      )}

      {activeonlineTab === "access master" && (
        <div>
          <ApplicationAcessMaster setActiveonlineTab={setActiveonlineTab} />
        </div>
      )}

      {activeonlineTab === "supplier portfolio" && (
        <div>
          <SupplyMasterForm setActiveonlineTab={setActiveonlineTab} />
        </div>
      )}

      {activeonlineTab === "supplier cost analysis" && (
        <div>
         <SpecificSupplyMasterForm setActiveonlineTab={setActiveonlineTab} />
        </div>
      )}

    {activeonlineTab === "product inventory" && (
        <div>
          <ItemsMasterScreen setActiveonlineTab={setActiveonlineTab} />
        </div>
      )}

      {activeonlineTab === "reports" && (
        <div>
          {/* <SpecificSupplyMasterForm setActiveonlineTab={setActiveonlineTab} /> */}
          <FinalReportScreen setActiveonlineTab={setActiveonlineTab}/>
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
