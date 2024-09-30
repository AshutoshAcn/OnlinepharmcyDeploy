import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleKeyPress } from "../customcomponents/Validatehandlekeypress";
import { ValidateForm } from "./ValidateBasicinfoForm";
import { GetitemsnameData } from "../../Redux/ItemsReducer/action";
import ErrorModal from "../../model/ErrorModal";
import SuccessModal from "../../model/SuccessModal";
import InputField from "../InputField";
import Select from "react-select";
import {
  getSingleByIdSPECIFICSupplierData,
  GetSPECIFICSuppliernameData,
  PostSPECIFICSupplier,
} from "../../Redux/SpecificReducer/action";
import DisplaySpecificSupplydata from "./Displaysupplydata/DisplaySpecific";

const SpecificSupplyMasterForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorm, setErrorm] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const [selecteditemName, setSelectedItemName] = useState("");
  const [DropdownSupplier, setDropdownSupplier] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ItemName: "",
    SupplierName: "",
    Description: "",
    Cost: "",
  });

  const Getitemsdaata = useSelector(
    (state) => state?.ItemsReducer?.GetItemsnamedataaa
  );
  const AllitemsList = Getitemsdaata?.items?.map((el) => el?.ItemName);
  // console.log("AllitemsList", AllitemsList);

  useEffect(() => {
    dispatch(GetitemsnameData);
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveData = async (e, isSubmitted = false) => {
    e.preventDefault();
    setSubmitted(true);

    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );
    const validationErrors = ValidateForm(trimmedFormData);
    setErrors(validationErrors);
    const hasErrors = Object.keys(validationErrors).length > 0;

    // console.log("trimmedFormData",trimmedFormData)

    if (!hasErrors) {
      setLoading(true);

      try {
        const res = await dispatch(PostSPECIFICSupplier(trimmedFormData));
        // console.log(":res=====", res);
        if (res.type === "POSTSPECIFICSUPPLIERSUCESSS") {
          if (res.payload.message === "Supplier Details added successfully") {
            setsucessmodal("Data Save Successfully");
            dispatch(GetSPECIFICSuppliernameData);
            setFormData({
              ItemName: "",
              SupplierName: "",
              Description: "",
              Cost: "",
            });
            setSelectedItemName("");
            setDropdownSupplier([]);
          }
        }
      } catch (err) {
        console.log("Error", err);
        setErrorm("Server down try After some times");
        setLoading(false);
      }
    }

    if (hasErrors) {
      const errorField = Object.keys(validationErrors)[0];
      const fieldElement = document.querySelector(`[name="${errorField}"]`);
      if (fieldElement) {
        fieldElement.focus();
      }
    }
    setLoading(false);
  };

  const handleFormKeypress = (e) => {
    if (e.key === "Enter") {
      handleSaveData(e, false);
    }
  };

  const handleItemNameChange = (selectedOption) => {
    setSelectedItemName(selectedOption);
    // console.log("selectedOption",selectedOption)
    dispatch(getSingleByIdSPECIFICSupplierData(selectedOption?.value))
      .then((res) => {
        //  console.log("res",res)
        setDropdownSupplier(res?.payload?.map((el) => el?.SupplierName));
      })
      .catch((err) => {
        console.log("err", err);
      });

    setFormData((prevState) => ({
      ...prevState,
      ItemName: selectedOption ? selectedOption.value : "",
    }));
  };

  // console.log("otside DropdownSupplier",DropdownSupplier)
  // console.log("formData",formData)

  const handleCloseErrorModal = () => {
    setErrorm(null);
  };

  const handleclosesucessmodal = () => {
    setsucessmodal(null);
  };

  const myStyle = {
    fontSize: "13px",
  };
  return (
    <>
      <div className="Main-Container ">
        <div style={myStyle}>
          <div className="w-full text-left bg-slate-300 p-2 relative">
            <h1 className="text-lg font-bold  text-gray-800">
              {" "}
              Supplier Specific Form
            </h1>
          </div>
          <form
            onKeyPress={handleFormKeypress}
            onSubmit={(e) => handleSaveData(e, true)}
            className="bg-white px-4 py-2 w-full"
          >
            <div className="border rounded py-2 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-2">
                <div className="mt-0">
                  <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
                    <span>Item Name</span>
                    {errors && (
                      <span className="text-red-500 ">{errors.ItemName}</span>
                    )}
                  </label>
                  <Select
                    // options={AllitemsList}
                    value={selecteditemName}
                    onChange={handleItemNameChange}
                    placeholder="Select a Item Name"
                    name="ItemName"
                    options={AllitemsList?.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>

                <InputField
                  label="Supplier Name"
                  type="select"
                  name="SupplierName"
                  value={formData.SupplierName}
                  onChange={handleInputChange}
                  options={DropdownSupplier}
                  error={submitted && errors.SupplierName}
                />

                <InputField
                  label="Description"
                  type="textarea"
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "text", 200)}
                  error={submitted && errors.Description}
                />

                <InputField
                  label="Cost"
                  type="text"
                  name="Cost"
                  value={formData.Cost}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "number", 10)}
                  error={submitted && errors.Cost}
                />

                <div className="px-20 py-2 w-[60%] m-auto border-gray-300 rounded-bl-lg rounded-br-lg flex items-center justify-center">
                  <button
                    className="bg-blue-500 py-2  m-auto text-center hover:bg-blue-700 text-white font-bold  px-10 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014.022 7.02L2.278 8.764l1.414 1.414 1.286-1.286A5.5 5.5 0 1010.5 17.5h-2.002zm2-10.582A8.006 8.006 0 0117.02 4.02L15.276 2.276A9.957 9.957 0 0012 2C6.486 2 2 6.486 2 12h4zm8 2.582A8.004 8.004 0 0119.978 16.98L21.722 15.24l-1.414-1.414-1.286 1.286a5.5 5.5 0 10-6.64-8.828l-1.287 1.286 1.414 1.414 1.25-1.25a8.001 8.001 0 017.748 10.496L19 21.016A9.956 9.956 0 0012 22c5.514 0 10-4.486 10-10h-4z"
                  ></path>
                </svg>
              </div>
            )}
          </form>
        </div>
        <DisplaySpecificSupplydata />
        {errorm && <ErrorModal msg={errorm} onClose={handleCloseErrorModal} />}

        {sucessmodel && (
          <SuccessModal msg={sucessmodel} onClose={handleclosesucessmodal} />
        )}
      </div>
    </>
  );
};

export default SpecificSupplyMasterForm;
