import {SAVE_BOOK_REQUEST, FETCH_BOOK_REQUEST, UPDATE_BOOK_REQUEST, DELETE_BOOK_REQUEST, BOOK_SUCCESS, BOOK_FAILURE} from "./bookTypes";
import axios from 'axios';

export const saveBook = book => {
    return dispatch => {
        dispatch(saveBookRequest());
        axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            });
    };
};

const saveBookRequest = () => {
    return {
        type: SAVE_BOOK_REQUEST
    };
};

const fetchBookRequest = () => {
    return {
        type: FETCH_BOOK_REQUEST
    };
};

export const fetchBook = bookId => {
    return dispatch => {
        dispatch(fetchBookRequest());
        axios.get("http://localhost:8081/rest/books/"+bookId)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            });
    };
};

const updateBookRequest = () => {
    return {
        type: UPDATE_BOOK_REQUEST
    };
};

export const updateBook = book => {
    return dispatch => {
        dispatch(updateBookRequest());
        axios.put("http://localhost:8081/rest/books", book)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            });
    };
};

const deleteBookRequest = () => {
    return {
        type: DELETE_BOOK_REQUEST
    };
};

export const deleteBook = bookId => {
    return dispatch => {
        dispatch(deleteBookRequest());
        axios.delete("http://localhost:8081/rest/books/"+bookId)
            .then(response => {
                dispatch(bookSuccess(response.data));
            })
            .catch(error => {
                dispatch(bookFailure(error));
            });
    };
};

const bookSuccess = book => {
    return {
        type: BOOK_SUCCESS,
        payload: book
    };
};

const bookFailure = error => {
    return {
        type: BOOK_FAILURE,
        payload: error
    };
};