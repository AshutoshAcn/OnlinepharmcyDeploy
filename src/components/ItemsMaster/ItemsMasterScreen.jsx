import React, { useState, useEffect, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteitemsnameData,
  EdititemsnameData,
  GetitemsnameData,
  PostitemsnameData,
} from "../../Redux/ItemsReducer/action";
import ErrorModal from "../../model/ErrorModal";
import SuccessModal from "../../model/SuccessModal";

const ItemsMasterScreen = ({ setActiveonlineTab }) => {
  const [ItemName, setItemName] = useState("");
  const [errorm, setErrorm] = useState(null);
  const [sucessmodel, setsucessmodal] = useState(null);
  const [consultancyData, setConsultancyData] = useState([]);
  const [noRecordsFound, setNoRecordsFound] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [editingRows, setEditingRows] = useState([]);
  const [errors, setErrors] = useState({});
  const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
  const dispatch = useDispatch();
  const Getitemsdaata = useSelector(
    (state) => state.ItemsReducer.GetItemsnamedataaa
  );
  const [editMode, setEditmode] = useState(false);
  const [TempActive, SetTempActive] = useState("");
  const [Singledata, SetSingledata] = useState("");
  const [id, setID] = useState("");
  const [rowId, setRowId] = useState("");
  // console.log("GetItemsnamedataaa", Getitemsdaata);

  const handleKeyPress = (e, type, maxLength) => {
    const {
      key,
      target: { value },
    } = e;

    if (
      type === "number" &&
      (e.key < "0" || e.key > "9") &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }

    if (value.length >= maxLength && key !== "Enter") {
      e.preventDefault();
      return;
    }

    switch (type) {
      case "text":
        if (!/^[a-zA-Z\s]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "number":
        if (!/[0-9]/.test(key) && key !== "Enter") {
          e.preventDefault();
        } else if (!/[0-9.]/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9@._+-]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "percent":
        if (!/^[0-9.]$/.test(key) && key !== "%" && key !== "Enter") {
          e.preventDefault();
        }
        break;
      case "alphanumeric":
        if (!/^[a-zA-Z0-9_ ]$/.test(key) && key !== "Enter") {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(GetitemsnameData);
  }, [dispatch]);

  useEffect(() => {
    if (GetitemsnameData && GetitemsnameData.length > 0) {
      setConsultancyData(Getitemsdaata.items);
      setEditingRows(Array(GetitemsnameData.length).fill(false));
      setNoRecordsFound(false);
    }
  }, [Getitemsdaata]);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!ItemName.trim()) {
      errors.ItemName = "Item Name  is required";
      valid = false;
    }

    setErrors(errors);

    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const postPayload = {
      ItemName: ItemName,
    };

    dispatch(PostitemsnameData(postPayload))
      .then((res) => {
        // console.log("POST request success: ", res);
        if (res.type === "POSTITEMSNAMESUCESSS") {
          if (res.payload.item) {
            setsucessmodal("Entry added successfully");
            dispatch(GetitemsnameData);
          }
        }
        setSubmissionSuccess(!submissionSuccess);
        setItemName("");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  const HandleSave = useCallback(() => {
    const payload = {
      rowId: rowId,
      active: TempActive === "Yes" ? true : false,
    };
    //  console.log("payload",payload)

    dispatch(EdititemsnameData(payload))
      .then((res) => {
        console.log("res", res);
        if (res.type === "EDITITEMSUCCESS") {
          if (res.payload.data.message === "Item status updated successfully") {
            setsucessmodal("Updated Successful");
            dispatch(GetitemsnameData);
          }
        }
        setEditmode(false);
      })
      .catch((err) => {
        console.log("Error updating data:", err);
        setEditmode(false);
      });
  }, [TempActive, Singledata.EmailId, dispatch]);

  const handleGetdatasingle = useCallback(
    (id, active, rowid) => {
      SetSingledata({ ...Singledata, id });
      SetTempActive(active === true ? "Yes" : "No");
      setEditmode(true);
      setID(id);
      setRowId(rowid);
    },
    [Singledata]
  );

  const handleCancel = useCallback(() => {
    SetTempActive(Singledata.Active);
    setEditmode(false);
  }, [Singledata.Active]);

  const handleDelete = (id) => {
    const payload = {
      rowId: id,
    };

    dispatch(DeleteitemsnameData(id))
      .then((res) => {
        // console.log("res", res);
        if (res.type === "DELETEITEMSUCCESS") {
          if (
            res.payload.data.message ===
            "Item deleted and rowIds reordered successfully"
          ) {
            setsucessmodal("Delete Successful");
            dispatch(GetitemsnameData);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCloseErrorModal = () => {
    setErrorm(null);
  };
  const handleclosesucessmodal = () => {
    setsucessmodal(null);
  };

  return (
    <>
      <div className="Main-Container text-xs">
        <div className="bg-slate-300 px-4">
          <div className="sm:flex sm:flex-row sm:space-x-4 sm:items-center py-2 sm:justify-center">
            <input
              type="text"
              placeholder="Enter Items Name"
              value={ItemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              onKeyPress={(e) => handleKeyPress(e, "none", 50)}
            />
            {errors.ItemName && (
              <p className="text-red-500 text-xs mt-1">{errors?.ItemName}</p>
            )}

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="px-4 py-2 w-[100%]">
          <div className="flex py-2 px-2 justify-between items-center bg-gray-100 border border-b-0  border-gray-300 rounded-tl-lg rounded-tr-lg">
            <h6 className="font-semibold "> Items Master List </h6>
            <h6 className="font-semibold ">
              {" "}
              No of Records :{consultancyData?.length}{" "}
            </h6>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sl No</th>
                <th className="border border-gray-300 px-4 py-2">Item Name</th>
                <th className="border border-gray-300 px-4 py-2">Active</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
                {/* <th className="border border-gray-300 px-4 py-2">Delete</th> */}
              </tr>
            </thead>
            <tbody>
              {consultancyData?.length > 0 ? (
                consultancyData?.map((consultancy, index) => (
                  <tr key={consultancy._id} className="hover:bg-slate-100">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {consultancy?.ItemName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {editMode && id === consultancy?._id ? (
                        <select
                          value={TempActive}
                          onChange={(e) => SetTempActive(e.target.value)}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <span>
                          {consultancy?.active === true ? "Yes" : "No"}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex items-center justify-center">
                        {editMode && id === consultancy?._id ? (
                          <>
                            <button onClick={HandleSave}>
                              <TiTick
                                className="text-green-500 font-extrabold text-2xl"
                                title="Update"
                              />
                            </button>{" "}
                            <span>|</span>
                            <button onClick={handleCancel}>
                              <IoClose
                                className="text-red-600 font-extrabold text-2xl"
                                title="Cancel"
                              />
                            </button>
                          </>
                        ) : (
                          <FaEdit
                            className="cursor-pointer"
                            onClick={() =>
                              handleGetdatasingle(
                                consultancy._id,
                                consultancy.active,
                                consultancy.rowId
                              )
                            }
                          />
                        )}
                      </div>
                    </td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 px-4 py-2 text-center"
                    colSpan="5"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {errorm && <ErrorModal msg={errorm} onClose={handleCloseErrorModal} />}

        {sucessmodel && (
          <SuccessModal msg={sucessmodel} onClose={handleclosesucessmodal} />
        )}
      </div>
    </>
  );
};

export default ItemsMasterScreen;
