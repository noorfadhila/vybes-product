import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const register = (username, email, password) => {
  return axios.post(API_URL + "users.json", {
    username,
    email,
    password
  });
};

const logout = () => {
  console.log("removeItem")
  localStorage.removeItem("user");
};
export default {
  register,
  logout,
};