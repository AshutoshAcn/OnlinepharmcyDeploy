import axios from "axios";
import * as types from "./actionType";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
const token = loggeddata?.token;

const getitemsnameemailreq = () => {
  return {
    type: types.GETSUPPLIERREPORTSREQ,
  };
};

const getitemsnameemailsuccess = (payload) => {
  return {
    type: types.GETSUPPLIERREPORTSSUCESSS,
    payload,
  };
};

const getitemsnameemailfailure = () => {
  return {
    type: types.GETSUPPLIERREPORTSFailure,
  };
};

export const GetSupplierReportData = (dispatch) => {
  dispatch(getitemsnameemailreq);
  return axios
    .get(`${API_KEY}/api/auth/item-supplier-details`, {
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
