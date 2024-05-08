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

const logout = () => {
  Axios.post("/auth/logout")
    .then((res) => {
      console.log(res);
      localStorage.clear();
      window.location.replace("/auth-pages/login");
    })
    .catch((err) => alert("Vous ne pouvez pas vous déconnecter maintenant"));
};

export const LoginService = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserr,
  login,
  getToken,
  saveToken,
  isLogged,
  logout,
  setLoggedIn,
  resetPassword,
  requestPassword,
  updateProfilPas,
  updateProfil,
  getAllCaissiers,
};
