import React, { useState } from "react";
import Select from "react-select";

export const MultiSelectCheckbox = ({
  label,
  name,
  options,
  value = [],
  onChange,
  error,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (selectedOptions) => {
    const newValue = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    onChange({ target: { name, value: newValue } });
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      onChange({
        target: { name, value: options.map((option) => option.value) },
      });
    } else {
      onChange({ target: { name, value: [] } });
    }
    setSelectAll(!selectAll);
  };

  const handleRemoveOption = (optionToRemove) => {
    const newValue = value.filter((option) => option !== optionToRemove);
    onChange({ target: { name, value: newValue } });
  };

  const selectOptions = options.map((option) => ({
    value: option,
    label: (
      <label>
        <input type="checkbox" checked={value.includes(option)} readOnly />
        {option}
      </label>
    ),
  }));

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
    }),
    control: (provided) => ({
      ...provided,
      display: "flex",
      minHeight: 30,
    }),
    multiValue: () => ({
      display: "none", // Hide selected options within the dropdown
    }),
  };

  //  console.log("value",value)

  return (
    <div>
      <div className="flex gap-2">
        <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
          {label}
        </label>
        {error && <span style={{ color: "red" }}>{error}</span>}
      </div>

      {/* Dropdown to select options */}
      <Select
        isMulti
        name={name}
        options={selectOptions}
        value={selectOptions.filter((option) => value.includes(option.value))} // Show selected options, but hide in the dropdown
        onChange={handleCheckboxChange}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable
        styles={customStyles}
      />

      {/* Custom display for selected options */}

      <div>
        <h3 className="px-1 py-1"></h3>
        {value.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 px-2 gap-1">
            {value.map((option) => (
              <span
                key={option}
                className="bg-blue-200 p-1 text-[.6rem] sm:text-[.7rem] 
                rounded flex justify-between sm:justify-around items-center "
              >
                {option}
                <button
                  onClick={() => handleRemoveOption(option)}
                  className="ml-2 text-red-500"
                  aria-label={`Remove ${option}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p>No options selected.</p>
        )}
      </div>
    </div>
  );
};
