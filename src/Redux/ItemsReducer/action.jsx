import axios from "axios";
import * as types from "./actionType";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
const token = loggeddata?.token;

const getitemsnameemailreq = () => {
  return {
    type: types.GETITEMSNAMEREQ,
  };
};

const getitemsnameemailsuccess = (payload) => {
  return {
    type: types.GETITEMSNAMESUCESSS,
    payload,
  };
};

const getitemsnameemailfailure = () => {
  return {
    type: types.GETITEMSNAMEFailure,
  };
};

export const GetitemsnameData = (dispatch) => {
  dispatch(getitemsnameemailreq);
  return axios
    .get(`${API_KEY}/api/auth/items`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(getitemsnameemailsuccess(res.data));
    })
    .catch((err) => {
      dispatch(getitemsnameemailfailure());
    });
};
// Post item
const postitemsnamereq = () => {
  return {
    type: types.POSTITEMSNAMEREQ,
  };
};

const postitemsnamesuccess = (payload) => {
  return {
    type: types.POSTITEMSNAMESUCESSS,
    payload,
  };
};

const postitemsnamefailure = () => {
  return {
    type: types.POSTITEMSNAMEFailure,
  };
};

export const PostitemsnameData = (itemData) => (dispatch) => {
  dispatch(postitemsnamereq());
  return axios
    .post(`${API_KEY}/api/auth/add-item`, itemData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(postitemsnamesuccess(res.data));
    })
    .catch((err) => {
      dispatch(postitemsnamefailure());
    });
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
