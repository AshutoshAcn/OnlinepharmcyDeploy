import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  GetSupplierReportdataaa: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETSUPPLIERREPORTSSUCESSS:
      return {
        ...state,
        isLoading: false,
        GetSupplierReportdataaa: payload,
      };

    default:
      return state;
  }
};
