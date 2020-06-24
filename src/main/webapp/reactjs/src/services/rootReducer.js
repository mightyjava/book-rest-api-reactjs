import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import bookReducer from './book/bookReducer';

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer
});

export default rootReducer;