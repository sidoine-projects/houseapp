/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllEspece = () => {
  return Axios.get("/factures/especes");
};

let getAllMomos = () => {
  return Axios.get("/factures/momos");
};

let getAllFedapay = () => {
  return Axios.get("/factures/fedapay");
};

let getAllFatures = () => {
  return Axios.get("/facture");
};

let getAllRapportGeneral = () => {
  return Axios.get("/rapportgeneral");
};

let getRecent = () => {
  return Axios.get("/listfact");
};

let getFacture = (id) => {
  return Axios.get("/facture/" + id);
};

let getGenerateCodeQR = (id) => {
  return Axios.get("/facture/codeqr/" + id);
};

let requestFacture = (payementId, factures) => {
  return Axios.post(`/facture/${payementId}`, { factures });
};

let filtreDate = (formData) => {
  return Axios.post("/rapports/filtrer", formData);
};

let getUserCentre = (caissierId) => {
  return Axios.get("/rapport/caissier/" + caissierId);
};
const getUserCentr = (hopital) => {
  return Axios.get("/rapporthopital/" + hopital);
};
const getUserDepart = (departe) => {
  return Axios.get("/rapportdeparte/" + departe);
};
const getUserCom = (com) => {
  return Axios.get("/rapportcom/" + com);
};
const getUserAron = (aron) => {
  return Axios.get("/rapportaron/" + aron);
};
const getUserQuar = (quart) => {
  return Axios.get("/rapportquart/" + quart);
};

let getFacturesToday = () => {
  return Axios.get("/rapport/users");
};

let getFacturesTerminalToday = () => {
    return Axios.get('/rapport/terminal')
}

let getFactureTerminal = (terminalId) => {
    return Axios.get('/rapport/'+ terminalId)
}

export const factureService = {

    requestFacture,
    getFacturesTerminalToday,
    getFactureTerminal,
    getUserDepart,
    getUserCom,
    getUserAron,
    getUserQuar,
    getAllRapportGeneral,
    getAllFatures,
    getFacture,
    getUserCentr,
    getGenerateCodeQR,
    filtreDate,
    getRecent,
    getAllEspece,
    getAllMomos,
    getAllFedapay,
    getUserCentre,
    getFacturesToday,

    getUserDepart,
    getUserCom,
    getUserAron,
    getUserQuar,
    requestFacture,
    getAllRapportGeneral,  

}


  

   
  
    
 

