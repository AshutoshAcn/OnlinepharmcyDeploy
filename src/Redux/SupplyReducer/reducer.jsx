import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  GetSupplydataaa: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETSUPPLIERSUCESSS:
      return {
        ...state,
        isLoading: false,
        GetSupplydataaa: payload,
      };

    default:
      return state;
  }
};
