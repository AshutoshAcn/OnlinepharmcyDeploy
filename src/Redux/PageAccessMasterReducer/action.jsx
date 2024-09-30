import axios from "axios";
import * as types from "./actionType";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
const token = loggeddata?.token;

const GetAllUsersPageAccessReq = () => {
  return {
    type: types.GETALLUSERSPAGEACCESSREQ,
  };
};

const GetAllUsersPageAccessSuccess = (payload) => {
  return {
    type: types.GETALLUSERSPAGEACCESSSUCCESS,
    payload,
  };
};

const GetAllUsersPageAccessFailure = () => {
  return {
    type: types.GETALLUSERSPAGEACCESSFAILURE,
  };
};

export const GetAllUsersPageAccess = (dispatch) => {
  dispatch(GetAllUsersPageAccessReq());
  return axios
    .get(`${API_KEY}/api/auth/usersAccessmaster`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(GetAllUsersPageAccessSuccess(res.data));
    })
    .catch((err) => {
      dispatch(GetAllUsersPageAccessFailure());
    });
};




// Update User Page Access Master 
const PutUserPageAccessMasterReq = () => {
  return {
    type: types.PUTUSERPAGEACCESSMASTERREQ,
  };
};

const PutUserPageAccessMasterSuccess = (payload) => {
  return {
    type: types.PUTUSERPAGEACCESSMASTERSUCCESS,
    payload,
  };
};

const PutUserPageAccessMasterFailure = () => {
  return {
    type: types.PUTUSERPAGEACCESSMASTERFAILURE,
  };
};

export const PutUserPageAccessMaster = (selectedUserId) => (updatedAccessMaster) => async (dispatch) => {
  dispatch(PutUserPageAccessMasterReq());
  try {
    const response = await axios.put(
      `${API_KEY}/api/auth/update-access/${selectedUserId}`,
      updatedAccessMaster,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    dispatch(PutUserPageAccessMasterSuccess(response.data));
    return response.data; // Optionally return the response for further processing if needed
  } catch (error) {
    console.error("Error updating access:", error); // Log the error for debugging
    dispatch(PutUserPageAccessMasterFailure());
    throw error; // Optionally re-throw the error to be handled where the action is called
  }
};

// Edit item
const edititemreq = () => {
  return {
    type: types.EDITITEMREQ,
  };
};

const edititemsuccess = (payload) => {
  return {
    type: types.EDITITEMSUCCESS,
    payload,
  };
};

const edititemfailure = () => {
  return {
    type: types.EDITITEMFAILURE,
  };
};

export const EdititemsnameData = (updatedData) => (dispatch) => {
  dispatch(edititemreq());
  return axios
    .put(`${API_KEY}/api/auth/update-item-status`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(edititemsuccess(res));
    })
    .catch((err) => {
      dispatch(edititemfailure());
    });
};

// Delete item
const deleteitemreq = () => {
  return {
    type: types.DELETEITEMREQ,
  };
};

const deleteitemsuccess = (itemId) => {
  return {
    type: types.DELETEITEMSUCCESS,
    payload: itemId,
  };
};

const deleteitemfailure = () => {
  return {
    type: types.DELETEITEMFAILURE,
  };
};

export const DeleteitemsnameData = (id) => (dispatch) => {
  dispatch(deleteitemreq());
  return axios
    .delete(`${API_KEY}/api/auth/delete-item/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(deleteitemsuccess(res));
    })
    .catch((err) => {
      dispatch(deleteitemfailure());
    });
};
