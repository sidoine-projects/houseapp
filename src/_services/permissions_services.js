/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllPermissions = () => {
  return Axios.get("/permissions");
};

let getPermissions = (id)=> {
  return Axios.get("/permissions/" + id);
};

let addPermissions = (permission) => {
  return Axios.post("/permissions", permission);
};

let updatePermissions = (permission) => {
  return Axios.put("/permissions/" + permission.id, permission);
};

let deletePermissions = (id)=> {
  return Axios.delete("/permissions/" + id);
};

export const permissionService = {
  getAllPermissions,
  getPermissions,
  addPermissions,
  updatePermissions,
  deletePermissions,
};