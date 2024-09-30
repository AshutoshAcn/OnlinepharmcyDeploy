import axios from "axios";
import * as types from "./actionType";
import {API_KEY} from "../APIKEY/Api"


const getpageacessemailreq = () => {
  return {
    type: types.PAGEACESSEMAILDROPDOWNREQ,
  };
};

const getpageacessemailsuccess = (payload) => {
  return {
    type: types.PAGEACESSEMAILDROPDOWNSUCESSS,
    payload,
  };
};

const getpageacessemailfailure = () => {
  return {
    type: types.PAGEACESSEMAILDROPDOWNFailure,
  };
};

export const getPageAcessEmaildropdownData = (dispatch) => {
  dispatch(getpageacessemailreq());
  return axios
    .get(
      `${API_KEY}/api/PageAccess/LoadEmailID/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${credentials}`,
        },
      }
    )
    .then((res) => {
      return dispatch(getpageacessemailsuccess(res.data));
    })
    .catch((err) => {
      dispatch(getpageacessemailfailure());
    });
};

//  PAGE ACESS LIST SCREEEB

const getpageacesslistscreenreq = () => {
  return {
    type: types.PAGELISTSCREENREQ,
  };
};

const getpageacesslistscreensuccess = (payload) => {
  return {
    type: types.PAGELISTSCREENSUCESSS,
    payload,
  };
};

const getpageacesslistscreenfailure = () => {
  return {
    type: types.PAGELISTSCREENFailure,
  };
};

export const getPageAcessListScreenData = (dispatch) => {
  dispatch(getpageacesslistscreenreq());
  return axios
    .get(
      `${API_KEY}/api/PageAccess/LoadMenus/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${credentials}`,
        },
      }
    )
    .then((res) => {
      return dispatch(getpageacesslistscreensuccess(res.data));
    })
    .catch((err) => {
      dispatch(getpageacesslistscreenfailure());
    });
};

// Load particular users menu list with check box checked

const getpagcheckuseracessscreenreq = () => {
  return {
    type: types.PAGELISTUSERACESSREQ,
  };
};

const getpacheckuseracesstscreensuccess = (payload) => {
  return {
    type: types.PAGELISTUSERACESSSUCESSS,
    payload,
  };
};

const getpagcheckuseracessscreenfailure = () => {
  return {
    type: types.PAGELISTUSERACESSFailure,
  };
};

export const getPageUSERScreenData = (EmailID) => (dispatch) => {

  dispatch(getpagcheckuseracessscreenreq());
  return axios
    .get(
      `${API_KEY}/api/PageAccess/LoadSelectedUserAccess/${EmailID}/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${credentials}`,
        },
      }
    )
    .then((res) => {
      return dispatch(getpacheckuseracesstscreensuccess(res.data));
    })
    .catch((err) => {
      dispatch(getpagcheckuseracessscreenfailure());
    });
};

//  Master
// all user active screen

const getpagecheckscreenreq = () => {
  return {
    type: types.PAGECHECKSCREENREQ,
  };
};

const getpagecheckscreensuccess = (payload) => {
  return {
    type: types.PAGECHECKSCREENSUCESSS,
    payload,
  };
};

const getpagecheckscreenfailure = () => {
  return {
    type: types.PAGECHECKSCREENFailure,
  };
};

export const getPageScreenData = (dispatch) => {
  dispatch(getpagecheckscreenreq());
  return axios
    .get(
      `${API_KEY}/api/PageAccess/LoadActiveusers/`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${credentials}`,
        },
      }
    )
    .then((res) => {
       dispatch(getpagecheckscreensuccess(res.data));
      return res.data;
    })
    .catch((err) => {
      dispatch(getpagecheckscreenfailure());
    });
};

// all user active screen

const updatescreencheckscreenreq = () => {
  return {
    type: types.PAGEUPDATESSCREENREQ,
  };
};

const updatescreencheckscreensuccess = (payload) => {
  return {
    type: types.PAGEUPDATESSCREENSUCESSS,
    payload,
  };
};

const updatescreencheckscreenfailure = () => {
  return {
    type: types.PAGEUPDATESSCREENFailure,
  };
};

export const updateAcessScreenData = (payload) => (dispatch) => {
  dispatch(updatescreencheckscreenreq());
  return axios
    .post(
      `${API_KEY}/api/PageAccess/SubmitData/`,
      payload, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Basic ${credentials}`,
        },
      }
    )
    .then((res) => {
      return dispatch(updatescreencheckscreensuccess(res));
    })
    .catch((err) => {
      dispatch(updatescreencheckscreenfailure());
    });
};
