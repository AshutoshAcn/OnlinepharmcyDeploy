export const ValidateForm = (formData) => {
  const newErrors = {};

  if (!formData.ItemName.trim()) {
    newErrors.ItemName = "required.";
  }

  if (!formData.SupplierName.trim()) {
    newErrors.SupplierName = "required.";
  }

  if (!formData.Description.trim()) {
    newErrors.Description = "required.";
  }

  if (!formData.Cost) {
    newErrors.Cost = "required.";
  }

  return newErrors;
};
