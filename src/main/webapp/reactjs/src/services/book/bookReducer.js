import * as BT from "./bookTypes";

const initialState = {
  book: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_BOOK_REQUEST:
    case BT.FETCH_BOOK_REQUEST:
    case BT.UPDATE_BOOK_REQUEST:
    case BT.DELETE_BOOK_REQUEST:
    case BT.FETCH_LANGUAGES_REQUEST:
    case BT.FETCH_GENRES_REQUEST:
      return {
        ...state,
      };
    case BT.BOOK_SUCCESS:
      return {
        book: action.payload,
        error: "",
      };
    case BT.BOOK_FAILURE:
      return {
        book: "",
        error: action.payload,
      };
    case BT.LANGUAGES_SUCCESS:
      return {
        languages: action.payload,
        error: "",
      };
    case BT.LANGUAGES_FAILURE:
      return {
        languages: "",
        error: action.payload,
      };
    case BT.GENRES_SUCCESS:
      return {
        genres: action.payload,
        error: "",
      };
    case BT.GENRES_FAILURE:
      return {
        genres: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
