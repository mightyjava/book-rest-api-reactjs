import * as UT from "./userTypes";
import axios from "axios";

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

export const registerUser = (userObject) => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .post("http://localhost:8081/rest/user/register", userObject)
      .then((response) => {
        dispatch({
          type: UT.USER_SAVED_SUCCESS,
          payload: response.data.message,
        });
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
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
