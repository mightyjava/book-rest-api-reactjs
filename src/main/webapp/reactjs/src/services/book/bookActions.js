import {SAVE_BOOK_REQUEST, SAVE_BOOK_SUCCESS, SAVE_BOOK_FAILURE} from "./bookTypes";
import axios from 'axios';

export const saveBook = book => {
    return dispatch => {
        dispatch(saveBookRequest());
        axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                dispatch(saveBookSuccess(response.data));
            })
            .catch(error => {
                dispatch(saveBookFailure(error))
            });
    };
};

const saveBookRequest = () => {
    return {
        type: SAVE_BOOK_REQUEST
    };
};

const saveBookSuccess = book => {
    return {
        type: SAVE_BOOK_SUCCESS,
        payload: book
    };
};

const saveBookFailure = error => {
    return {
        type: SAVE_BOOK_FAILURE,
        payload: error
    };
};