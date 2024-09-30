import axios from "axios";
import * as types from "./actiotypes";
import {
  LOGINFAILURE,
  LOGINREQ,
  LOGINSUCCESS,
  SIGNUPREQ,
  SIGNUPSUCCESS,
  SIGNUPFAILURE,
} from "./actiotypes";
import { API_KEY } from "../APIKEY/Api";

const loggeddata = JSON.parse(localStorage.getItem("useronlinelogged"));
const token = loggeddata?.token;
//  console.log("")

export const Loginpost = (payload) => (dispatch) => {
  dispatch({ type: LOGINREQ });
  return axios
    .post(`${API_KEY}/api/auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Basic ${credentials}`,
      },
    })
    .then((res) => {
      const serializablePayload = {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      };

      return dispatch({ type: LOGINSUCCESS, payload: serializablePayload });
    })
    .catch((err) => {
      return dispatch({ type: LOGINFAILURE, payload: err });
    });
};

export const Signuppost = (payload) => (dispatch) => {
  dispatch({ type: SIGNUPREQ });

  return axios
    .post(`${API_KEY}/api/auth/signup`, payload)
    .then((res) => {
      const serializablePayload = {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      };
      return dispatch({ type: SIGNUPSUCCESS, payload: res.data });
      // return dispatch(pageacesssuccess(res.data));
    })
    .catch((err) => {
      return dispatch({ type: SIGNUPFAILURE, payload: err });
    });
};

// LOGGED USER FETCH

export const Loggeduser = (dispatch) => {
  dispatch({ type: types.LOGGEDUSERREQ });

  return axios
    .get(`${API_KEY}/api/Login`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    })
    .then((res) => {
      return dispatch({ type: types.LOGGEDUSERSUCCESS, res });
    })
    .catch((err) => {
      dispatch({ type: types.LOGGEDUSERFAILURE, err });
    });
};

// LOGGED USER EDIT

// Forget Password

export const forgetUserPassword = (EmailID, payload) => (dispatch) => {
  dispatch({ type: types.FORGETUSERPASSWORDREQ });

  return axios
    .put(`${API_KEY}/api/Login/PasswordReset/${EmailID}/`, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Basic ${credentials}`,
      },
    })
    .then((res) => {
      const serializablePayload = {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      };
      return dispatch({
        type: types.FORGETUSERPASSWORDSUCCESS,
        payload: serializablePayload,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.FORGETUSERPASSWORDFAILURE, payload: err });
    });
};

// Api for Aceess master search availble user

const pageacessreq = () => {
  return {
    type: types.PAGEACESSREQ,
  };
};

const pageacesssuccess = (payload) => {
  return {
    type: types.PAGEACESSSUCCESS,
    payload,
  };
};

const pageacessfailure = () => {
  return {
    type: types.PAGEACESSFAILURE,
  };
};

export const PageAcessuserdetails =
  (firstName, lastName, email, contactNumber) => (dispatch) => {
    dispatch(pageacessreq());

    return axios
      .get(
        `${API_KEY}/api/auth/users/${firstName}/${lastName}/${email}/${contactNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return dispatch(pageacesssuccess(res.data));
      })
      .catch((err) => {
        dispatch(pageacessfailure());
      });
  };

// Api for Aceess master search availble userend here
//  this Api for to updated the Application master Screen data
const pageupdatedacessreq = () => {
  return {
    type: types.PAGEUPDATEEMPLOYEEACESSREQ,
  };
};

const pageupdatedacesssuccess = (payload) => {
  return {
    type: types.PAGEUPDATEEMPLOYEEACESSSUCCESS,
    payload,
  };
};

const pageupdatedacessfailure = () => {
  return {
    type: types.PAGEUPDATEEMPLOYEEACESSFAILURE,
  };
};

export const PageupdateAcessuserdetails = (payload) => (dispatch) => {
  dispatch(pageupdatedacessreq());
  return axios
    .put(`${API_KEY}/api/auth/users/status`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(pageupdatedacesssuccess(res));
    })
    .catch((err) => {
      dispatch(pageupdatedacessfailure());
    });
};

