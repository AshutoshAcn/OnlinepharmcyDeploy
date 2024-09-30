import React, { useEffect, useState } from "react";
import ErrorModal from "../../../model/ErrorModal";
import SuccessModal from "../../../model/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../InputField";
import { handleKeyPress } from "../../customcomponents/Validatehandlekeypress";
import Select from "react-select";
import { Citydata } from "../../../utils/City";
import { allStates } from "../../../utils/City";
import { ValidateForm } from "./ValidateBasicinfoForm";
import { GetitemsnameData } from "../../../Redux/ItemsReducer/action";
import { MultiSelectCheckbox } from "./MultipleSelectCheckbox";
import {
  GetSuppliernameData,
  PostSupplier,
} from "../../../Redux/SupplyReducer/action";
import DisplaySupplydata from "../DisplayData/DisplaySupplydata";

const SupplyMasterForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorm, setErrorm] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selecterrors, setselectErrors] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sucessmodel, setsucessmodal] = useState("");
  const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const minDate = "1950-01-01";

  const [formData, setFormData] = useState({
    SupplierName: "",
    ContactPersonName: "",
    ContactEmail: "",
    ContactPhoneNo: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    ProductCategoriesSupplied: [],
    TaxIdentificationNumber: "",
    LicenseNumber: "",
  });

  const AllCity = Citydata?.map((el) => ({ label: el.city, value: el.city }));
  const Getitemsdaata = useSelector(
    (state) => state.ItemsReducer.GetItemsnamedataaa
  );
  //  console.log("======Getitemsdaata=====",Getitemsdaata)
  // const AllitemsList = Getitemsdaata?.items?.filter((el) => el?.ItemName && el.active ==="true" );
  // console.log("AllitemsList", AllitemsList);

  const AllitemsList =
    Getitemsdaata?.items
      ?.filter((el) => el.active === true)
      .map((el) => el.ItemName) || [];
  // console.log("AllitemsList", AllitemsList);

  // console.log("selecterrors",selecterrors)
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

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      city: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleCategoryChange = (selectedOptions) => {
    const validOptions = selectedOptions || [];
    // Check for duplicates before updating the state
    const existingValues = selectedCategory.map((option) => option.value);
    const duplicates = validOptions.filter((option) =>
      existingValues.includes(option.value)
    );
    if (duplicates.length > 0) {
      alert("Category already exist.");
      return;
    }
    setSelectedCategories(validOptions);
    // Update selectedCategory by merging the previous state with validOptions
    setSelectedCategory((prevSelected) => {
      const updatedSelected = [...prevSelected, ...validOptions];

      return updatedSelected;
    });
  };

  const removeCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategory.filter(
      (category) => category.value !== categoryToRemove
    );
    setSelectedCategory(updatedCategories);
    setFormData((prevState) => ({
      ...prevState,
      ProductCategoriesSupplied: updatedCategories.map(
        (option) => option.value
      ),
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

    // console.log("validationErrors", validationErrors);

    const hasErrors = Object.keys(validationErrors).length > 0;

    if (selectedCategory.length === 0) {
      setselectErrors("required");
    } else if (selectedCategory.length > 0) {
      setselectErrors();
    }

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
          country: "USA", // Add country as needed
        },
        ProductCategoriesSupplied: selectedCategory.map((item) => ({
          itemName: item.value,
          tick: true, // or false, depending on your logic
        })),
        TaxIdentificationNumber: data.TaxIdentificationNumber,
        LicenseNumber: data.LicenseNumber,
      };
    };

    if (!hasErrors && selectedCategory.length === 0) {
      setErrorm("Select product category");
      return;
    }

    if (!hasErrors && selectedCategory.length > 0) {
      setLoading(true);

      const payload = transformFormData(trimmedFormData);

      // console.log("payload", payload);

      try {
        const res = await dispatch(PostSupplier(payload));
        // console.log(":res=====", res);
        if (res.type === "POSTSUPPLIERSUCESSS") {
          if (res.payload.message === "Entry added Sucessfully") {
            setsucessmodal("Detail Save Successfully");
            dispatch(GetSuppliernameData);
            setFormData({
              SupplierName: "",
              ContactPersonName: "",
              ContactEmail: "",
              ContactPhoneNo: "",
              state: "",
              city: "",
              street: "",
              zipCode: "",
              ProductCategoriesSupplied: [],
              TaxIdentificationNumber: "",
              LicenseNumber: "",
            });
            setSelectedCity([]);
            setSelectedCity(null);
            setSelectedCategory([]);
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

  // console.log("slectatoy",selectedCategory)
  //  console.log("sleecteerrors",selecterrors)

  const handleFormKeypress = (e) => {
    if (e.key === "Enter") {
      handleSaveData(e, false);
    }
  };

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
      <div className="Main-Container">
        <div style={myStyle}>
          <div className="w-full text-left bg-slate-300 p-2 relative">
            <h1 className="text-lg font-bold  text-gray-800">
              {" "}
              Supplier Form{" "}
            </h1>
          </div>
          <form
            onKeyPress={handleFormKeypress}
            onSubmit={(e) => handleSaveData(e, true)}
            className="bg-white px-4 py-2 w-full"
          >
            <div className="border rounded py-2 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-1">
                <InputField
                  label="Supplier Name"
                  type="text"
                  name="SupplierName"
                  value={formData.SupplierName}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                  error={submitted && errors.SupplierName}
                />
                <InputField
                  label="Contact Person Name"
                  type="text"
                  name="ContactPersonName"
                  value={formData.ContactPersonName}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "text", 50)}
                  error={submitted && errors.ContactPersonName}
                />
                <InputField
                  label="Contact Email"
                  type="text"
                  name="ContactEmail"
                  value={formData.ContactEmail}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "email", 50)}
                  error={submitted && errors.ContactEmail}
                />

                <InputField
                  label="Contact Phone No"
                  type="text"
                  name="ContactPhoneNo"
                  value={formData.ContactPhoneNo}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "number", 10)}
                  error={submitted && errors.ContactPhoneNo}
                />

                <InputField
                  label="State"
                  type="select"
                  name="state"
                  options={allStates}
                  value={formData.state}
                  onChange={handleInputChange}
                  error={submitted && errors.state}
                />
                <div className="mt-0">
                  <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
                    <span>City</span>
                    {errors && (
                      <span className="text-red-500 ">{errors.city}</span>
                    )}
                  </label>
                  <Select
                    options={AllCity}
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="Select a city"
                    name="city"
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
                />

                <InputField
                  label="Zip Code"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "number", 10)}
                  error={submitted && errors.zipCode}
                />

                <div>
                  <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
                    <span>Product Categories</span>
                    {/* {selecterrors  ? (
                        <span className="text-red-500 ">
                          {selecterrors}
                        </span>
                      ):""
                    } */}
                  </label>
                  <Select
                    name="ProductCategoriesSupplied"
                    placeholder="Select a Category"
                    value={formData.ProductCategoriesSupplied}
                    onChange={handleCategoryChange}
                    // options={AllitemsList}
                    options={AllitemsList?.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    isMulti
                  />
                  <div className="selected-categories mt-2 grid grid-cols-3 gap-1">
                    {selectedCategory?.map((category) => {
                      return (
                        <div
                          key={category.value}
                          className="flex items-center gap-1 rounded-lg justify-between border p-1 mb-1"
                        >
                          <span>{category.label}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removeCategory(category.value)}
                          >
                            &times;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* {AllitemsList?.length > 0 ? (
                  <MultiSelectCheckbox
                    label="Product Categories Supplied"
                    name="ProductCategoriesSupplied"
                    options={AllitemsList}
                    value={formData?.ProductCategoriesSupplied || []}
                    // value={formData.ProductCategoriesSupplied}
                    onChange={handleInputChange}
                    error={submitted && errors.ProductCategoriesSupplied}
                  />
                ) : (
                  ""
                )} */}

                <InputField
                  label="Tax Identification Number"
                  type="text"
                  name="TaxIdentificationNumber"
                  value={formData.TaxIdentificationNumber}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, "none", 50)}
                  error={submitted && errors.TaxIdentificationNumber}
                />

                <InputField
                  label="License Number"
                  type="text"
                  name="LicenseNumber"
                  onChange={handleInputChange}
                  value={formData.LicenseNumber}
                  error={submitted && errors.LicenseNumber}
                  onKeyPress={(e) => handleKeyPress(e, "none", 50)}
                />
              </div>
              <div className="px-4 py-1 w-[100%]  border-gray-300 rounded-bl-lg rounded-br-lg flex justify-center">
                <button
                  className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
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

        <DisplaySupplydata />

        {errorm && <ErrorModal msg={errorm} onClose={handleCloseErrorModal} />}

        {sucessmodel && (
          <SuccessModal msg={sucessmodel} onClose={handleclosesucessmodal} />
        )}
      </div>
    </>
  );
};

export default SupplyMasterForm;
