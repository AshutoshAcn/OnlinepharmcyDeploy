import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  getAllUsersPageAccessData: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETALLUSERSPAGEACCESSSUCCESS:
      return {
        ...state,
        isLoading: false,
        getAllUsersPageAccessData: payload,
      };

    default:
      return state;
  }
};
