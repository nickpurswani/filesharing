import axios from "axios";
import * as types from "./actionTypes";

const END_POINT = "https://localhost:8080"

// signup function
const signUp = (name, email, password)  => async (dispatch) => {
  dispatch({ type: types.USER_SIGNUP_PROCESS });


  try {
    const res = await axios.post(`${END_POINT}/user`, {
      name,
      email,
      password
    });
    
    if(res.data.msg === "User already exists!"){
      dispatch({ type: types.USER_SIGNUP_FAILURE, payload:"User Already Exist!" });
    }
    else{
      dispatch({ type: types.USER_SIGNUP_SUCCESS });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: types.USER_SIGNUP_FAILURE, payload:"Somthing Went Wrong!" });
  }
};

// login function
const login =  (email, password)  => async (dispatch) => {
  dispatch({ type: types.USER_LOGIN_PROCESS });
  
  try {
    const res = await axios.post(`${END_POINT}/user/login`, {
      email,
      password
    });
    
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res });
    localStorage.setItem("file-sharing-application-jwt", res.data.token)
  } catch (err) {
    console.error(err.response.data.error);
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload: err.response.data.error,
    });
  }
};


// check if user already login
const checkAuthentication =  async (dispatch) => {
  const token = localStorage.getItem("file-sharing-application-jwt")
  if(token){
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: "" });
  }
}

export { signUp, login, checkAuthentication };
