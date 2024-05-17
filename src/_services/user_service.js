import Axios from "./caller.services";
import { reactive } from "vue";


const getAllUsers = () => {
  return Axios.get("/users");
};

const getUser = (id) => {
  return Axios.get("/users/" + id);
};

let getUserr = (user) => {
  return Axios.get("/users/" + user.id, user);
};

const addUser = (user) => {
  return Axios.post("/users", user);
};

const addUserTalent = (user) => {
  return Axios.post("/auth/register/talent", user);
};
const verifyCode = (code) => {
  return Axios.post("/auth/verify", code);
};
const resendVerificationCode = (user) => {
  return Axios.post("auth/resend-verification-code", user);
};
const logout = (user) => {
  return Axios.post("auth/logout", user);
};


const updateUser = (user) => {
  return Axios.put("/users/" + user.id, user);
};

const deleteUser = (userId) => {
  return Axios.delete(`/users/${userId}`);
};

const login = (credentials) => {
  return Axios.post("/auth/login", credentials);
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};
const resetPassword = (credentials) => {
  return Axios.post("/auth/reset-password", credentials);
};

const updateProfilPas = (data) => {
  return Axios.post("/users/changepassword", data);
};
const updateProfil = (data) => {
  return Axios.post("/users/changeprofile", data);
};

const requestPassword = (credentials) => {
  return Axios.post("/auth/request-password", credentials);
};

const getAllCaissiers = () => {
  return Axios.get("/caissiers");
};

// let isLogged = () => {
//   let token = localStorage.getItem("token");
//   return !!token;
// };

const state = reactive({
  isLoggedIn: false,
});

export function isLogged() {
  return state.isLoggedIn;
}

export function setLoggedIn(value) {
  state.isLoggedIn = value;
}


export const LoginService = {
  addUserTalent,
  verifyCode,
  resendVerificationCode,
  login,
  logout,
  
  
  
  
  
  
  
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserr,
  
  getToken,
  saveToken,
  isLogged,

  setLoggedIn,
  resetPassword,
  requestPassword,
  updateProfilPas,
  updateProfil,
  getAllCaissiers,
};
