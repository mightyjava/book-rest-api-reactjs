import {SAVE_BOOK_REQUEST, SAVE_BOOK_SUCCESS, SAVE_BOOK_FAILURE} from "./bookTypes";

const initialState = {
    book: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_BOOK_REQUEST:
            return {
                ...state
            };
        case SAVE_BOOK_SUCCESS:
            return {
                book: action.payload,
                error: ''
            };
        case SAVE_BOOK_FAILURE:
            return {
                book: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;