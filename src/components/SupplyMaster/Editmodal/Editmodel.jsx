import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../model/ErrorModal";
import SuccessModal from "../../../model/SuccessModal";
import { handleKeyPress } from "../../customcomponents/Validatehandlekeypress";
import { Citydata } from "../../../utils/City";
import { allStates } from "../../../utils/City";
import InputField from "../../InputField";
import { ValidateForm } from "./ValidateBasicinfoForm";
import Select from "react-select";
import {
  GetitemsnameData,
} from "../../../Redux/ItemsReducer/action";
import { MultiSelectCheckbox } from "./MultipleSelectCheckbox";
import { EditSupplierData, getSingleByIdSupplierData } from "../../../Redux/SupplyReducer/action";
import { fetchData } from "../../../utils/GetSingledata";

const Editmodel = ({ seteditmodalopen, sigledataId }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorm, setErrorm] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const [disableddata, setDisabled] = useState(true);
  const [prefilldisable, setprfilldisabled] = useState(true);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AllCity = Citydata?.map((el) => ({ label: el.city, value: el.city }));
  const Getitemsdaata = useSelector(
    (state) => state.ItemsReducer.GetItemsnamedataaa
  );

  // const AllitemsList = Getitemsdaata?.items?.map((el) => el?.ItemName);

  const AllitemsList = Getitemsdaata?.items?.filter((el) => el.active === true).map((el) => el.ItemName) || [];
   
  const [formData, setformData] = useState({
    SupplierName: "",
    ContactPersonName: "",
    ContactEmail: "",
    ContactPhoneNo: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    ProductCategoriesSupplied: "",
    TaxIdentificationNumber: "",
    LicenseNumber: "",
  });

  useEffect(() => {
    dispatch(GetitemsnameData);
  }, [dispatch]);
  // suppliersingleid

  const getsingledata = async () => {
    const id = sigledataId || localStorage.getItem("suppliersingleid");
    if (id) {
      try {
        const res = await fetchData(id);
        // console.log("single data resss",res)
        setData(res);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  useEffect(() => {
    getsingledata();
  }, [sigledataId, dispatch]);
  
  // console.log("====formData====",formData.ProductCategoriesSupplied.length===0)
  // console.log("====data====",data)

  //  console.log("formdata====",formData)/

  useEffect(() => {
    const getitemdata = data?.ProductCategoriesSupplied?.map(
      (item) => item.itemName
    );
    // console.log("===getitemdata===", getitemdata);

    if (data) {
      setformData({
        SupplierName: data.SupplierName,
        ContactPersonName: data.ContactPersonName,
        ContactEmail: data.ContactEmail,
        ContactPhoneNo: data.ContactPhoneNo,
        Address: data.Address.Address,
        state: data.Address.state,
        city: data.Address.city,
        street: data.Address.street,
        zipCode: data.Address.zipCode,
        ProductCategoriesSupplied: getitemdata,
        TaxIdentificationNumber: data.TaxIdentificationNumber,
        LicenseNumber: data.LicenseNumber,
      });
      setSelectedCity(data.Address.city);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setformData((prevState) => ({
      ...prevState,
      city: selectedOption ? selectedOption.value : "",
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
    //  console.log("hasErrors",hasErrors)

    const transformFormData = (data) => {
      return {
        SupplierName: data.SupplierName,
        ContactPersonName: data.ContactPersonName,
        ContactEmail: data.ContactEmail,
        ContactPhoneNo: data.ContactPhoneNo,
        Address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        
        },
        ProductCategoriesSupplied: data.ProductCategoriesSupplied.map(
          (item) => ({
            itemName: item,
            tick: true, // or false, depending on your logic
          })
        ),
        TaxIdentificationNumber: data.TaxIdentificationNumber,
        LicenseNumber: data.LicenseNumber,
      };
    };

    //  console.log("======formdataaa=======",formData.ProductCategoriesSupplied.length === 0)

      if(formData.ProductCategoriesSupplied.length === 0){
        setErrorm("Select product category");
      }

    if (!hasErrors && formData.ProductCategoriesSupplied.length>0) {
      setLoading(true);

      const payload = transformFormData(trimmedFormData);
      // console.log("payload", payload);
      try {
        const id = sigledataId || localStorage.getItem("suppliersingleid");
        const res = await dispatch(EditSupplierData(id, payload));
        // console.log(":res=====", res);

        if (res.type === "EDITITEMSUCCESS") {
          if (res.payload.message === "Supplier updated successfully") {
            setsucessmodal("Detail Update Successfully");
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

  const handleCloseErrorModal = () => {
    setErrorm(null);
  };
  const handleclosesucessmodal = () => {
    setsucessmodal(null);
  };

  const handleFormKeypress = (e) => {
    if (e.key === "Enter") {
      handleSaveData(e, false);
    }
  };

  return (
    <div>
      <div className="fixed z-50 text-[13px] sedan-sc-regular top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 sm:p-8 rounded-lg w-[100%]  sm:w-[80%] xl:w-[70%]">
          {/* ================  */}
          <div className="flex justify-end pb-4">
       
            <button
              onClick={() => seteditmodalopen(false)}
              className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
            >
              <ImCross />
            </button>
          </div>
          {/* Started form */}
          <div className="bg-white p-2 sm:p-4  shadow-lg border border-gray-400 rounded-lg w-full  m-auto">
            <form
              onKeyPress={handleFormKeypress}
              onSubmit={(e) => handleSaveData(e, true)}
              className="bg-white px-4 py-2 w-full"
            >
             
              <div className="py-0 px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                  <InputField
                    label="Supplier Name"
                    type="text"
                    name="SupplierName"
                    value={formData.SupplierName}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                    error={submitted && errors.SupplierName}
                    disabled={disableddata}
                  />
                  <InputField
                    label="Contact Person Name"
                    type="text"
                    name="ContactPersonName"
                    value={formData.ContactPersonName}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                    error={submitted && errors.ContactPersonName}
                    disabled={disableddata}
                  />
                  <InputField
                    label="Contact Email"
                    type="text"
                    name="ContactEmail"
                    value={formData.ContactEmail}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "email", 50)}
                    error={submitted && errors.ContactEmail}
                    disabled={disableddata}
                  />

                  <InputField
                    label="Contact Phone No"
                    type="text"
                    name="ContactPhoneNo"
                    value={formData.ContactPhoneNo}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "number", 10)}
                    error={submitted && errors.ContactPhoneNo}
                    disabled={disableddata}
                  />

                  <InputField
                    label="State"
                    type="text"
                    name="state"
                    value={formData.state}
                    // options={allStates}
                    onChange={handleInputChange}
                    error={submitted && errors.state}
                    disabled={disableddata}
                  />
                  <div className="mt-0">
                    <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
                      {errors && (
                        <span className="text-red-500 ">{errors.city}</span>
                      )}
                    </label>
                   
                    <InputField
                      label="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onKeyPress={(e) => handleKeyPress(e, "text", 100)}
                      error={submitted && errors.street}
                      disabled={disableddata}
                    />
                  </div>

                  <InputField
                    label="Street"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "text", 100)}
                    error={submitted && errors.street}
                    disabled={disableddata}
                  />

                  <InputField
                    label="zipCode"
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "number", 10)}
                    error={submitted && errors.zipCode}
                    disabled={disableddata}
                  />

                  {AllitemsList?.length > 0 ? (
                    <MultiSelectCheckbox
                      label="Product Categories "
                      name="ProductCategoriesSupplied"
                      options={AllitemsList}
                      value={formData?.ProductCategoriesSupplied || []}
                      // value={formData.ProductCategoriesSupplied}
                      onChange={handleInputChange}
                      error={submitted && errors.ProductCategoriesSupplied}
                    />
                  ) : (
                    ""
                  )}

                  <InputField
                    label="Tax Identification Number"
                    type="text"
                    name="TaxIdentificationNumber"
                    value={formData.TaxIdentificationNumber}
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleKeyPress(e, "none", 50)}
                    error={submitted && errors.TaxIdentificationNumber}
                    disabled={disableddata}
                  />

                  <InputField
                    label="License Number"
                    type="text"
                    name="LicenseNumber"
                    onChange={handleInputChange}
                    value={formData.LicenseNumber}
                    error={submitted && errors.LicenseNumber}
                    onKeyPress={(e) => handleKeyPress(e, "none", 50)}
                    disabled={disableddata}
                  />
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

              <div className="px-4 py-2 w-[100%]  border-gray-300 rounded-bl-lg rounded-br-lg flex justify-center">
                <button
                  className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update 
                </button>
              </div>
            </form>
          </div>

          {/* Enddd */}
        </div>
      </div>

      {errorm && <ErrorModal msg={errorm} onClose={handleCloseErrorModal} />}

      {sucessmodel && (
        <SuccessModal msg={sucessmodel} onClose={handleclosesucessmodal} />
      )}
    </div>
  );
};

export default Editmodel;
