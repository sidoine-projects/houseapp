/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllaffectterminals = () => {
  return Axios.get("/affectterminals");
};

let getAffectTerminal = (id) => {
  return Axios.get("/affectterminals/" + id);
};

let getAffectTerminals = (terminal) => {
  return Axios.get("/affectterminals/" + terminal.id, terminal);
};

let addAffectTerminal = (credentials) => {
  return Axios.post("/affectterminals", credentials);
};

let updateAffectTerminal = (terminal) => {
  return Axios.put("/affectterminals/" + terminal.id, terminal);
};

let deleteAffectTerminal = (id) => {
  return Axios.delete("/affectterminals/" + id);
};

export const affectterminalService = {
  getAllaffectterminals,
  getAffectTerminal,
  getAffectTerminals,
  addAffectTerminal,
  updateAffectTerminal,
  deleteAffectTerminal,
};
