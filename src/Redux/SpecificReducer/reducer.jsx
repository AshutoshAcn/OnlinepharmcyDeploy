import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  GetSpecificSupplydataaa: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETSPECIFICSUPPLIERSUCESSS:
      return {
        ...state,
        isLoading: false,
        GetSpecificSupplydataaa: payload,
      };

    default:
      return state;
  }
};
