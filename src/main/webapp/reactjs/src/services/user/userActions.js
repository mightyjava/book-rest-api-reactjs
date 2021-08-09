import * as UT from "./userTypes";
import axios from "axios";

const REGISTER_URL = "http://localhost:8081/rest/user/register";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      )
      .then((response) => {
        dispatch(userSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(REGISTER_URL, userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  return {
    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
