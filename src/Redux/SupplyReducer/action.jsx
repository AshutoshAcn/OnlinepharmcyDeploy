import axios from "axios";
import * as types from "./actionType";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
const token = loggeddata?.token;

const getSupplieremailreq = () => {
  return {
    type: types.GETSUPPLIERREQ,
  };
};

const getSupplieremailsuccess = (payload) => {
  return {
    type: types.GETSUPPLIERSUCESSS,
    payload,
  };
};

const getSupplieremailfailure = () => {
  return {
    type: types.GETSUPPLIERFailure,
  };
};

export const GetSuppliernameData = (itemName,supplierName,cost,pagesize,pageindex) => (dispatch) => {
  dispatch(getSupplieremailreq);
  return axios
    .get(`${API_KEY}/api/auth/suppliers/${itemName}/${supplierName}/${cost}/${pagesize}/${pageindex}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(getSupplieremailsuccess(res.data.suppliers));
    })
    .catch((err) => {
      dispatch(getSupplieremailfailure());
    });
};

  //   single ---- ID data
// Action Creators for getting a single supplier by ID
const getSingleByIdSupplierReq = () => ({
  type: types.GETSINGLEBYIDSUPPLIERREQ,
});

const getSingleByIdSupplierSuccess = (payload) => ({
  type: types.GETSINGLEBYIDSUPPLIERSUCESSS,
  payload,
});

const getSingleByIdSupplierFailure = () => ({
  type: types.GETSINGLEBYIDSUPPLIERFailure,
});

// Action to get a single supplier by ID
export const getSingleByIdSupplierData = (id, dispatch) => {
  dispatch(getSingleByIdSupplierReq());
  return axios
    .get(`${API_KEY}/api/auth/supplier/:${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(getSingleByIdSupplierSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getSingleByIdSupplierFailure());
    });
};






// Post item
const postSuppliernamereq = () => {
  return {
    type: types.POSTSUPPLIERREQ,
  };
};

const postSuppliernamesuccess = (payload) => {
  return {
    type: types.POSTSUPPLIERSUCESSS,
    payload,
  };
};

const postSuppliernamefailure = () => {
  return {
    type: types.POSTSUPPLIERFailure,
  };
};

export const PostSupplier = (itemData) => (dispatch) => {
  dispatch(postSuppliernamereq());
  return axios
    .post(`${API_KEY}/api/auth/add-supplier`, itemData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(postSuppliernamesuccess(res.data));
    })
    .catch((err) => {
      dispatch(postSuppliernamefailure());
    });
};





// Edit item
const edititemreq = () => {
  return {
    type: types.EDITUPDATESUPPLIERREQ,
  };
};

const edititemsuccess = (payload) => {
  return {
    type: types.EDITUPDATESUPPLIERSUCCESS,
    payload,
  };
};

const edititemfailure = () => {
  return {
    type: types.EDITUPDATESUPPLIERFAILURE,
  };
};

export const EditSupplierData = (id,updatedData) => (dispatch) => {
  dispatch(edititemreq());
  return axios
    .put(`${API_KEY}/api/auth/supplier/${id}`, updatedData, {
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
