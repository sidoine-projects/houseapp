/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllPatients = () => {
  return Axios.get("/patients");
};

let getPatient = (id) => {
  return Axios.get("/patients/" + id);
};


let getPatients = (patient) => {
  return Axios.get("/patients/" + patient.id, patient);
};

let addPatients = (credentials) => {
  return Axios.post("/patients", credentials);
};

let updatePatient = (patient) => {
  return Axios.put("/patients/" + patient.id, patient);
};

let deletePatient = (id) => {
  return Axios.delete("/patients/" + id);
};

export const patientService = {
  getAllPatients,
  getPatient,
  getPatients,
  addPatients,
  updatePatient,
  deletePatient,
};
