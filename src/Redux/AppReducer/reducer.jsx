import * as types from "./actionType";
const intialstate = {
  token: "",
  isLoading: false,
  PageAcessEmailDropdown: [],
  PageAcessListScreen: [],
  PageScreencheck: [],
  UserAcessScreen: [],
};

export const Reducer = (state = intialstate, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.PAGEACESSEMAILDROPDOWNSUCESSS:
      return {
        ...state,
        isLoading: false,
        PageAcessEmailDropdown: payload,
      };

    case types.PAGELISTSCREENSUCESSS:
      return {
        ...state,
        isLoading: false,
        PageAcessListScreen: payload,
      };

    case types.PAGECHECKSCREENSUCESSS:
      return {
        ...state,
        isLoading: false,
        PageScreencheck: payload,
      };

    case types.PAGELISTUSERACESSSUCESSS:
      return {
        ...state,
        isLoading: false,
        UserAcessScreen: payload,
      };

    default:
      return state;
  }
};
