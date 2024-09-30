import * as types from "./actiotypes";

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem("onlinetoken") ? true : false,
  token: localStorage.getItem("onlinetoken") || "",
  userlogged:[],
  PageAcessdetails: [],
  LOGGEDUSERMENULIST: [],
};

export const Reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGINREQ:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGINSUCCESS:
      localStorage.setItem("onlinetoken", "true");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token:payload
      };
    case types.LOGOUTSUCCESS:
      localStorage.removeItem("onlinetoken");
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        userlogged:payload
      };
    case types.PAGEACESSSUCCESS:
      return {
        ...state,
        isLoading: false,
        PageAcessdetails: payload,
      };
    case types.LOGGEDUSERMENULISTSUCCESS:
      return {
        ...state,
        isLoading: false,
        LOGGEDUSERMENULIST: payload,
      };
      case types.GENERATEOTPSUCCESS:
      return {
        ...state,
        isLoading: false,       
      };
      case types.RESETPASSWORDWITHOTPSUCCESS:
        return {
          ...state,
          isLoading: false,       
        };
        case types.GETDETAILSWITHOTPSUCCESS:
          return {
            ...state,
            isLoading: false,       
          };
    default:
      return state;
  }
};
