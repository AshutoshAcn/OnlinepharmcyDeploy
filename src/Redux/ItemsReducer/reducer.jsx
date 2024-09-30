import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  GetItemsnamedataaa: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETITEMSNAMESUCESSS:
      return {
        ...state,
        isLoading: false,
        GetItemsnamedataaa: payload,
      };

    default:
      return state;
  }
};
