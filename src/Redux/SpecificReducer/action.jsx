import axios from "axios";
import * as types from "./actionType";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
const token = loggeddata?.token;

const getSPECIFICSupplieremailreq = () => {
  return {
    type: types.GETSPECIFICSUPPLIERREQ,
  };
};

const getSPECIFICSupplieremailsuccess = (payload) => {
  return {
    type: types.GETSPECIFICSUPPLIERSUCESSS,
    payload,
  };
};

const getSPECIFICSupplieremailfailure = () => {
  return {
    type: types.GETSPECIFICSUPPLIERFailure,
  };
};

export const GetSPECIFICSuppliernameData =(itemName,supplierName,cost,pagesize,pageindex) => (dispatch) => {
  dispatch(getSPECIFICSupplieremailreq);
  return axios
    .get(`${API_KEY}/api/auth/all-supplier-details/${itemName}/${supplierName}/${cost}/${pagesize}/${pageindex}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(getSPECIFICSupplieremailsuccess(res.data.supplierCosts));
    })
    .catch((err) => {
      dispatch(getSPECIFICSupplieremailfailure());
    });
};

//   single ---- ID data
// Action Creators for getting a single SPECIFICsupplier by ID
const getSingleByIdSPECIFICSupplierReq = () => ({
  type: types.GETSINGLEBYIDSPECIFICSUPPLIERDROPDOWNREQ,
});

const getSingleByIdSPECIFICSupplierSuccess = (payload) => ({
  type: types.GETSINGLEBYIDSPECIFICSUPPLIERDROPDOWNSUCESSS,
  payload,
});

const getSingleByIdSPECIFICSupplierFailure = () => ({
  type: types.GETSINGLEBYIDSPECIFICSUPPLIERDROPDOWNFailure,
});

// Action to get a single SPECIFICsupplier by ID
export const getSingleByIdSPECIFICSupplierData = (itemName) => (dispatch) => {
  dispatch(getSingleByIdSPECIFICSupplierReq());
  return axios
    .get(`${API_KEY}/api/auth/suppliers-item/${itemName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
  return    dispatch(getSingleByIdSPECIFICSupplierSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getSingleByIdSPECIFICSupplierFailure());
    });
};

// Post item
const postSPECIFICSuppliernamereq = () => {
  return {
    type: types.POSTSPECIFICSUPPLIERREQ,
  };
};

const postSPECIFICSuppliernamesuccess = (payload) => {
  return {
    type: types.POSTSPECIFICSUPPLIERSUCESSS,
    payload,
  };
};

const postSPECIFICSuppliernamefailure = () => {
  return {
    type: types.POSTSPECIFICSUPPLIERFailure,
  };
};

export const PostSPECIFICSupplier = (itemData) => (dispatch) => {
  dispatch(postSPECIFICSuppliernamereq());
  return axios
    .post(`${API_KEY}/api/auth/supplier-description-cost`, itemData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(postSPECIFICSuppliernamesuccess(res.data));
    })
    .catch((err) => {
      dispatch(postSPECIFICSuppliernamefailure());
    });
};

// Edit item
const edititemreq = () => {
  return {
    type: types.EDITUPDATESPECIFICSUPPLIERREQ,
  };
};

const edititemsuccess = (payload) => {
  return {
    type: types.EDITUPDATESPECIFICSUPPLIERSUCCESS,
    payload,
  };
};

const edititemfailure = () => {
  return {
    type: types.EDITUPDATESPECIFICSUPPLIERFAILURE,
  };
};

export const EditSupplierData = (id, updatedData) => (dispatch) => {
  dispatch(edititemreq());
  return axios
    .put(
      `${API_KEY}/api/auth/update-supplier-description-cost/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
