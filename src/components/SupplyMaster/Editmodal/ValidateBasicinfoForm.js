export const ValidateForm = (formData) => {
  const newErrors = {};

  // Validate Supplier Name
  if (!formData.SupplierName.trim()) {
    newErrors.SupplierName = "required.";
  }

  // Validate Contact Person Name
  if (!formData.ContactPersonName.trim()) {
    newErrors.ContactPersonName = "required.";
  }

  // Validate Contact Email
  if (!formData.ContactEmail.trim()) {
    newErrors.ContactEmail = "required.";
  } else if (
    !formData.ContactEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  ) {
    newErrors.ContactEmail = "Invalid email format.";
  }

  // Validate Contact Phone No
  if (!formData.ContactPhoneNo.trim()) {
    newErrors.ContactPhoneNo = "required.";
  }else if (!formData.ContactPhoneNo.match(/^[0-9]{10}$/)) {
    newErrors.ContactPhoneNo = "required";
  }

  // Validate State
  if (!formData.state.trim()) {
    newErrors.state = "required.";
  }

  // Validate City
  if (!formData.city.trim()) {
    newErrors.city = "required.";
  }

  // Validate Street
  if (!formData.street.trim()) {
    newErrors.street = "required.";
  }

  // Validate Zip Code
  if (!formData.zipCode.trim()) {
    newErrors.zipCode = "required.";
  }


  if (!formData.ProductCategoriesSupplied) {
    newErrors.ProductCategoriesSupplied = "required.";
  }


  if (!formData.TaxIdentificationNumber.trim()) {
    newErrors.TaxIdentificationNumber = "required.";
  }

  // Validate License Number
  if (!formData.LicenseNumber.trim()) {
    newErrors.LicenseNumber = "required.";
  }

  return newErrors;
};