export const PageLogintest = (EmailId, payload) => (dispatch) => {
  dispatch(pageupdatedacessreq());
  return axios
    .post(`${API_KEY}/api/Login/AppAccessCheck/`, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Basic ${credentials}`,
      },
    })
    .then((res) => {
      return dispatch(pageupdatedacesssuccess(res));
    })
    .catch((err) => {
      dispatch(pageupdatedacessfailure());
    });
};

//  UPDATE ACESS SCREEN FOR  LIST SCREEN

export const PageupdateAcessuser = (payload) => (dispatch) => {
  dispatch(pageupdatedacessreq());
  return axios
    .post(
      `${API_KEY}/api/PageAccess/SubmitData/`,
      payload,
      payload
      //   {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Basic ${credentials}`,
      //   },
      // }
    )
    .then((res) => {
      return dispatch(pageupdatedacesssuccess(res));
    })
    .catch((err) => {
      dispatch(pageupdatedacessfailure());
    });
};

// To Load menu list for logged in user

const LoadLoggeduserMenulistreq = () => {
  return {
    type: types.LOGGEDUSERMENULISTREQ,
  };
};

const LoadLoggeduserMenulistsuccess = (payload) => {
  return {
    type: types.LOGGEDUSERMENULISTSUCCESS,
    payload,
  };
};

const LoadLoggeduserMenulistfailure = () => {
  return {
    type: types.LOGGEDUSERMENULISTFAILURE,
  };
};


// To Load menu list for logged in user Sidebar what Access have

export const LoadLoggedusermenulist = (ID) => (dispatch) => {
  //  console.log("emilaidddd",EmailID)
  dispatch(LoadLoggeduserMenulistreq());
  return axios
    .get(`${API_KEY}/api/auth/users-access/${ID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return dispatch(LoadLoggeduserMenulistsuccess(res.data));
    })
    .catch((err) => {
      dispatch(LoadLoggeduserMenulistfailure());
    });
};

//  Generate OTP

export const GenerateOTP = (payload) => (dispatch) => {
  dispatch(GenerateOTPreq());
  return axios
    .post(
      `${API_KEY}/api/auth/forgot-password`,payload)
    .then((res) => {
      return dispatch(GenerateOTPSuccess(res));
    })
    .catch((err) => {
  return    dispatch(GenerateOTPFailure(err));
    });
};

// To generate OTP for resetting password

const GenerateOTPreq = () => {
  return {
    type: types.GENERATEOTPREQ,
  };
};

const GenerateOTPSuccess = (payload) => {
  return {
    type: types.GENERATEOTPSUCCESS,
    payload,
  };
};

const GenerateOTPFailure = () => {
  return {
    type: types.GENERATEOTPFAILURE,
  };
};

//  Reset Password

export const ResetPasswordWithOTP = (payload) => (dispatch) => {
  dispatch(ResetPasswordWithOTPreq());
  return axios
    .put(
      `${API_KEY}/api/auth/reset-password-otp`,
      payload   )
    .then((res) => {
      return dispatch(ResetPasswordWithOTPSuccess(res));
    })
    .catch((err) => {
      dispatch(ResetPasswordWithOTPFailure());
    });
};

// To generate OTP for resetting password

const ResetPasswordWithOTPreq = () => {
  return {
    type: types.RESETPASSWORDWITHOTPREQ,
  };
};

const ResetPasswordWithOTPSuccess = (payload) => {
  return {
    type: types.RESETPASSWORDWITHOTPSUCCESS,
    payload,
  };
};

const ResetPasswordWithOTPFailure = () => {
  return {
    type: types.RESETPASSWORDWITHOTPFAILURE,
  };
};

// Get Details on the basis of EMployee ID

export const GetDetailswithOTP = (EmployeeId) => (dispatch) => {
  dispatch(GetDetailswithOTPreq());
  return axios
    .get(`${API_KEY}/api/Login/FetchHRInfo/${EmployeeId}`)
    .then((res) => {
      return dispatch(GetDetailswithOTPSuccess(res));
    })
    .catch((err) => {
      dispatch(GetDetailswithOTPFailure());
    });
};

// To generate OTP for resetting password

const GetDetailswithOTPreq = () => {
  return {
    type: types.GETDETAILSWITHOTPREQ,
  };
};

const GetDetailswithOTPSuccess = (payload) => {
  return {
    type: types.GETDETAILSWITHOTPSUCCESS,
    payload,
  };
};

const GetDetailswithOTPFailure = () => {
  return {
    type: types.GETDETAILSWITHOTPFAILURE,
  };
};
