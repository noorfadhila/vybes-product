import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./type";
import AuthService from "../services/auth.service";


export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: "Registrasi Berhasil!",
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
};
export const login = (username, password) => (dispatch) => {
    console.log(username, password)
    let dataUser = {
        userName: "admin",
        password: "Asdf1234!"
    }
  
    if(username === dataUser.userName && password === dataUser.password){
        console.log("OK")
        localStorage.setItem("user", JSON.stringify(dataUser));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: dataUser },
        });
        return Promise.resolve();
    }else{
        console.log("action login error")
        dispatch({
        type: LOGIN_FAIL,
        });
        dispatch({
        type: SET_MESSAGE,
        payload: "Login Gagal! Periksa username dan password anda!",
        });
        return Promise.reject();
    }
};
export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
};