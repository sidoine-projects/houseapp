/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllRoles = () => {
  return Axios.get("/roles");
};

let getRole = (id) => {
  return Axios.get("/roles/" + id);
};

let addRole = (role) => {
  return Axios.post("/roles", role);
};

let droitUsers = (role) => {
  return Axios.post("/droitusers", role);
};

let updateRole = (role) => {
  return Axios.put("/roles/" + role.id, role);
};

let deleteRole = (id) => {
  return Axios.delete("/roles/" + id);
};
let getPermissionsForRole = (roleId) => {
  return Axios.get(`/roles/${roleId}/permissions`, roleId);
};

export const roleService = {
  getAllRoles,
  getRole,
  addRole,
  droitUsers,
  updateRole,
  deleteRole,
  getPermissionsForRole,
};
