// import React, { useState } from "react";
// import Select from "react-select";

// export const MultiSelectCheckbox = ({
//   label,
//   name,
//   options,
//   value = [], // Ensure value is an array by default
//   onChange,
//   error,
// }) => {
//   const [selectAll, setSelectAll] = useState(false);

//   const handleCheckboxChange = (selectedOptions) => {
//     const newValue = selectedOptions
//       ? selectedOptions.map((option) => option.value)
//       : [];
//     onChange({ target: { name, value: newValue } });
//   };

//   const handleSelectAll = () => {
//     if (!selectAll) {
//       onChange({
//         target: { name, value: options.map((option) => option.value) },
//       });
//     } else {
//       onChange({ target: { name, value: [] } });
//     }
//     setSelectAll(!selectAll);
//   };

//   // Prepare options for react-select
//   const selectOptions = options.map((option) => ({
//     value: option,
//     label: (
//       <label>
//         <input type="checkbox" checked={value.includes(option)} readOnly />
//         {option}
//       </label>
//     ),
//   }));

//   // Map selected values to options format for react-select
//   const selectedOptions = Array.isArray(value)
//     ? value.map((val) => ({
//         value: val,
//         label: val,
//       }))
//     : [];

//   const customStyles = {
//     menu: (provided) => ({
//       ...provided,
//       maxHeight: 200,
//       overflowY: "auto", // Enable scrolling
//     }),
//   };

//   return (
//     <div>
//       <div className="flex gap-2">
//         {/* <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> */}

//         <label className="flex gap-2 text-start text-[#3B88C8] font-semibold border-s-[2px] border-slate-500 p-0 ps-1 leading-none mb-1">
//           {label}
//         </label>
//         {error && <span style={{ color: "red" }}>{error}</span>}
//       </div>

//       <Select
//         isMulti
//         name={name}
//         options={selectOptions}
//         value={selectedOptions}
//         onChange={handleCheckboxChange}
//         closeMenuOnSelect={false}
//         hideSelectedOptions={false}
//         isSearchable
//         styles={customStyles}
//       />
//       <div>
//       <h3>Selected Options:</h3>
//       <p>{selectedOptions.map(option => option.value).join(', ')}</p>
//     </div>
//     </div>
//   );
// };
