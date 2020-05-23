import {FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE} from './userTypes';

const initialState = {
    users: [],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state
            };
        case FETCH_USER_SUCCESS:
            return {
                users: action.payload,
                error: ''
            };
        case FETCH_USER_FAILURE:
            return {
                users: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;